import React, { useMemo, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useAppContext } from '@/context/AppContext';
import { ThemedText } from '@/components/atomic/atoms/ThemedText';
import { Calendar } from 'react-native-calendars';
import { formatDateWithSuffix, generateTimeSlots } from '@/utils';
import { router } from 'expo-router';
import ThemedButton from '@/components/atomic/molecules/ThemedButton';
import TimePicker from '@/components/atomic/organism/TimePicker';

const CalendarScreen: React.FC = () => {
    const { addBooking } = useAppContext();
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const [markedDate, setMarkedDate] = useState<string | null>(null);

    //memoizing timeslots to prevent unnecessary re-renders
    const timeSlots = useMemo(() => generateTimeSlots(), [selectedDate]);

    const handleTimeSelect = (time: string) => setSelectedTime(time);

    const goToPayment = () => {
        if (selectedDate && selectedTime) {
            addBooking({ when: selectedDate, time: selectedTime });
            router.push('/(home)/payment');
        }
    };

    const onDayPress = (day: { dateString: string }) => {
        const selectedDay = new Date(day.dateString);
        setSelectedDate(formatDateWithSuffix(selectedDay));
        setMarkedDate(day.dateString);
    };

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <ThemedText style={styles.title}>When are you free?</ThemedText>

                <Calendar
                minDate={new Date().toISOString().split('T')[0]}
                    current={new Date().toISOString().split('T')[0]}
                    scrollEnabled
                    showScrollIndicator
                    markedDates={{
                        [new Date().toISOString().split('T')[0]]: {
                            selected: true,
                            marked: true,
                            selectedColor: '#8F8F8F',
                        },
                        ...(markedDate && {
                            [markedDate]: {
                                selected: true,
                                marked: true,
                                selectedColor: 'black',
                            },
                        }),
                    }}
                    onDayPress={onDayPress}
                />

                <ThemedText type="subtitle" style={styles.subtitle}>Select a Time</ThemedText>

               {selectedDate && <TimePicker timeSlots={timeSlots} selectedTime={selectedTime} onSelect={handleTimeSelect} /> }
            </View>

            {selectedDate && selectedTime && (
                <View style={styles.buttonContainer}>
                    <ThemedButton text="Continue to Payment" onPress={goToPayment} spacing={1} />
                </View>
            )}
        </View>
    );
};

export default CalendarScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    content: {
        padding: 10,
        marginTop: '5%',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    subtitle: {
        color: 'black',
        textAlign: 'center',
        padding: 20,
    },
    buttonContainer: {
        marginTop: '10%',
    },
});
