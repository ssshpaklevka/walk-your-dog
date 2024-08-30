import React, { useEffect, useState } from "react";
import {
  Animated,
  Easing,
  Modal,
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

export default function AddRecord({
  modalVisible,
  setModalVisible,
}: ModalTimeProps) {
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const [overlayVisible, setOverlayVisible] = useState(false);

  const navigation = useNavigation();

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

  const navigationReminder = () => {
    setModalVisible(false);
    navigation.navigate("Reminder" as never);
  };

  const navigationServices = () => {
    setModalVisible(false);
    navigation.navigate("Services" as never);
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
});
