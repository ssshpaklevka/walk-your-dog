import React, { useEffect, useState } from "react";
import {
  Animated,
  Dimensions,
  Easing,
  Modal,
  PanResponder,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
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

const { height } = Dimensions.get("window");

export default function ModalTime({
  modalVisible,
  setModalVisible,
  selectedInterval,
  setSelectedInterval
}: ModalTimeProps) {
  const panAnim = React.useRef(new Animated.Value(height)).current; // для модалки
  const handleAnim = React.useRef(new Animated.Value(0)).current; // для линии
  const opacityAnim = React.useRef(new Animated.Value(0)).current; // для прозрачности
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (modalVisible) {
      // Сброс значения panAnim перед началом анимации
      panAnim.setValue(height);

      Animated.parallel([
        Animated.timing(panAnim, {
          toValue: 0,
          duration: 400, // Увеличьте продолжительность для более плавной анимации
          useNativeDriver: true,
          easing: Easing.out(Easing.ease), // Используйте более плавную функцию сглаживания
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
          easing: Easing.out(Easing.ease),
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(panAnim, {
          toValue: height,
          duration: 300,
          useNativeDriver: true,
          easing: Easing.in(Easing.ease),
        }),
        Animated.timing(opacityAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
          easing: Easing.in(Easing.ease),
        }),
      ]).start();
    }
  }, [modalVisible, panAnim, opacityAnim]);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (evt, gestureState) => {
      const { dy } = gestureState;
      if (dy > 0) {
        panAnim.setValue(dy);
      }
    },
    onPanResponderRelease: (evt, gestureState) => {
      const { dy } = gestureState;
      const modalHeight = 300; // Высота модального окна
      const threshold = modalHeight / 2; // Порог для определения, закрывать ли окно

      if (dy > threshold) {
        // Если свайп был больше половины высоты модального окна, закрываем окно с анимацией
        Animated.timing(panAnim, {
          toValue: height,
          duration: 200,
          useNativeDriver: true,
          easing: Easing.ease,
        }).start(() => {
          setModalVisible(false);
          setOverlayVisible(false);
        });
      } else {
        // Если свайп был меньше половины высоты модального окна, возвращаем окно в исходное положение с анимацией
        Animated.timing(panAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
          easing: Easing.ease,
        }).start(() => {
          // Анимация для линии
          Animated.sequence([
            Animated.timing(handleAnim, {
              toValue: -2, // Поднимаем линию на 10 пикселей вверх
              duration: 150,
              useNativeDriver: true,
              easing: Easing.ease,
            }),
            Animated.timing(handleAnim, {
              toValue: 0, // Возвращаем линию в исходное положение
              duration: 150,
              useNativeDriver: true,
              easing: Easing.ease,
            }),
          ]).start();
        });
      }
      setIsDragging(false);
    },
  });

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
      animationType="none"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(false);
      }}
    >
      {modalVisible && (
        <TouchableWithoutFeedback
          onPress={() => {
            Animated.parallel([
              Animated.timing(panAnim, {
                toValue: height,
                duration: 300,
                useNativeDriver: true,
                easing: Easing.in(Easing.ease),
              }),
              Animated.timing(opacityAnim, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
                easing: Easing.in(Easing.ease),
              }),
            ]).start(() => {
              setModalVisible(false);
            });
          }}
        >
          <Animated.View style={[styles.overlay, { opacity: opacityAnim }]} />
        </TouchableWithoutFeedback>
      )}
      <Animated.View
        {...panResponder.panHandlers}
        style={[
          styles.modalView,
          {
            transform: [
              {
                translateY: panAnim,
              },
            ],
            opacity: opacityAnim,
          },
        ]}
      >
        <Animated.View
          style={[
            styles.handle,
            {
              transform: [{ translateY: handleAnim }],
            },
          ]}
        />
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
      </Animated.View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
  },
  handle: {
    width: "40%",
    height: 5,
    borderRadius: 5,
    backgroundColor: "#51582F",
  },
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