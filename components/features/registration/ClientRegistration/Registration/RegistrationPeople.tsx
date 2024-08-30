import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  Linking,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import * as ImagePicker from "expo-image-picker";
import DropDownPicker from "react-native-dropdown-picker";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { UserInterface } from "../../../../../shared/types/user";
import { RootStackParamList } from "../../../../../shared/types/typesRegistrationNavigations";
import useUserStore from "../../../../../stores/userStore";
import DarkButton from "../../../../../shared/ui/Button/DarkButton";
import { AntDesign } from "@expo/vector-icons";

type ItemType = {
  label: string;
  value: string;
};

export default function RegistrationPeople() {
  const insets = useSafeAreaInsets();
  const [avatar, setAvatar] = useState<string | null>(null);
  const [phoneNumber, setPhoneNumber] = React.useState<string>("+7");
  const [openCity, setOpenCity] = useState(false);
  const [cityItems, setCityItems] = useState<ItemType[]>([
    { label: "Москва", value: "city1" },
    { label: "Санкт-Петербург", value: "city2" },
    { label: "Казань", value: "city3" },
    { label: "Краснодар", value: "city4" },
  ]);

  const { control, handleSubmit, setValue, watch } = useForm<UserInterface>({
    defaultValues: {
      name: "",
      email: "",
      number: "",
      valueCity: "",
      valueServices: [],
      valueAnimals: [],
      selectedInterval: "",
    },
  });

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status === "granted") {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.canceled && result.assets.length > 0) {
        setAvatar(result.assets[0].uri);
      }
    } else {
      Alert.alert(
        "Вы запретили использование фото. Разрешите использование в настройках"
      );
      Linking.openSettings();
    }
  };

  const formatPhoneNumber = (text: string): string => {
    
    const cleaned = text.replace(/\D/g, '');
    
    let formatted = cleaned;
    if (!text.startsWith("+7") && !text.startsWith("7")) {
      formatted = '+7' + formatted;
    }
    

    if (formatted.length > 4) {
      formatted = formatted.slice(0, 4) + ' ' + formatted.slice(4);
    }
    if (formatted.length > 7) {
      formatted = formatted.slice(0, 7) + ' ' + formatted.slice(7);
    }
    if (formatted.length > 10) {
      formatted = formatted.slice(0, 10) + ' ' + formatted.slice(10);
    }
    
    return formatted;
  };

  const handlePhoneNumberChange = (text: string): string => {
  
    if (!text.startsWith("+7")) {
      text = "+7" + text.replace(/^\+7/, "");
    }
    
    const phoneNumberPattern = /^\+7\d{0,10}$/;
    if (phoneNumberPattern.test(text)) {
      return text; 
    }
    return text;
  };


  const newUser = useUserStore((state) => state.newUser);

  const onSubmit = (data: Omit<UserInterface, "avatar">) => {
    const userData: UserInterface = {
      ...data,
      avatar: avatar || "",
      balance: 0,
     
    };

    newUser(userData);
    console.log(userData);

  
    navigation.navigate("RegistrationAnimals");
  };

  // const handleFormAnimal = () => {
  //   navigation.navigate("RegistrationAnimals");
  // };


  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <View style={styles.upComponent}>
          <View style={{ alignItems: "center", paddingBottom: 40 }}>
            <Text style={{ fontSize: 20, fontWeight: 500 }}>
              Давайте знакомиться!
            </Text>
            <Text style={{ fontSize: 18, fontWeight: 400 }}>
              Расскажите о себе
            </Text>
          </View>

          <TouchableOpacity onPress={pickImage}>
            {avatar ? (
              <Image source={{ uri: avatar }} style={styles.avatar} />
            ) : (
              <View style={styles.avatarPlaceholder}>
                <Image source={require("../../../../../assets/Avatar.png")} />
              </View>
            )}
          </TouchableOpacity>

          <View style={styles.form}>
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <DropDownPicker
                  open={openCity}
                  value={value}
                  items={cityItems}
                  setOpen={setOpenCity}
                  setValue={(callback) => {
                    const newValue =
                      typeof callback === "function"
                        ? callback(value)
                        : callback;
                    onChange(newValue);
                  }}
                  setItems={setCityItems}
                  style={styles.input}
                  placeholder="Выберите свой город"
                  dropDownContainerStyle={styles.input}
                />
              )}
              name="valueCity"
            />
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={styles.input}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="Имя"
                />
              )}
              name="name"
            />

            <Controller
              control={control}
              name="number"
              rules={{ required: true }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={styles.input}
                  onBlur={onBlur}
                  onChangeText={(text) => {
                    const formatted = handlePhoneNumberChange(text);
                    onChange(formatted);
                  }}
                  value={value}
                  placeholder="Номер телефона"
                  keyboardType="phone-pad"
                  maxLength={12}
                />
              )}
            />

            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={styles.input}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="Электронная почта"
                  keyboardType="email-address"
                />
              )}
              name="email"
            />

            {/* <DarkButton
              title="Рассказать о питомце"
              onPress={async () => await handleSubmit(onSubmit)()}
            /> */}
            <TouchableOpacity style={styles.button} onPress={async () => await handleSubmit(onSubmit)()}>
              <Text style={styles.text}>Рассказать о питомце</Text>
              <AntDesign name="arrowright" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.downText}>
          <Text style={{ fontSize: 14, fontWeight: "400" }}>
            Связаться с поддержкой
          </Text>
          <Text style={{ fontSize: 10, fontWeight: "400" }}>
            Версия приложения 1.01
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "white"
  },
  avatar: {
    width: 98,
    height: 98,
    borderRadius: 50,
  },
  avatarPlaceholder: {
    // width: 130,
    // height: 130,
    // borderRadius: 9999,
    // backgroundColor: "#EDEDED",
    // justifyContent: "center",
    // alignItems: "center",
  },
  upComponent: {
    alignItems: "center",
    width: "100%",
  },
  form: {
    paddingTop: 30,
    width: "100%",
    gap: 20,
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
  falseInput: {
    color: "#2A2A2A",
    height: 50,
    borderColor: "#9D9D9D",
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 10,
    width: "100%",
    justifyContent: "center",
  },
  inputText: {
    color: "#000000",
  },
  placeholderText: {
    color: "#9D9D9D",
  },
  dropdown: {
    borderBottomWidth: 1,
    marginBottom: 20,
  },
  dropdownContainer: {
    // borderBottomWidth: 1,
    zIndex: 1000,
  },
  downText: {
    gap: 15,
    alignItems: "center",
    marginBottom: 20,
  },
  button: {
    gap: 20,
    width: "100%",
    alignContent: "center",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "black",
    borderRadius: 48,
    borderWidth: 1,
    padding: 15,
    marginBottom: 20,
  },
  text: {
    textAlign: "center",
    color: "white",
    fontSize: 16,
    fontWeight: "500",
  },
});
