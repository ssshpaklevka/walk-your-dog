import React, { useState } from "react";
import {
  Modal,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Image,
  TextInput,
} from "react-native";
import DarkButton from "../../../../../../shared/ui/Button/DarkButton";

interface ModalProfile {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  title: string;
  infoBlock: string | string[];
  avatar?: string;
  name?: string;
  placeholder: string;
  onSave: (newValue: string) => void;
  //   email?: string;
  //   number?: string;
  //   valueCity?: string;
  //   valueServices?: string[];
  //   valueAnimals?: string[];
  //   selectedInterval?: string
}

export default function ModalProfile({
  modalVisible,
  setModalVisible,
  title,
  infoBlock,
  avatar,
  name,
  placeholder,
  onSave,
}: //   email,
//   number,
//   valueCity,
//   valueServices,
//   valueAnimals,
//   selectedInterval,
ModalProfile) {
  const [inputValue, setInputValue] = useState(name || "");

  const saveButton = () => {
    onSave(inputValue);
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
        <View>
          <Image
            source={{ uri: avatar }}
            style={{ width: 93, height: 93, borderRadius: 9999 }}
          />
          <Text>{name}</Text>
        </View>
        <View>
          <Text>{title}</Text>
          <TextInput
            placeholder={placeholder}
            // value={inputValue}
            onChangeText={setInputValue}
          />
        </View>
        <DarkButton title="Изменить" onPress={saveButton} />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalView: {
    gap: 14,
    height: "auto",
    justifyContent: "flex-end",
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
    position: "absolute",
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
    justifyContent: "center",
  },
  doneButton: {
    color: "#007AFF",
    fontSize: 16,
  },
});
