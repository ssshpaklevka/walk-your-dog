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

const { height } = Dimensions.get("window");

export default function DateBirthday({
  modalVisible,
  setModalVisible,
  selectedDate,
  setSelectedDate,
  onSave,
}: ModalBirthdayProps) {
  const [showDatePicker, setShowDatePicker] = useState(false);
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
