import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, FlatList, TouchableOpacity, View } from 'react-native';
import Checkbox from 'expo-checkbox';
import { ThemedText } from '@/components/atomic/atoms/ThemedText';
import { ThemedView } from '@/components/atomic/atoms/ThemedView';
import { useAppContext } from '@/context/AppContext';
import { router } from 'expo-router';
import { registerForPushNotificationsAsync } from '@/utils/notification';
import { Treatment } from '@/types';
import ThemedButton from '@/components/atomic/molecules/ThemedButton';
import { scale } from '@/utils/sizes';

const HomeScreen = () => {
  const { treatments, booking, fetchTreatments, removeTreatment, addBooking } = useAppContext();
  const [selectedItems, setSelectedItems] = useState<Treatment[]>([]);
  const now = new Date().getTime();

  useEffect(() => {
    registerForPushNotificationsAsync();
    fetchTreatments();
  }, []);


  //remove from booking if selected
  const handleSelection = (item: Treatment) => {
    setSelectedItems((prevItems) => {
      return prevItems.some((selectedItem) => selectedItem.id === item.id)
        ? prevItems.filter((selectedItem) => selectedItem.id !== item.id)
        : [...prevItems, item];
    });
    //remove the treatment from the booking state if it's currently selected
    removeTreatment(item.id)
  };

  const onTreatmentSelected = () => {
    if(selectedItems.length < 1) return alert('please select a treatment')
    addBooking({ id: now, treatments: selectedItems });
    router.push('/(home)/calendar');
  };

  const renderTreatmentItem = ({ item }: { item: Treatment }) => {
    const isSelected =
      selectedItems.some((selectedItem) => selectedItem.id === item.id) ||
      booking?.treatments?.some((selectedItem) => selectedItem.id === item.id);

    return (
      <TouchableOpacity onPress={() => handleSelection(item)} style={styles.card}>
        <Checkbox
          style={styles.checkbox}
          value={isSelected}
          onValueChange={() => handleSelection(item)}
          color={isSelected ? '#4630EB' : undefined}
        />
        <View style={{padding: 5}}>
          <ThemedText style={styles.title}>{item.name}</ThemedText>
          <ThemedText>£{item.price}</ThemedText>
          <ThemedText style={styles.description}>{item.description}</ThemedText>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.titleSection}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="subtitle">Select a treatment</ThemedText>
      </ThemedView>
  
      </ThemedView>

      <FlatList
style={styles.treatmentList}
        data={treatments}
        keyExtractor={(item) => item.id}
        renderItem={renderTreatmentItem}
        ListFooterComponent={<View style={styles.listFooter}/>}
      />

      <ThemedButton spacing={57} text='Continue' onPress={onTreatmentSelected} sticky   />


    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: 'white'},
  titleContainer: {
bottom: 20,
   padding: 10
  },
  treatmentList: {flex: 1, top: '2%', alignSelf: 'center'},
 
  card: {
    padding: 20,
    margin: 5,
    borderWidth: 0.4,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  description: {
    fontSize: 12,
    marginTop: 5,
  },

  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
  checkbox: {
    margin: 2,
    borderRadius: 50,
  },
  listFooter: {height: 300, top: 100},
  titleSection: {top: '5%', padding: 20}
});

export default HomeScreen;