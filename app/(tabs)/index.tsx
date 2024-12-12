import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, FlatList, TouchableOpacity, View } from 'react-native';
import Checkbox from 'expo-checkbox';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useAppContext } from '@/context/AppContext';
import { router } from 'expo-router';
import { registerForPushNotificationsAsync } from '@/utils/notification';
import { Treatment } from '@/types';

const HomeScreen = () => {
  const { treatments, booking, fetchTreatments, addBooking } = useAppContext();
  const [selectedItems, setSelectedItems] = useState<Treatment[]>([]);
  const now = new Date().getTime();

  useEffect(() => {
    registerForPushNotificationsAsync();
    fetchTreatments();
  }, []);

  const handleSelection = (item: Treatment) => {
    setSelectedItems((prevItems) => {
      return prevItems.some((selectedItem) => selectedItem.id === item.id)
        ? prevItems.filter((selectedItem) => selectedItem.id !== item.id)
        : [...prevItems, item];
    });
  };

  const onTreatmentSelected = () => {
    if(selectedItems.length < 1) return alert('please select a treatment')
    addBooking({ id: now, treatments: selectedItems });
    router.push('/(home)/calendar');
  };

  const renderTreatmentItem = ({ item }: { item: Treatment }) => {
    const isSelected =
      selectedItems.some((selectedItem) => selectedItem.id === item.id) 

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
      <ThemedView style={{top: '15%', padding: 20}}>
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

      <TouchableOpacity onPress={onTreatmentSelected} style={styles.stickyButton}>
        <ThemedText style={styles.buttonText}>Continue</ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: 'white'},
  titleContainer: {
bottom: 20,
   padding: 10
  },
  treatmentList: {flex: 1, top: '12%', alignSelf: 'center'},
 
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
  stickyButton: {
    top: '85%',
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
    backgroundColor: 'black',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    width: '90%',
    height: 40
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
  checkbox: {
    margin: 2,
    borderRadius: 50,
  },
  listFooter: {height: 300, top: 100}
});

export default HomeScreen;