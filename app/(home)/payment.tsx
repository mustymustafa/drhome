
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
import {scheduleNotification} from '@/utils/notification';
import { Treatment } from '@/types';
import ThemedButton from '@/components/atomic/molecules/ThemedButton';
import { ThemedView } from '@/components/atomic/atoms/ThemedView';



const PaymentScreen: React.FC = ({


}) => {
  const { booking, user, addBooking, resetBooking,  addBookingToHistory, addPoints, loyaltyPoints } = useAppContext();

  const [loading, setLoading] = useState(false)
  const subtotal = booking?.treatments?.reduce((sum, treatment) => sum + treatment.price, 0)  || 0;
  const pointsEarned = booking?.treatments?.reduce((sum, treatment) => sum + treatment.points, 0) 
  const total = subtotal - loyaltyPoints; //assuming 1 point is £1


  useEffect(() => {
    addBooking({total: total})
  }, [])

  const { initPaymentSheet, presentPaymentSheet } = useStripe();


  const initializePaymentSheet = async (resp: any) => {
    const { error } = await initPaymentSheet({
      merchantDisplayName: "DR HOME",
      paymentIntentClientSecret: resp.paymentIntent.client_secret,
      allowsDelayedPaymentMethods: true,
      defaultBillingDetails: {
        name: 'user?.name',
      },
    }) 
    //console.log(error)
   
  };

  const openPaymentSheet = async () => {
    const { error } = await presentPaymentSheet(); 

    if(!error) {
      handleConfirmPayment()
      setLoading(false)
    } else {
      alert("Ops! something went wrong with your payment")
      //console.log(error)
      setLoading(false)
    }
  }

  const handlePayment = async (platformPay?: boolean) => {
    setLoading(true)
    const resp = await stripeIntent((total * 100).toString(), 'GBP')
    
    await initializePaymentSheet(resp).then(() => 
      {
        if(platformPay){
          processPlatformPay(resp.paymentIntent.client_secret)
        } else {
      openPaymentSheet()
        }
      }
    )



  }

  const processPlatformPay = async (clientSecret: string) => {
    const { error } = await confirmPlatformPayPayment(
      clientSecret,
      {
        applePay: {
          cartItems: [
            {
              label: 'Checkout',
              amount: total.toString(),
              paymentType: PlatformPay.PaymentType.Immediate,
            },
          ],
          merchantCountryCode: 'GB',
          currencyCode: 'GBP',
        },

        googlePay: {
          testEnv: false,
          merchantName: 'DR HOME',
          merchantCountryCode: 'GB',
          currencyCode: 'GBP',
        },
      }
    );
    if (error) {
      setLoading(false)
      // handle error
      //console.log('pay error', error)
      alert('Ops something went wrong: Apple Pay error')
    } else {
      setLoading(false)
    handleConfirmPayment()
    }

  }



  const handleConfirmPayment = () => {
    addPoints(pointsEarned ?? 0)
    addBookingToHistory(booking)
    resetBooking()

    Alert.alert('Booking confirmed!', `You have earned ${pointsEarned} Loyalty Point(s)! 🎉`, [{'text': 'yay!', onPress: () => {router.push('/(tabs)/loyalty')}}]);
   scheduleNotification()

    
  };

  const onEditTreatment = () => {
   router.push("/(tabs)")
  }

  const  onEditDate = () => {
   router.push("/(home)/calendar")
  }


  return (

      <ScrollView style={styles.modalContainer}>
        <ThemedText style={styles.pageTitle} type='subtitle'>Dr Home Aesthetics Checkout</ThemedText>
        <ThemedView style={styles.modalContent}>

<ThemedView style={styles.sectionContainer}>


          {/* Treatments Block */}
          <ThemedView style={styles.section}>
            <ThemedView style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Treatments</Text>
              <TouchableOpacity onPress={onEditTreatment}>
                <Text style={styles.editText}>Edit</Text>
              </TouchableOpacity>
            </ThemedView>
         
            {booking?.treatments?.map((treatment: Treatment) => (
                 <ThemedView key={treatment.id}>
               <ThemedView style={styles.divider} />
               <Text style={styles.detailText}>{treatment?.name}</Text>
               <Text style={styles.priceText}>£{treatment?.price.toFixed(2)}</Text>

            </ThemedView>
            
            ))}
  
          </ThemedView>

          {/* Appointment Details Block */}
          <ThemedView style={styles.section}>
            <ThemedView style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Appointment Details</Text>
              <TouchableOpacity onPress={onEditDate}>
                <Text style={styles.editText}>Edit</Text>
              </TouchableOpacity>
            </ThemedView>
            <ThemedView style={styles.divider} />
            <Text style={styles.detailText}>{booking?.when || 'Not Selected'}</Text>
            <Text style={styles.detailText}>{booking?.time || 'Not Selected'}</Text>
          </ThemedView>

             {/* Patient Details Block */}
             <ThemedView style={styles.section}>
            <ThemedView style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Patient Details</Text>
            </ThemedView>
            <ThemedView style={styles.divider} />
            <Text style={styles.detailText}>{user?.name}</Text>
            <Text style={styles.detailText}>{user?.email}</Text>
          </ThemedView>

          {/* Payment Summary Block */}
          <ThemedView style={styles.section}>
            <Text style={styles.sectionTitle}>Payment Summary</Text>
            <ThemedView style={styles.divider} />
            <ThemedView style={styles.paymentRow}>
              <Text style={styles.detailText}>{booking?.treatments?.length} Treatment(s)</Text>
              <Text style={styles.priceText}>£{subtotal.toFixed(2)}</Text>
            </ThemedView>
            <ThemedView style={styles.paymentRow}>
              <Text style={styles.detailText}>Discount</Text>
              <Text style={styles.priceText}>-£{loyaltyPoints.toFixed(2)}</Text>
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


          </ThemedView>


          <ThemedView style={{alignItems: 'center', top: '2%'}}>
          <ThemedButton loading={loading} text='Secure Checkout'  onPress={() => {handlePayment()}}/>

       
            
          
          <ThemedText style={{top: '15%'}}>or checkout with</ThemedText>

          {!loading &&    <PlatformPayButton
                onPress={() => {handlePayment(true)}}
                type={PlatformPay.ButtonType.Pay}
                appearance={PlatformPay.ButtonStyle.Black}
                borderRadius={10}
                style={{
                  width: '90%',
                  height: 50,
                  padding: 5,
                  top: '15%'
                }}
              />}
     


        </ThemedView>
      
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
  pageTitle: {padding: 10, top: '2%', textAlign: 'center'},
  modalContent: {
  top: '10%',

    padding: 20,

  },

  sectionContainer: {
    bottom: '10%'
  },
  section: {
    //marginBottom: 16,
    padding: 10
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
    color: '#333',
  },
  priceText: {
    fontSize: 14,
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
    height: 300, 
    top: 100
  }

});

export default PaymentScreen;
