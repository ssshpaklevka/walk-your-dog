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

interface ModalBirthdayProps {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  selectedDate: Date | null;
  setSelectedDate: (date: Date | null) => void;
  onSave: () => void;
}

export default function DateBirthday({
  modalVisible,
  setModalVisible,
  selectedDate,
  setSelectedDate,
  onSave,
}: ModalBirthdayProps) {
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDateChange = (event: any, selectedDate: Date | undefined) => {
    setSelectedDate(selectedDate || new Date());
    if (Platform.OS === "android") {
      setShowDatePicker(false);
    }
  };

  const handleSave = () => {
    onSave(); 

    setModalVisible(false);
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
        <View style={{ width: "100%", alignItems: "flex-end" }}>
          <TouchableOpacity onPress={handleSave}>
            <Text style={styles.saveButtonText}>Готово</Text>
          </TouchableOpacity>
        </View>

        <DateTimePicker
          value={selectedDate || new Date()}
          mode="date"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={handleDateChange}
          textColor="black"
        />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalView: {
    gap: 5,
    height: "auto",
    justifyContent: "flex-end",
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 20,
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
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
  },
});
