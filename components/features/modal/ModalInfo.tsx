import React, { useEffect, useState } from "react";
import {
  Animated,
  Dimensions,
  Easing,
  Modal,
  PanResponder,
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

const { height } = Dimensions.get("window");

export default function ModalInfo({
  modalVisible,
  setModalVisible,
}: ModalTimeProps) {
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
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

  const handleOk = () => {
    setModalVisible(false);
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
        <Text style={{ fontSize: 18, fontWeight: 600 }}>Выгул для собак</Text>

        <View>
          <Text style={{ textAlign: "center", fontSize: 16, fontWeight: 400 }}>
            Во время часовой прогулки питомец пройдет примерно 10 километров по
            самым разнообразным дорогам и при необходимости получит тренировку
            от профессионального кинолога
          </Text>
        </View>
        <View style={{ gap: 15, width: "100%" }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              borderBottomWidth: 1,
              borderBottomColor: "#D9D9D9",
              paddingBottom: 10,
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: 500 }}>Длительность</Text>
            <Text style={{ fontSize: 16, fontWeight: 500 }}>60 минут</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              borderBottomWidth: 1,
              borderBottomColor: "#D9D9D9",
              paddingBottom: 10,
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: 500 }}>
              Помыть лапы после прогулки
            </Text>
            <Text style={{ fontSize: 16, fontWeight: 500 }}>+450 ₽ </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              borderBottomWidth: 1,
              borderBottomColor: "#D9D9D9",
              paddingBottom: 10,
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: 500 }}>
              Покормить после прогулки
            </Text>
            <Text style={{ fontSize: 16, fontWeight: 500 }}>+150 ₽ </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              borderBottomWidth: 1,
              borderBottomColor: "#D9D9D9",
              paddingBottom: 10,
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: 500 }}>Дрессировка</Text>
            <Text style={{ fontSize: 16, fontWeight: 500 }}>+150 ₽ </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              borderBottomWidth: 1,
              borderBottomColor: "#D9D9D9",
              paddingBottom: 10,
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: 500 }}>Грумминг</Text>
            <Text style={{ fontSize: 16, fontWeight: 500 }}>+1250 ₽ </Text>
          </View>
        </View>
        <DarkButton title="Понятно" onPress={handleOk} />
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
    paddingTop: 20,
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
  handle: {
    width: "40%",
    height: 5,
    borderRadius: 5,
    backgroundColor: "#51582F",
  },
});
