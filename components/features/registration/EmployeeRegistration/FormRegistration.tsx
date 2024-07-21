import React, { useState } from "react";
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
  ScrollView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import DropDownPicker from "react-native-dropdown-picker";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import DarkButton from "../../../../shared/ui/Button/DarkButton";
import ModalTime from "./_components/ModalTime";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../../../shared/types/typesRegistrationNavigations";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
type ItemType = {
  label: string;
  value: string;
};
export default function FormRegistration() {
  const insets = useSafeAreaInsets();
  const [avatar, setAvatar] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [openCity, setOpenCity] = useState(false);
  const [openServices, setOpenServices] = useState(false);
  const [openAnimals, setOpenAnimals] = useState(false);
  const [valueCity, setValueCity] = useState(null);
  const [valueServices, setValueServices] = useState<string[]>([]); // Изменено на массив
  const [valueAnimals, setValueAnimals] = useState<string[]>([]); // Изменено на массив
  
  const [items, setItems] = useState<ItemType[]>([
    { label: "Option 1", value: "option1" },
    { label: "Option 2", value: "option2" },
    { label: "Option 3", value: "option3" },
  ]);
  
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedInterval, setSelectedInterval] = useState("");

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
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

const clickEndReg = () => {
  navigation.navigate("TabNavigator", {
    avatar,
    name,
    email,
    number,
    valueCity,
    valueServices,
    valueAnimals,
    selectedInterval,
  })
}

  const handleGoBack = () => {
    navigation.goBack();
  };

  
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={[styles.container, { paddingTop: insets.top }]}>
      
          {/* <TouchableOpacity onPress={handleGoBack}>
            <MaterialIcons name="keyboard-backspace" size={24} color="black" />
          </TouchableOpacity> */}
          <Text style={{ fontSize: 20, fontWeight: 500 }}>
            Давайте знакомиться!
          </Text>
          <Text style={{ fontSize: 18, fontWeight: 400 }}>
            Расскажите о себе
          </Text>
     
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
          <DropDownPicker
            open={openCity}
            value={valueCity}
            items={items}
            setOpen={setOpenCity}
            setValue={setValueCity}
            setItems={setItems}
            style={styles.input}
            placeholder="Выберите свой город"
            dropDownContainerStyle={styles.input}
          />
          <TextInput
            style={styles.input}
            keyboardType="default"
            onChangeText={setName}
            placeholder="Имя"
          />
          <TextInput
            style={styles.input}
            keyboardType="phone-pad"
            onChangeText={setNumber}
            placeholder="Номер телефона"
          />
          <TextInput
            style={styles.input}
            keyboardType="email-address"
            onChangeText={setEmail}
            placeholder="Электронная почта"
          />
          <DropDownPicker
            open={openServices}
            value={valueServices} // Массив значений
            items={items}
            setOpen={setOpenServices}
            setValue={setValueServices} // Установка значения
            setItems={setItems}
            multiple={true} // Указываем, что это множественный выбор
            onChangeValue={(values) => {
              setValueServices(values as string[]); // Обновляем массив значений
            }}
            style={styles.input}
            placeholder="Услуги"
            dropDownContainerStyle={styles.input}
          />
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <View style={styles.falseInput}>
              <TextInput
                editable={false}
                value={selectedInterval}
                placeholder="Выберите интервал для работы"
                placeholderTextColor="#9D9D9D"
                style={[
                  selectedInterval ? styles.inputText : styles.placeholderText,
                ]}
              />
            </View>
          </TouchableOpacity>

          <DropDownPicker
            open={openAnimals}
            items={items}
            multiple={true} // Указываем, что это множественный выбор
            value={valueAnimals} // Массив значений
            setOpen={setOpenAnimals}
            setValue={setValueAnimals} // Установка значения
            setItems={setItems}
            onChangeValue={(values) => {
              setValueAnimals(values as string[]); // Обновляем массив значений
            }}
            style={styles.input}
            placeholder="Животные"
            dropDownContainerStyle={[styles.input, styles.dropdownContainer]}
          />
        </View>
        <DarkButton title="Продолжить" onPress={clickEndReg}/>

        {/* Модальное окно для выбора интервала времени */}
        <ModalTime
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          selectedInterval={selectedInterval}
          setSelectedInterval={setSelectedInterval}
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
    color: "#000000", // черный цвет для выбранного интервала
  },
  placeholderText: {
    color: "#9D9D9D", // серый цвет для плейсхолдера
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
