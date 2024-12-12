import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useAppContext } from '@/context/AppContext';
import { ThemedText } from '@/components/ThemedText';
import { Calendar } from 'react-native-calendars';
import { formatDateWithSuffix, formatTime } from '@/utils';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { router } from 'expo-router';
import ThemedButton from '@/components/ThemedButton';



const CalendarScreen: React.FC = () => {
    const { addBooking, booking } = useAppContext();
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const [showDateModal, setShowDateModal] = useState(false);
    const [markedDate, setMarkedDate] = useState<string | null>(null);



    const goToPayment = () => {
        //enforcing the values because you can't call goToPayment until selectedDate and selectedTime are not null
        addBooking({ when: selectedDate!, time: selectedTime! })
        router.push('/(home)/payment')
    }
    const hideDatePicker = () => {
        setShowDateModal(false);
    };

    const showDatePicker = () => {
        setShowDateModal(true);
    };




    const onDayPress = (day) => {

        const selectedDay = new Date(day["dateString"]);


        const formattedDate = formatDateWithSuffix(selectedDay)

        setSelectedDate(formattedDate)
        setMarkedDate(day["dateString"])
        showDatePicker()

    }

    const handleConfirm = (date) => {
        const dateTime = new Date(date);
        const formattedTime = formatTime(dateTime.getHours(), dateTime.getMinutes())
        setSelectedTime(formattedTime);
        hideDatePicker();
    };


    return (

        <View style={styles.modal}>



            <View style={styles.content}>
                <ThemedText style={styles.modalTitle}>When are you free?</ThemedText>




                <Calendar


                    current={new Date()}

                    scrollEnabled={true}
                    showScrollIndicator={true}
                    markedDates={{

                        //we can add any pre-selected date we want from the backedn 
                        [new Date().toDateString()]: {
                            selected: true,
                            marked: true,
                            selectedColor: '#8F8F8F'
                        },

                        [markedDate]: {
                            selected: true,
                            marked: true,
                            selectedColor: 'black'
                        },

                    }}
                    onDayPress={(date: string) => {
                        onDayPress(date)
                    }}
                />


                <DateTimePickerModal

                    isVisible={showDateModal}
                    mode="time"
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                />
            </View>


            <View style={{ top: '10%', }}>

                {!showDateModal &&
                    <>
                        <ThemedText type='subtitle' style={{ color: "black", textAlign: 'center', padding: 5 }}>Date</ThemedText>
                        <ThemedText type='default' style={{ color: "black", textAlign: 'center', padding: 5 }}>{selectedDate || booking?.when}</ThemedText>
                        <ThemedText type='subtitle' style={{ color: "black", textAlign: 'center', padding: 5 }}>Time </ThemedText>
                        <ThemedText type='default' style={{ color: "black", textAlign: 'center', padding: 5 }}>{selectedTime || booking?.time}</ThemedText>
                    </>
                }


                {selectedDate && selectedTime && <ThemedButton text='Continue to Payment' onPress={goToPayment} spacing={10} />}
            </View>
        </View>

    )

}


export default CalendarScreen


const styles = StyleSheet.create({
    modal: {
       flex: 1,
       backgroundColor: 'white'
  

    },
    content: {
        padding: 10,
        top: '10%'
    },

    modalTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },

})