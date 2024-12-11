import { StyleSheet, FlatList, TouchableOpacity, View } from 'react-native';


import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useAppContext } from '@/context/AppContext';

export default function ExploreScreen() {

  const { loyaltyPoints, bookingHistory } = useAppContext();


  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <IconSymbol
          size={310}
          color="#808080"
          name="chevron.left.forwardslash.chevron.right"
          style={styles.headerImage}
        />
      }>

        <ThemedText style={{textAlign:'center'}} type="title">Loyalty Points🎉</ThemedText>
        <ThemedText style={{textAlign:'center'}} type="default">{loyaltyPoints}</ThemedText>




        <ThemedText style={{fontSize: 14}} type="subtitle">your bookings</ThemedText>



<FlatList
style={{bottom: '3%'}}
      data={bookingHistory}
        keyExtractor={(item) => item.id}
    renderItem={({ item }) => (
      <TouchableOpacity
        style={styles.card}
      >
            <ThemedText style={styles.title}>{item?.treatments[0]?.name}</ThemedText>
            <ThemedText type='subtitle' style={{ fontSize: 14, top: 5 }}>£{item.total}</ThemedText>
            <ThemedText style={{ fontSize: 12, top: 5 }}>{item.when}</ThemedText>
            <ThemedText style={{ fontSize: 12, top: 5 }}>{item.time}</ThemedText>

       
   
      </TouchableOpacity>
    )}
  />




    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
alignItems: 'center'
  },

  bookingsContainer: {
padding: 5,
      },
      card: { padding: 10, marginTop: 10, borderWidth: 0.4, borderRadius: 8 },
      title: { fontWeight: 'bold', fontSize: 18 },
});
