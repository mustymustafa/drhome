import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useAppContext } from '@/context/AppContext';
import { ThemedText } from '@/components/atomic/atoms/ThemedText';
import { router } from 'expo-router';
import {
  confirmPlatformPayPayment,
  PlatformPay,
  PlatformPayButton,
  useStripe,
} from "@stripe/stripe-react-native";
import { stripeIntent } from '@/api';
import { scheduleNotification } from '@/utils/notification';
import { Treatment } from '@/types';
import ThemedButton from '@/components/atomic/molecules/ThemedButton';
import { ThemedView } from '@/components/atomic/atoms/ThemedView';

const PaymentScreen: React.FC = () => {
  const { booking, user, addBooking, resetBooking, addBookingToHistory, addPoints, loyaltyPoints } = useAppContext();

  const [loading, setLoading] = useState(false);
  const subtotal = booking?.treatments?.reduce((sum, treatment) => sum + treatment.price, 0) || 0;
  const pointsEarned = booking?.treatments?.reduce((sum, treatment) => sum + treatment.points, 0) || 0;
  const total = subtotal - loyaltyPoints;

  const { initPaymentSheet, presentPaymentSheet } = useStripe();

  useEffect(() => {
    addBooking({ total });
  }, [total]);

  const initializePaymentSheet = async (resp: any) => {
    const { error } = await initPaymentSheet({
      merchantDisplayName: "DR HOME",
      paymentIntentClientSecret: resp.paymentIntent.client_secret,
      allowsDelayedPaymentMethods: true,
      defaultBillingDetails: { name: user?.name },
    });
    if (error) console.error(error);
  };

  const openPaymentSheet = async () => {
    const { error } = await presentPaymentSheet();
    if (!error) {
      handleConfirmPayment();
    } else {
      Alert.alert("Payment Error", "Ops! Something went wrong with your payment.");
    }
    setLoading(false);
  };

  const handlePayment = async (platformPay?: boolean) => {
    setLoading(true);
    const resp = await stripeIntent((total * 100).toString(), 'GBP');
    await initializePaymentSheet(resp);
    platformPay ? processPlatformPay(resp.paymentIntent.client_secret) : openPaymentSheet();
  };

  const processPlatformPay = async (clientSecret: string) => {
    const { error } = await confirmPlatformPayPayment(clientSecret, {
      applePay: {
        cartItems: [{
          label: 'Checkout',
          amount: total.toString(),
          paymentType: PlatformPay.PaymentType.Immediate,
        }],
        merchantCountryCode: 'GB',
        currencyCode: 'GBP',
      },
      googlePay: {
        testEnv: false,
        merchantName: 'DR HOME',
        merchantCountryCode: 'GB',
        currencyCode: 'GBP',
      },
    });
    if (error) {
      Alert.alert('Payment Error', 'Ops something went wrong: Apple Pay error');
    } else {
      handleConfirmPayment();
    }
    setLoading(false);
  };

  const handleConfirmPayment = () => {
    addPoints(pointsEarned);
    addBookingToHistory(booking);
    resetBooking();
    Alert.alert('Booking Confirmed!', `You have earned ${pointsEarned} Loyalty Point(s)! 🎉`, [{
      text: 'Yay!',
      onPress: () => router.push('/(tabs)/loyalty'),
    }]);
    scheduleNotification();
  };

  const navigateTo = (path: string) => router.push(path);

  const renderSection = (title: string, onEdit?: () => void, children?: React.ReactNode) => (
    <ThemedView style={styles.section}>
      <ThemedView style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>{title}</Text>
        {onEdit && (
          <TouchableOpacity onPress={onEdit}>
            <Text style={styles.editText}>Edit</Text>
          </TouchableOpacity>
        )}
      </ThemedView>
      <ThemedView style={styles.divider} />
      {children}
    </ThemedView>
  );

  return (
    <ScrollView style={styles.modalContainer}>
      <ThemedText style={styles.pageTitle} type='subtitle'>Dr Home Aesthetics Checkout</ThemedText>
      <ThemedView style={styles.modalContent}>
        {renderSection('Treatments', () => navigateTo('/(tabs)'), booking?.treatments?.map((treatment: Treatment) => (
          <ThemedView key={treatment.id}>
            <Text style={{...styles.detailText, fontWeight: 'bold'}}>{treatment.name}</Text>
            <Text style={styles.priceText}>£{treatment.price.toFixed(2)}</Text>
          </ThemedView>
        )))}

        {renderSection('Appointment Details', () => navigateTo('/(home)/calendar'), (
          <>
            <Text style={styles.detailText}>{booking?.when || 'Not Selected'}</Text>
            <Text style={styles.detailText}>{booking?.time || 'Not Selected'}</Text>
          </>
        ))}

        {renderSection('Patient Details', undefined, (
          <>
            <Text style={styles.detailText}>{user?.name}</Text>
            <Text style={styles.detailText}>{user?.email}</Text>
          </>
        ))}

        {renderSection('Payment Summary', undefined, (
          <>
            <ThemedView style={styles.paymentRow}>
              <Text style={styles.detailText}>{booking?.treatments?.length} Treatment(s)</Text>
              <Text style={styles.priceText}>£{subtotal.toFixed(2)}</Text>
            </ThemedView>
            <ThemedView style={styles.paymentRow}>
              <Text style={styles.detailText}>Discount</Text>
              <Text style={styles.priceText}>-£{loyaltyPoints?.toFixed(2)}</Text>
            </ThemedView>
            <ThemedView style={styles.paymentRow}>
              <Text style={styles.detailText}>Subtotal</Text>
              <Text style={styles.priceText}>£{total.toFixed(2)}</Text>
            </ThemedView>
            <ThemedView style={styles.divider} />
            <ThemedView style={styles.paymentRow}>
              <Text style={[styles.detailText, styles.boldText]}>Order Total</Text>
              <Text style={[styles.priceText, styles.boldText]}>£{total.toFixed(2)}</Text>
            </ThemedView>
          </>
        ))}

        <ThemedView style={{ alignItems: 'center', marginTop: '5%' }}>
          <ThemedButton loading={loading} text='Secure Checkout' onPress={() => handlePayment()} />
          <ThemedText style={{top: 10}}>or checkout with</ThemedText>
          {!loading && (
            <PlatformPayButton
              onPress={() => handlePayment(true)}
              type={PlatformPay.ButtonType.Pay}
              appearance={PlatformPay.ButtonStyle.Black}
              borderRadius={10}
              style={{ width: '90%', height: 50, padding: 5, marginTop: '5%' }}
            />
          )}
        </ThemedView>
      </ThemedView>
      <ThemedView style={styles.footerComponent} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  pageTitle: {
    padding: 10,
    marginTop: '2%',
    textAlign: 'center',
  },
  modalContent: {
    marginTop: '10%',
    padding: 20,
  },
  section: {
    padding: 10,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  editText: {
    color: 'blue',
    fontSize: 14,
    fontWeight: '500',
  },
  divider: {
    height: 0.5,
    backgroundColor: 'black',
    marginVertical: 8,
  },
  detailText: {
    fontSize: 14,
    padding: 2,
    color: '#333',
  },
  priceText: {
    fontSize: 14,
    padding: 2,
    fontWeight: '500',
    color: '#333',
  },
  paymentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 4,
  },
  boldText: {
    fontWeight: 'bold',
  },

  footerComponent: {
    height: 200, 
    top: 100
  }
});

export default PaymentScreen