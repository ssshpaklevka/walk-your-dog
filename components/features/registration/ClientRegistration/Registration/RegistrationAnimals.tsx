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
  ScrollView,
  FlatList,
  Dimensions,
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
import DateBirthday from "./dateTimePicker/DateBirthday";
import PetGenderSelector from "./components/selector";
import SelectableOption from "./components/selector";
import SelectableForm from "./components/selectableForm";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import {
  KeyboardAwareFlatList,
  KeyboardAwareScrollView,
} from "react-native-keyboard-aware-scroll-view";
import { AnimalInterface } from "../../../../../shared/types/animal";
import Dropdown from "../../../../../shared/ui/DropDown/DropDown";
import FormPetsReg from "./components/formPetsReg";

type ItemType = {
  label: string;
  value: string;
};

export default function RegistrationAnimals() {
  const insets = useSafeAreaInsets();
  const [avatar, setAvatar] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [phoneNumber, setPhoneNumber] = React.useState<string>("+7");
  const [openType, setOpenType] = useState(false);
  const [openBreed, setOpenBreed] = useState(false);
  const [openVaccinations, setOpenVaccinations] = useState(false);
  const [petType, setPetType] = useState<ItemType[]>([
    { label: "Собака", value: "pet1" },
    { label: "Кот", value: "pet2" },
    { label: "Грызуны", value: "pet3" },
    { label: "Рептилии", value: "pet4" },
    { label: "Птицы", value: "pet5" },
    { label: "Насекомые", value: "pet6" },
    { label: "Рыбы", value: "pet7" },
    { label: "Другие животные", value: "pet8" },
  ]);

  const [petBreed, setPetBreed] = useState<ItemType[]>([
    { label: "Далматинец", value: "breed1" },
    { label: "Овчарка", value: "breed2" },
  ]);
  const [openAnimals, setOpenAnimals] = useState(false);
  const [vaccinations, setVaccinations] = useState<ItemType[]>([
    { label: "Столбняк", value: "vac1" },
    { label: "Бешенство", value: "vac2" },
    { label: "Чума", value: "vac3" },
    { label: "Гепатит", value: "vac4" },
  ]);
  const [selectedVaccinations, setSelectedVaccinations] = useState<string[]>(
    []
  );
  useEffect(() => {
    setValue("vaccinations", selectedVaccinations);
  }, [selectedVaccinations]);

  //   const getLabelsFromValues = (items: ItemType[], values: string[]) => {
  //     return items
  //         .filter(item => values.includes(item.value))
  //         .map(item => item.label);
  // };

  const { control, handleSubmit, setValue, watch } = useForm<AnimalInterface>({
    defaultValues: {
      name: "",
      petType: "",
      petBreed: "",
      birthday: undefined,
      gender: "",
      castration: false,
      leash: false,
      bite: false,
      aggressive: false,
      vaccinations: [],
      allHealth: "",
      moreInfo: "",
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

  const newAnimal = useUserStore((state) => state.newAnimal);

  const onSubmit = (data: AnimalInterface) => {
    const animalData: AnimalInterface = {
      ...data,
      avatar: avatar || "",
    };
    newAnimal(animalData);
    console.log(animalData);
    navigation.navigate("TabNavigator");
  };

  const [birthDate, setBirthDate] = useState<Date | null>(null);
  const [showBirthdayModal, setShowBirthdayModal] = useState(false);

  const handleBirthDateChange = (newDate: Date | null) => {
    setBirthDate(newDate);
  };

  const handleSave = () => {
    setShowBirthdayModal(false); 
  };

  const formattedBirthDate = birthDate
    ? birthDate.toLocaleDateString()
    : "Не выбрано";

  type SetOpenFunction = React.Dispatch<React.SetStateAction<boolean>>;

  const [isAnyDropdownOpen, setIsAnyDropdownOpen] = useState(false);

  const [isScrollEnabled, setIsScrollEnabled] = useState(true);

  const updateDropdownState = (
    isOpen: boolean | ((prevState: boolean) => boolean)
  ) => {
    const newIsOpen =
      typeof isOpen === "function" ? isOpen(isAnyDropdownOpen) : isOpen;
    setIsAnyDropdownOpen(newIsOpen);
    setIsScrollEnabled(!newIsOpen);
  };

  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const [animalForms, setAnimalForms] = useState<Partial<AnimalInterface>[]>([
    {},
  ]);

  const addAnimalForm = () => {
    setAnimalForms([...animalForms, {}]);
  };

  const handleSubmitAll = () => {
    animalForms.forEach((form) => {
      if (Object.keys(form).length > 0) {
    
        useUserStore.getState().newAnimal(form as AnimalInterface); 
      }
    });

    navigation.navigate("TabNavigator");
  };

  const { width } = Dimensions.get("window");

  const handleScroll = (event: any) => {
    const index = Math.floor(event.nativeEvent.contentOffset.x / width);
    setCurrentIndex(index);
  };

  const handleDataChange = (index: number, data: Partial<AnimalInterface>) => {
    const newAnimalForms = [...animalForms];
    newAnimalForms[index] = data;
    setAnimalForms(newAnimalForms);
  };
  const [currentIndex, setCurrentIndex] = useState(0);
  return (
    <KeyboardAwareFlatList
      scrollEnabled={isScrollEnabled}
      data={[{ key: "content" }]}
      renderItem={({ item }) => (
        <View style={[styles.container, { paddingTop: insets.top }]}>
          <View style={styles.upComponent}>
            <View style={{ alignItems: "center", paddingBottom: 40 }}>
              <Text style={{ fontSize: 20, fontWeight: 500 }}>
                Давай знакомиться!
              </Text>
              <Text style={{ fontSize: 18, fontWeight: 400 }}>
                Расскажите о питомце
              </Text>
            </View>
            <FlatList
              data={animalForms}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              onScroll={handleScroll}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item, index }) => (
                <View style={{ width }}>
                  <FormPetsReg
                    key={index}
                    onDataChange={(data) => handleDataChange(index, data)}
                  />
                </View>
              )}
            />
            <View style={styles.pagination}>
              {animalForms.map((_, i) => (
                <View
                  key={i}
                  style={[
                    styles.dot,
                    { opacity: i === currentIndex ? 1 : 0.3 },
                  ]}
                />
              ))}
            </View>
            <View
              style={{
                width: "100%",
                gap: 30,
                paddingTop: 30,
                paddingHorizontal: 15,
              }}
            >
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 15,
                }}
                onPress={addAnimalForm}
              >
                <Text style={{ fontSize: 14, fontWeight: 500 }}>
                  Добавить еще питомца
                </Text>
                <AntDesign name="plussquareo" size={20} color="black" />
              </TouchableOpacity>
              <DarkButton title="Подтвердить" onPress={handleSubmitAll} />
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
      )}
      keyExtractor={(item) => item.key}
      ListHeaderComponent={() => (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View />
        </TouchableWithoutFeedback>
      )}
    />
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "white"
  },
  upComponent: {
    alignItems: "center",
    width: "100%",
  },
  downText: {
    gap: 15,
    alignItems: "center",
    paddingTop: 20,
    marginBottom: 20,
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    paddingTop: 15
  },
  dot: {
    height: 8,
    width: 8,
    borderRadius: 4,
    backgroundColor: "black",
    marginHorizontal: 4,
  },
});
