import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Easing,
  Modal,
  PanResponder,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import DarkButton from "../../../shared/ui/Button/DarkButton";
import Record from "../../../shared/ui/Record/Record";
import { useNavigation } from "@react-navigation/native";

interface ModalTimeProps {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
}

const { height } = Dimensions.get("window");

export default function AddRecord({
  modalVisible,
  setModalVisible,
}: ModalTimeProps) {
  const panAnim = React.useRef(new Animated.Value(height)).current;
  const handleAnim = React.useRef(new Animated.Value(0)).current;
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    if (modalVisible) {
      setOverlayVisible(true);
      Animated.timing(panAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
        easing: Easing.ease,
      }).start();
    } else {
      Animated.timing(panAnim, {
        toValue: height,
        duration: 300,
        useNativeDriver: true,
        easing: Easing.ease,
      }).start(() => setOverlayVisible(false));
    }
  }, [modalVisible, panAnim]);

  const navigationReminder = () => {
    setModalVisible(false);
    navigation.navigate("Reminder" as never);
  };

  const navigationServices = () => {
    setModalVisible(false);
    navigation.navigate("Services" as never);
  };

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (evt, gestureState) => {
      const { dy } = gestureState;
      if (dy > 0) {
        panAnim.setValue(dy);
        setIsDragging(true);
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
          <View style={styles.overlay} />
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
        <Text style={{ fontSize: 16, fontWeight: 500 }}>
          Добавить новую запись
        </Text>
        <TouchableOpacity onPress={navigationReminder}>
          <Record
            title="Напоминание"
            description="Не забудьте о записи к врачу о тренировке с кинологом или регулярной стрижке когтей"
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={navigationServices}>
          <Record
            title="Запись на услугу"
            description="Закажите выгул, ситтера, няню 
или кинолога от нашего сервиса"
          />
        </TouchableOpacity>
        {/* <DarkButton title="foekjf" onPress={() => setModalVisible(false)} /> */}
      </Animated.View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
  },
  modalView: {
    gap: 14,
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
  handle: {
    width: "40%",
    height: 5,
    borderRadius: 5,
    backgroundColor: "#51582F",
  },
});
