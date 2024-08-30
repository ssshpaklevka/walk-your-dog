import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import DarkButton from "../../../shared/ui/Button/DarkButton";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import { AnimalInterface } from "../../../shared/types/animal";
import { useEffect, useState } from "react";
import ModalEvent from "../modal/ModalEvent";
import Toast from 'react-native-toast-message';
import useUserStore from "../../../stores/userStore";
import { EventInterface } from "../../../shared/types/events";

const formatDate = (date: Date, format: "short" | "long" = "long") => {
  const options: Intl.DateTimeFormatOptions = {
    weekday: format,
    day: "numeric",
    month: "short", 
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  };
  return date.toLocaleString("ru-RU", options);
};

const daysToShow = 30;

export default function InfoEvent() {
  const insets = useSafeAreaInsets();
  const route = useRoute();
  const navigation = useNavigation();
  const { addEvent } = useUserStore()

  const [selectedWeekDay, setSelectedWeekDay] = useState<string>("");

  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  const [selectedTime, setSelectedTime] = useState("9:00");
  const [selectedRepeat, setSelectedRepeat] = useState("Никогда");
  const [selectedRemind, setSelectedRemind] = useState("За 2 часа");

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 60000); 

    return () => clearInterval(interval); 
  }, []);

  const [selectedDate, setSelectedDate] = useState(new Date());
  const dates = Array.from({ length: daysToShow }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    return date;
  });

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    const daysOfWeek = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];
    setSelectedWeekDay(daysOfWeek[date.getDay()]);
  };

  const handleSaveDate = (
    date: Date,
    time: string,
    repeat: string
    // remind: string
  ) => {
    setSelectedDate(date);
    setSelectedTime(time);
    setSelectedRepeat(repeat);
    // setSelectedRemind(remind);
  };

  const formatSelectedDateTime = () => {
    if (!selectedDate || !selectedTime) return "";

    const datePart = selectedDate.toLocaleDateString("ru-RU", {
      day: "numeric",
      month: "long",
    });
 
    return `${datePart}, ${selectedTime}`;
  };

  const buttonSave = () => {
    const newEvent: EventInterface = {
      id: Math.random().toString(36).substr(2, 9), 
      serviceName,
      selectedPet,
      address: 'Мелиоративная 138/2, офис 32', 
      date: selectedDate,
      time: selectedTime,
      repeat: selectedRepeat,
      remind: selectedRemind,
    };

   
    addEvent(newEvent);

    console.log(addEvent)
    
      Toast.show({
        type: 'success',
        text1: 'Успешно',
        text2: 'Напоминание сохранено !'
      });

      navigation.navigate("Home" as never);
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const [modalVisible, setModalVisible] = useState(false);

  const { serviceName } = route.params as { serviceName: string };
  const { selectedPet } = route.params as { selectedPet: AnimalInterface };

  const calculateAge = (dateOfBirth: string): string => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
  
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
  
    const months = (today.getMonth() + 12 - birthDate.getMonth()) % 12;
  
    if (age === 0) {
      return `${months} мес.`;
    } else if (age === 1) {
      return `${age} год, ${months} мес.`;
    } else if (age >= 2 && age <= 4) {
      return `${age} года, ${months} мес.`;
    } else {
      return `${age} лет, ${months} мес.`;
    }
  };
  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <MaterialIcons name="keyboard-backspace" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Информация о событии</Text>
      </View>
      <View style={{ paddingTop: 20, gap: 20 }}>
        <View style={styles.blockEvent}>
          <Text style={styles.textHeader}>Название события</Text>
          <Text style={styles.textInput}>{serviceName}</Text>
        </View>
        <View style={styles.blockPeet}>
          <Image
            source={{ uri: selectedPet.avatar }}
            style={{ width: 50, height: 50, borderRadius: 9999 }}
          />
          <View style={{ flexDirection: "column" }}>
            <Text style={styles.textInput}>{selectedPet.name}</Text>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
            >
              <Text style={{ fontSize: 14, color: "grey" }}>
                {selectedPet.petType}
              </Text>
              <Ionicons name="ellipse" size={4} color="grey" />
              <Text style={{ fontSize: 14, color: "grey" }}>
              {selectedPet.birthday ? calculateAge(selectedPet.birthday.toISOString()) : ''}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.blockAddress}>
          <Text style={styles.textHeader}>Адрес</Text>
          <Text style={styles.textInput}>Мелиоративная 138/2, офис 32</Text>
        </View>
        <View style={{ gap: 10 }}>
          <Text style={styles.textInput}>{formatSelectedDateTime()}</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {dates.map((date) => (
              <TouchableOpacity
                key={date.toISOString()}
                onPress={() => handleDateSelect(date)}
                style={[
                  styles.dateButton,
                  selectedDate.toDateString() === date.toDateString() &&
                    styles.selectedDateButton,
                ]}
              >
                {date.getDate() === new Date().getDate() ||
                date.getDate() === new Date().getDate() + 1 ? (
                  // Для "Сегодня" и "Завтра"
                  <>
                    <Text
                      style={[
                        styles.dateText,
                        selectedDate.toDateString() === date.toDateString() &&
                          styles.selectedDateText,
                      ]}
                    >
                      {date.getDate() === new Date().getDate()
                        ? "Сегодня"
                        : "Завтра"}
                    </Text>
                    <Text
                      style={[
                        styles.dayOfWeekText,
                        selectedDate.toDateString() === date.toDateString() &&
                          styles.selectedDayOfWeekText,
                      ]}
                    >
                      {formatDate(date, "short").split(",")[0]}
                    </Text>
                  </>
                ) : (
                  // Для остальных дней
                  <>
                    <Text
                      style={[
                        styles.dateText,
                        selectedDate.toDateString() === date.toDateString() &&
                          styles.selectedDateText,
                      ]}
                    >
                      {formatDate(date, "short").split(",")[1].trim()}
                    </Text>
                    <Text
                      style={[
                        styles.dayOfWeekText,
                        selectedDate.toDateString() === date.toDateString() &&
                          styles.selectedDayOfWeekText,
                      ]}
                    >
                      {formatDate(date, "short").split(",")[0]}
                    </Text>
                  </>
                )}
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        <View style={{ gap: 10 }}>
          <TouchableOpacity
            style={styles.input}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.textHeaderInput}>Время</Text>
            <Text style={{ fontSize: 16, fontWeight: 500 }}>
              {selectedTime}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.input}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.textHeaderInput}>Повторение</Text>
            <Text style={{ fontSize: 16, fontWeight: 500 }}>
              {selectedRepeat}
            </Text>
          </TouchableOpacity>
          <View style={styles.input}>
            <Text style={styles.textHeaderInput}>Напомнить</Text>
            <Text style={{ fontSize: 16, fontWeight: 500 }}>
              {selectedRemind}
            </Text>
          </View>
          <ModalEvent
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            selectedDate={selectedDate}
            dates={dates}
            onSaveDate={handleSaveDate}
          />
        </View>
      </View>
      <View
        style={{
          justifyContent: "flex-end",
          paddingTop: 30,
        }}
      >
        <DarkButton title="Сохранить" onPress={buttonSave}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
    color: "#C0C0C0",
  },
  selectedDayOfWeekText: {},
  container: {
    paddingHorizontal: 15,
    backgroundColor: "white",
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center", 
    position: "relative", 
    paddingHorizontal: 15,
  },
  backButton: {
    position: "absolute", 
    left: 0,
  },
  headerText: {
    fontSize: 20,
    textAlign: "center", 
  },
  blockPeet: {
    gap: 10,
    alignItems: "center",
    padding: 10,
    flexDirection: "row",
    backgroundColor: "#F4F4F4",
    borderRadius: 16,
  },
  blockEvent: {
    gap: 5,
    padding: 10,
    backgroundColor: "#F4F4F4",
    borderRadius: 16,
  },
  blockAddress: {
    gap: 5,
    padding: 10,
    backgroundColor: "#F4F4F4",
    borderRadius: 16,
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
  textInput: {
    fontSize: 16,
    fontWeight: 500,
  },
  textHeaderInput: {
    fontSize: 10,
    paddingBottom: 2,
    color: "#B8B8B8",
  },
  textHeader: {
    fontSize: 12,
    opacity: 0.5,
    color: "black",
  },
});
