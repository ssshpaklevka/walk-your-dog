import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { RouteProp, useNavigation } from "@react-navigation/native";
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  TextInput,
  Button,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import useUserStore from "../../../stores/userStore";
import { Controller, useForm } from "react-hook-form";
import { RootStackParamList } from "../../../shared/types/typesRegistrationNavigations";
import DarkButton from "../../../shared/ui/Button/DarkButton";
import Toast from "react-native-toast-message";

const OrderDetails = ({
  route,
}: {
  route: RouteProp<RootStackParamList, "OrderDetails">;
}) => {
  const {
    selectedAnimal,
    selectedServices,
    selectedDate,
    selectedTime,
    selectedRepeat,
    totalCost,
  } = route.params;
  const parsedAnimalBirthday = selectedAnimal.birthday 
    ? new Date(selectedAnimal.birthday) 
    : new Date();
  const parsedSelectedDate = new Date(selectedDate);

  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const { user, animals } = useUserStore();

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      comment: "",
    },
  });

  const onSubmit = (data: string) => {
    console.log(data);
    reset();
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const calculateAge = (dateOfBirth: string): string => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
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

  const handlePress = () => {
    Toast.show({
      type: 'info',
      text1: 'Оплата',
      text2: 'В дальнейшем будет происходить выбор оплаты и сама оплата !'
    });

    navigation.navigate("Home" as never)
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <MaterialIcons name="keyboard-backspace" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Детали записи</Text>
      </View>
      <View style={{ gap: 10 }}>
        <TouchableOpacity style={styles.infoUser}>
          <View style={styles.imgName}>
            <Image
              source={{ uri: user?.avatar }}
              style={{ width: 50, height: 50, borderRadius: 9999 }}
            />
            <View style={styles.userName}>
              <Text style={{ fontSize: 16, fontWeight: 500 }}>
                {user?.name}
              </Text>
              <Text style={{ fontSize: 14, opacity: 0.5 }}>{user?.email}</Text>
            </View>
          </View>
          <MaterialCommunityIcons
            name="chevron-right"
            color={"#545454"}
            size={22}
          />
        </TouchableOpacity>
        <Text style={{ fontSize: 16, fontWeight: 500 }}>Комментарий</Text>
        <Controller
          control={control}
          name="comment"
          render={({ field: { onChange, value } }) => (
            <TextInput
              onChangeText={onChange}
              value={value}
              placeholder="Дополнительная информация"
              style={styles.input}
            />
          )}
        />
      </View>
      <View style={{ paddingTop: 20 }}>
        {selectedAnimal && (
          <View style={styles.blockPeet}>
            <Image
              source={{ uri: selectedAnimal.avatar }}
              style={{ width: 50, height: 50, borderRadius: 9999 }}
            />
            <View style={{ flexDirection: "column" }}>
              <Text style={{ fontSize: 16, fontWeight: 500 }}>
                {selectedAnimal.name}
              </Text>
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
              >
                <Text style={{ fontSize: 14, fontWeight: 400, color: "grey" }}>
                  {selectedAnimal.petType}
                </Text>
                <Ionicons name="ellipse" size={4} color="grey" />
                <Text style={{ fontSize: 14, fontWeight: 400, color: "grey" }}>
                  {parsedAnimalBirthday
                    ? calculateAge(parsedAnimalBirthday.toISOString())
                    : ""}
                </Text>
              </View>
            </View>
          </View>
        )}
        <View style={{ paddingTop: 10 }}>
          <View style={styles.servicesContainer}>
            {selectedServices.map((item) => (
              <View key={item.title} style={styles.serviceItem}>
                <Text style={styles.serviceText}>{item.title}</Text>
                <Text style={styles.serviceText}>{item.price} ₽</Text>
              </View>
            ))}
          </View>
        </View>
      </View>
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Общая стоимость:</Text>
        <Text style={styles.totalText}>{totalCost} ₽</Text>
      </View>
      <View style={{ paddingTop: 20, alignItems: "center", gap: 30 }}>
        <Text
          style={{
            fontSize: 16,
            maxWidth: 300,
            textAlign: "center",
          }}
        >
          Продолжая, вы соглашаетесь с{" "}
          <Text style={{ fontWeight: "500", color: "#51582F" }}>
            условиями использования приложения
          </Text>
        </Text>

        <DarkButton title="Далее" onPress={handlePress}/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    backgroundColor: "white",
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  servicesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingTop: 20,
  },
  serviceItem: {
    backgroundColor: "#F0F0F0",
    flexDirection: "row",
    padding: 12,
    borderRadius: 16,
    gap: 5,
    width: "48%",
    marginBottom: 10,
  },
  serviceText: {
    fontSize: 16,
    fontWeight: 500
  },
  totalContainer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "#E7EFBE",
    gap: 10,
    width: "100%",
    paddingVertical: 15,
    borderRadius: 39,
  },
  totalText: {
    fontSize: 16,
    fontWeight: 500,
  },
  backButton: {
    position: "absolute", 
    left: 0,
  },
  headerText: {
    fontSize: 20,
    textAlign: "center", 
  },
  infoUser: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  imgName: {
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
  },
  userName: {
    flexDirection: "column",
    gap: 5,
  },
  input: {
    color: "#2A2A2A",
    height: 50,
    borderColor: "#9D9D9D",
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 10,
    width: "100%",
  },
  blockPeet: {
    gap: 10,
    alignItems: "center",
    padding: 10,
    flexDirection: "row",
    backgroundColor: "#F4F4F4",
    borderRadius: 16,
  },
});

export default OrderDetails;
