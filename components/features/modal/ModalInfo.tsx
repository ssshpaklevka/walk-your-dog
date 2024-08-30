import React, { useEffect, useState } from "react";
import {
  Animated,
  Easing,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import DarkButton from "../../../shared/ui/Button/DarkButton";
import DropDownPicker from "react-native-dropdown-picker";

interface ModalTimeProps {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
}

export default function ModalInfo({
  modalVisible,
  setModalVisible,
}: ModalTimeProps) {
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const [overlayVisible, setOverlayVisible] = useState(false);
  useEffect(() => {
    if (modalVisible) {
      setOverlayVisible(true);
      fadeAnim.setValue(0);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
        easing: Easing.ease,
      }).start();
    } else {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
        easing: Easing.ease,
      }).start(() => setOverlayVisible(false));
    }
  }, [modalVisible, fadeAnim]);

  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [activeInput, setActiveInput] = useState<"start" | "end" | null>(null);

  const [openRepeat, setOpenRepeat] = useState(false);
  const [selectedRepeat, setSelectedRepeat] = useState("Никогда");
  const [itemsRepeat, setItemsRepeat] = useState([
    { label: "Пн", value: "Пн" },
    { label: "Вт", value: "Вт" },
    { label: "Ср", value: "Ср" },
    { label: "Чт", value: "Чт" },
    { label: "Пт", value: "Пт" },
    { label: "Сб", value: "Сб" },
    { label: "Вс", value: "Вс" },
  ]);

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
    if (activeInput === "start") {
      setStartTime(currentDate);
    } else if (activeInput === "end") {
      setEndTime(currentDate);
    }
    if (Platform.OS === "android") {
      setShowTimePicker(false);
    }
  };

  const handleTimePress = (inputType: "start" | "end") => {
    setActiveInput(inputType);
    setShowTimePicker(true);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("ru-RU", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatDate = (date: Date) => {
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
      return "Сегодня";
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return "Завтра";
    }
    return date.toLocaleDateString("ru-RU", {
      day: "numeric",
      month: "short",
    });
  };

  const formatDayOfWeek = (date: Date) => {
    return date.toLocaleDateString("ru-RU", { weekday: "short" });
  };

const handleOk = () => { 
    setModalVisible(false);
}

  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(false);
      }}
    >
      {overlayVisible && (
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <Animated.View style={[styles.overlay, { opacity: fadeAnim }]} />
        </TouchableWithoutFeedback>
      )}
      <Animated.View
        style={[
          styles.modalView,
          {
            transform: [
              {
                translateY: fadeAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [300, 0],
                }),
              },
            ],
          },
        ]}
      >
        <Text  style={{fontSize: 18, fontWeight: 600}}>Выгул для собак</Text>

        <View>
          <Text style={{ textAlign: "center", fontSize: 16, fontWeight: 400 }}>
            Во время часовой прогулки питомец пройдет примерно 10 километров по
            самым разнообразным дорогам и при необходимости получит тренировку
            от профессионального кинолога
          </Text>
        </View>
        <View style={{gap: 15, width: "100%"}}>
          <View style={{flexDirection: "row", justifyContent: "space-between", borderBottomWidth: 1, borderBottomColor: "#D9D9D9", paddingBottom: 10, alignItems: "center"  }}>
            <Text  style={{fontSize: 16, fontWeight: 500}}>Длительность</Text>
            <Text  style={{fontSize: 16, fontWeight: 500}}>60 минут</Text>
          </View>
          <View  style={{flexDirection: "row", justifyContent: "space-between", borderBottomWidth: 1, borderBottomColor: "#D9D9D9", paddingBottom: 10, alignItems: "center"  }}>
            <Text style={{fontSize: 16, fontWeight: 500}}>Помыть лапы после прогулки</Text>
            <Text  style={{fontSize: 16, fontWeight: 500}}>+450 ₽ </Text>
          </View>
          <View  style={{flexDirection: "row", justifyContent: "space-between", borderBottomWidth: 1, borderBottomColor: "#D9D9D9", paddingBottom: 10, alignItems: "center"  }}>
            <Text  style={{fontSize: 16, fontWeight: 500}}>Покормить после прогулки</Text>
            <Text  style={{fontSize: 16, fontWeight: 500}}>+150 ₽ </Text>
          </View>
          <View  style={{flexDirection: "row", justifyContent: "space-between", borderBottomWidth: 1, borderBottomColor: "#D9D9D9", paddingBottom: 10, alignItems: "center"  }}>
            <Text  style={{fontSize: 16, fontWeight: 500}}>Дрессировка</Text>
            <Text  style={{fontSize: 16, fontWeight: 500}}>+150 ₽ </Text>
          </View>
          <View  style={{flexDirection: "row", justifyContent: "space-between", borderBottomWidth: 1, borderBottomColor: "#D9D9D9", paddingBottom: 10, alignItems: "center"  }}>
            <Text  style={{fontSize: 16, fontWeight: 500}}>Грумминг</Text>
            <Text  style={{fontSize: 16, fontWeight: 500}}>+1250 ₽ </Text>
          </View>
        </View>
        <DarkButton title="Понятно" onPress={handleOk}/>
      </Animated.View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
  },
  dateButton: {
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 11,
    marginRight: 5,
    backgroundColor: "#F4F4F4",
    alignItems: "center",
  },
  selectedDateButton: {
    backgroundColor: "#E7EFBE",
    borderColor: "#E7EFBE",
  },
  dateText: {
    fontSize: 14,
  },
  selectedDateText: {},
  dayOfWeekText: {
    fontSize: 12,
    fontWeight: 500,
    color: "C0C0C0",
  },
  selectedDayOfWeekText: {},
  modalView: {
    gap: 14,
    height: "auto",
    justifyContent: "flex-end",
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 35,
    paddingHorizontal: 30,
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
  inputDrop: {
    borderWidth: 0,
    borderBottomWidth: 1,
    borderRadius: 0,
    borderBottomColor: "#C5C5C5",
  },
  inputDropDown: {
    height: 130,
    borderRadius: 10,
    borderColor: "#C5C5C5",
  },
  doneButton: {
    color: "#007AFF",
    fontSize: 16,
  },
});
