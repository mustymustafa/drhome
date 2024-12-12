import { FlatList, StyleSheet, TouchableOpacity, Text } from "react-native";
import { ThemedView } from "../atoms/ThemedView";
import { TimePickerProps } from "@/types";



const TimePicker = ({timeSlots, selectedTime, onSelect}: TimePickerProps) => {


  return (
    <ThemedView style={styles.container}>
      <FlatList
        data={timeSlots}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.timeSlot,
              selectedTime === item && styles.selectedTimeSlot,
            ]}
            onPress={() => onSelect(item)}
          >
            <Text
              style={[
                styles.timeText,
                selectedTime === item && styles.selectedTimeText,
              ]}
            >
              {item}
            </Text>
          </TouchableOpacity>
        )}
      />
    </ThemedView>
  );
};


export default TimePicker

const styles = StyleSheet.create({
    container: {
        marginVertical: 20,
      },
      listContainer: {
        paddingHorizontal: 10,
      },
      timeSlot: {
        backgroundColor: "#f0f0f0",
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 8,
        marginHorizontal: 5,
        borderWidth: 1,
        borderColor: "#ddd",
      },
      selectedTimeSlot: {
        backgroundColor: "#007bff",
        borderColor: "#0056b3",
      },
      timeText: {
        fontSize: 16,
        color: "#333",
      },
      selectedTimeText: {
        color: "#fff",
      },
})