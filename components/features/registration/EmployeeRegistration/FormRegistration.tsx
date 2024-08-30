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
import DarkButton from "../../../../shared/ui/Button/DarkButton";
import ModalTime from "./_components/ModalTime";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../../../shared/types/typesRegistrationNavigations";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import useUserStore from "../../../../stores/userStore";
import { UserInterface } from "../../../../shared/types/user";

type ItemType = {
  label: string;
  value: string;
};

export default function FormRegistration() {
  const insets = useSafeAreaInsets();
  const [avatar, setAvatar] = useState<string | null>(null);
  const [phoneNumber, setPhoneNumber] = React.useState<string>("+7");
  const [openCity, setOpenCity] = useState(false);
  const [openServices, setOpenServices] = useState(false);
  const [openAnimals, setOpenAnimals] = useState(false);
  const [cityItems, setCityItems] = useState<ItemType[]>([
    { label: "Москва", value: "city1" },
    { label: "Санкт-Петербург", value: "city2" },
    { label: "Казань", value: "city3" },
    { label: "Краснодар", value: "city4" },
  ]);

  const [serviceItems, setServiceItems] = useState<ItemType[]>([
    { label: "Выгул", value: "service1" },
    { label: "Няня", value: "service2" },
    { label: "Ситтер", value: "service3" },
  ]);

  const [animalItems, setAnimalItems] = useState<ItemType[]>([
    { label: "Кошки", value: "animal1" },
    { label: "Собаки", value: "animal2" },
    { label: "Птицы", value: "animal3" },
    { label: "Грызуны", value: "animal4" },
  ]);
  const [modalVisible, setModalVisible] = useState(false);

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

  const handlePhoneNumberChange = (text: string) => {
    if (!text.startsWith("+7")) {
      text = "+7" + text.replace(/^\+7/, "");
    }

    const phoneNumberPattern = /^\+7\d{0,10}$/;
    if (phoneNumberPattern.test(text)) {
      setPhoneNumber(text);
    }
  };

  const newUser = useUserStore((state) => state.newUser);

  const onSubmit = (data: Omit<UserInterface, "avatar">) => {
    const userData: UserInterface = {
      ...data,
      avatar: avatar || "",
    };
    newUser(userData);
    console.log(userData);
    navigation.navigate("TabNavigator");
  };

  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  const handleServiceChange = (value: string[]) => {
    const selectedLabels = getLabelsFromValues(serviceItems, value);
    setSelectedServices(selectedLabels); 
};

  const [selectedAnimals, setSelectedAnimals] = useState<string[]>([]);

  const handleAnimalChange = (value: string[]) => {
    const selectedLabels = getLabelsFromValues(animalItems, value);
    setSelectedAnimals(selectedLabels); 
};

  useEffect(() => {
    setValue("valueServices", selectedServices);
  }, [selectedServices]);

  useEffect(() => {
    setValue("valueAnimals", selectedAnimals);
  }, [selectedAnimals]);

  const getLabelsFromValues = (items: ItemType[], values: string[]) => {
    return items
        .filter(item => values.includes(item.value))
        .map(item => item.label);
};

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <Text style={{ fontSize: 20, fontWeight: 500 }}>
          Давайте знакомиться!
        </Text>
        <Text style={{ fontSize: 18, fontWeight: 400 }}>Расскажите о себе</Text>

        <TouchableOpacity onPress={pickImage}>
          {avatar ? (
            <Image source={{ uri: avatar }} style={styles.avatar} />
          ) : (
            <View style={styles.avatarPlaceholder}>
              <Image source={require("../../../../assets/Avatar.png")} />
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
                    typeof callback === "function" ? callback(value) : callback;
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
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                onBlur={onBlur}
                onChangeText={handlePhoneNumberChange}
                value={phoneNumber}
                placeholder="Номер телефона"
                keyboardType="phone-pad"
              />
            )}
            name="number"
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

          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <DropDownPicker
                open={openServices}
                value={value}
                items={serviceItems}
                setOpen={setOpenServices}
                setValue={setSelectedServices}
                setItems={setServiceItems}
                multiple={true}
                multipleText={getLabelsFromValues(serviceItems, value).join(", ")}
                style={styles.input}
                placeholder="Услуги"
                dropDownContainerStyle={styles.input}
                
              />
            )}
            name="valueServices"
          />

          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <View style={styles.falseInput}>
              <TextInput
                editable={false}
                value={watch("selectedInterval")}
                placeholder="Выберите интервал для работы"
                placeholderTextColor="#9D9D9D"
                style={[
                  watch("selectedInterval")
                    ? styles.inputText
                    : styles.placeholderText,
                ]}
              />
            </View>
          </TouchableOpacity>

          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <DropDownPicker
                open={openAnimals}
                items={animalItems}
                multiple={true}
                multipleText={getLabelsFromValues(animalItems, value).join(", ")}
                min={0}
                max={10}
                value={value}
                setOpen={setOpenAnimals}
                setValue={setSelectedAnimals}
                setItems={setAnimalItems}
                style={styles.input}
                placeholder="Животные"
                dropDownContainerStyle={[
                  styles.input,
                  styles.dropdownContainer,
                ]}
              />
            )}
            name="valueAnimals"
          />
        </View>

        <DarkButton title="Продолжить" onPress={handleSubmit(onSubmit)} />

        <ModalTime
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          selectedInterval={watch("selectedInterval")}
          setSelectedInterval={(interval) =>
            setValue("selectedInterval", interval)
          }
        />

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
  form: {
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
});
