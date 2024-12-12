import { StyleSheet, FlatList, View } from 'react-native';
import { ThemedText } from '@/components/atomic/atoms/ThemedText';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useAppContext } from '@/context/AppContext';
import { Booking } from '@/types';
import { ThemedView } from '@/components/atomic/atoms/ThemedView';

export default function LoyaltyScreen() {
  const { loyaltyPoints, bookingHistory } = useAppContext();



  // Render individual booking items
  const renderBookingItem = ({ item }: { item: Booking }) => (
    <View style={styles.card}>
      <ThemedText style={styles.title}>
        {item?.treatments[0]?.name || 'Unknown Treatment'}
      </ThemedText>
      <ThemedText type="subtitle" style={styles.priceText}>
        £{item.total.toFixed(2)}
      </ThemedText>
      <ThemedText style={styles.smallText}>{item.when}</ThemedText>
      <ThemedText style={styles.smallText}>{item.time}</ThemedText>
    </View>
  );

  return (
    <View style={styles.container}>
     

      {/* Loyalty Points Section */}
      <ThemedView style={styles.loyaltySection}>
        <ThemedText style={styles.centerText} type="title">
          Loyalty Points 🎉
        </ThemedText>
        <ThemedText style={styles.centerText} type="default">
          {loyaltyPoints}
        </ThemedText>
        <ThemedText style={styles.subtitle} type="subtitle">
          Your Bookings
        </ThemedText>
      </ThemedView>

      {/* Booking History List */}
      <FlatList
        data={bookingHistory}
        keyExtractor={(item) => item.id}
        renderItem={renderBookingItem}
        contentContainerStyle={styles.bookingsContainer}
        ListFooterComponent={<View style={styles.listFooter}/>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  headerContainer: {
    marginTop: '50%',
    alignItems: 'center',
  },
  headerImage: {
    position: 'absolute',
    bottom: -90,
    left: -35,
    color: '#808080',
  },
  loyaltySection: {
    marginTop: '10%',
    paddingHorizontal: 16,

  },
  centerText: {
    textAlign: 'center',
    marginVertical: 8,
  },
  subtitle: {
    fontSize: 14,
    marginVertical: 8,
    fontWeight: 'bold',
  },
  bookingsContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  card: {
    padding: 16,
    marginVertical: 8,
    borderWidth: 0.4,
    borderRadius: 8,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  priceText: {
    fontSize: 14,
    marginTop: 4,
  },
  smallText: {
    top: 5,
    fontSize: 14,
    
  },
  listFooter: {height: 300, top: 100}
});
