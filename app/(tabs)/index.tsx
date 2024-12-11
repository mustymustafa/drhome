import { Image, StyleSheet, FlatList, TouchableOpacity, View } from 'react-native';
import Checkbox from 'expo-checkbox';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Treatment, useAppContext } from '@/context/AppContext';
import React, { useEffect, useState } from 'react';
import { router } from 'expo-router';
import { registerForPushNotificationsAsync } from '@/utils/notification';



export default function HomeScreen() {
  const { treatments, booking, fetchTreatments, addBooking } = useAppContext();
  const [selectedItems, setSelectedItems] = useState<Treatment[]>([]);

  const now = new Date().getTime()


  useEffect(() => {
    registerForPushNotificationsAsync();
    fetchTreatments();
  }, []);



  const handleSelection = (item: Treatment) => {
    if (selectedItems.some(selectedItem => selectedItem.id === item.id)) {
      // If the item is already selected, remove it
      setSelectedItems(selectedItems.filter(selectedItem => selectedItem.id !== item.id));
    } else {
      // If the item is not selected, add it
      setSelectedItems([...selectedItems, item]);
    }
  }

  const onTreatmentSelected = () => {

    addBooking({id: now, treatments: selectedItems })
    router.push('/(home)/calendar')

  }





  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="subtitle">Select a treatment</ThemedText>
      </ThemedView>
      <FlatList
      data={treatments}
    keyExtractor={(item) => item.id}
    renderItem={({ item }) => (
      <TouchableOpacity
      onPress={() => handleSelection(item)} 
        style={styles.card}
      >
        
        <Checkbox
        style={styles.checkbox}
            value={selectedItems.some(selectedItem => selectedItem.id === item.id)}
            onValueChange={() => handleSelection(item)} 
            color={selectedItems.some(selectedItem => selectedItem.id === item.id) ? '#4630EB' : undefined}
          />
         
          <View>
            <ThemedText style={styles.title}>{item.name}</ThemedText>
            <ThemedText>£{item.price}</ThemedText>
            <ThemedText style={{ fontSize: 12, top: 5 }}>{item.description}</ThemedText>
          </View>
   
      </TouchableOpacity>
    )}
  />




          <TouchableOpacity onPress={onTreatmentSelected} style={styles.stickyButton}>
                    <ThemedText style={{ color: "white", textAlign: 'center' }}>Continue</ThemedText>
                </TouchableOpacity>

    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  card: { padding: 20, margin: 5, borderWidth: 0.4, borderRadius: 8 },
  title: { fontWeight: 'bold', fontSize: 18 },
  stickyButton: {
    position: 'sticky',
    bottom: 10, 

    backgroundColor: 'black',
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },

  checkbox: {
    margin: 2,
    borderRadius: 50,
    bottom: 5
    
  },

});
