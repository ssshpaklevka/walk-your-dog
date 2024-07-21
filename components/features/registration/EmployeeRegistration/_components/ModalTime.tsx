import React, { useState } from "react";
import {
  Modal,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import DarkButton from "../../../../../shared/ui/Button/DarkButton";

interface ModalTimeProps {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  selectedInterval: string;
  setSelectedInterval: (interval: string) => void;
}


export default function ModalTime({
  modalVisible,
  setModalVisible,
  selectedInterval,
  setSelectedInterval
}: ModalTimeProps) {

  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [activeInput, setActiveInput] = useState<'start' | 'end' | null>(null);

  const daysOfWeek = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

  const handleDayPress = (day: string) => {
    setSelectedDays((prevDays) =>
      prevDays.includes(day)
        ? prevDays.filter((d) => d !== day)
        : [...prevDays, day]
    );
  };

  const handleTimeChange = (event: any, selectedDate: Date | undefined) => {
    const currentDate = selectedDate || new Date();
    if (activeInput === 'start') {
      setStartTime(currentDate);
    } else if (activeInput === 'end') {
      setEndTime(currentDate);
    }
    if (Platform.OS === 'android') {
      setShowTimePicker(false);
    }
  };

  const handleTimePress = (inputType: 'start' | 'end') => {
    setActiveInput(inputType);
    setShowTimePicker(true);
  };

  const handleSave = () => {
    const days = selectedDays.join(", ");
    const interval = `${days} ${startTime.toLocaleTimeString('ru-RU', {
      hour: "2-digit",
      minute: "2-digit",
    })} - ${endTime.toLocaleTimeString('ru-RU', {
      hour: "2-digit",
      minute: "2-digit",
    })}`;
    setSelectedInterval(interval);
    setModalVisible(false);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('ru-RU', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(false);
      }}
    >
      <View style={styles.modalView}>
        <Text style={styles.modalText}>Выберите интервал времени для работы</Text>
        <View style={styles.daysContainer}>
          {daysOfWeek.map((day) => (
            <TouchableOpacity
              key={day}
              onPress={() => handleDayPress(day)}
              style={[
                styles.dayButton,
                selectedDays.includes(day) && styles.selectedDayButton,
              ]}
            >
              <Text
                style={[
                  styles.dayButtonText,
                  selectedDays.includes(day) && styles.selectedDayButtonText,
                ]}
              >
                {day}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          style={styles.input}
          onPress={() => handleTimePress('start')}
        >
            <Text style={{fontSize: 10, fontWeight: 400, paddingBottom: 2}}>Начало работы</Text>
          <Text style={{fontSize: 16, fontWeight: 500}}>{formatTime(startTime)}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.input}
          onPress={() => handleTimePress('end')}
        >
            <Text style={{fontSize: 10, fontWeight: 400, paddingBottom: 2}}>Конец работы</Text>
          <Text style={{fontSize: 16, fontWeight: 500}}>{formatTime(endTime)}</Text>
        </TouchableOpacity>

        {showTimePicker && (
         <DateTimePicker
         value={activeInput === 'start' ? startTime : endTime}
         mode="time"
         is24Hour={true}
         display={Platform.OS === 'ios' ? 'spinner' : 'default'}
         onChange={handleTimeChange}
         textColor="black" 
       />
        )}

        {/* {Platform.OS === 'ios' && showTimePicker && (
          <TouchableOpacity onPress={() => setShowTimePicker(false)}>
            <Text style={styles.doneButton}>Готово</Text>
          </TouchableOpacity>
        )} */}

        <DarkButton title="Сохранить" onPress={handleSave}/>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalView: {
    gap: 14,
    height: "auto",
    justifyContent: 'flex-end',
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 35,
    paddingHorizontal: 15,
    paddingBottom: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    zIndex: 5,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  modalText: {
    textAlign: "center",
    fontSize: 18,
  },
  daysContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 10,
  },
  dayButton: {
    backgroundColor: "#F4F4F4",
    padding: 12,
    borderRadius: 11,
    borderColor: "#E7EFBE",
    borderWidth: 1,
  },
  selectedDayButton: {
    backgroundColor: "#E7EFBE",
  },
  dayButtonText: {
    color: "black",
    fontSize: 12,
    fontWeight: "500",
  },
  selectedDayButtonText: {
    color: "black",
  },
  input: {
    height: 40,
    borderColor: "#ddd",
    borderBottomWidth: 1,
    borderBottomColor: "#C5C5C5",
    width: "100%",
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
  doneButton: {
    color: '#007AFF',
    fontSize: 16,
  },
});