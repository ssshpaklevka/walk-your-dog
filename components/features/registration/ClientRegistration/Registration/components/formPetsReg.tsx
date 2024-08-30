import { Controller, useForm } from "react-hook-form";
import {
  Alert,
  Image,
  Linking,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import SelectableForm from "./selectableForm";
import { useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import useUserStore from "../../../../../../stores/userStore";
import { AnimalInterface } from "../../../../../../shared/types/animal";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../../../../shared/types/typesRegistrationNavigations";
import { useNavigation } from "@react-navigation/native";
import DateBirthday from "../dateTimePicker/DateBirthday";
import DateTimePicker from "@react-native-community/datetimepicker";

type ItemType = {
  label: string;
  value: string;
};

type FormPetsRegProps = {
  onDataChange: (data: Partial<AnimalInterface>) => void;
};

export default function FormPetsReg({ onDataChange }: FormPetsRegProps) {
  const [avatar, setAvatar] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState<string>("+7");
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
        const avatarUri = result.assets[0].uri;
        setAvatar(avatarUri);
        onDataChange({ ...watch(), avatar: avatarUri });
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

  useEffect(() => {
    const subscription = watch((value) => {
      const animalData = {
        ...value,
        avatar: avatar || "",
      } as Partial<AnimalInterface>;

      onDataChange(animalData);
    });
    return () => subscription.unsubscribe();
  }, [watch, avatar]);

  const onSubmit = (data: AnimalInterface) => {
    const animalData: AnimalInterface = {
      ...data,
      avatar: avatar || "",
    };
    newAnimal(animalData);
    console.log(animalData);
    navigation.navigate("TabNavigator");
    onDataChange(animalData);
  };

  const [birthDate, setBirthDate] = useState<Date | null>(null);
  const [showBirthdayModal, setShowBirthdayModal] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleBirthDateChange = (newDate: Date | null) => {
    if (newDate) {
      newDate.setHours(0, 0, 0, 0);
    }
    setBirthDate(newDate);
    setValue("birthday", newDate || undefined);
    onDataChange({ birthday: newDate || undefined });
    if (Platform.OS === 'android') {
      setShowDatePicker(false); 
    } else {
      setShowBirthdayModal(true); 
    }
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

  const getLabelsFromValues = (items: ItemType[], values: string[]) => {
    return items
      .filter((item) => values.includes(item.value))
      .map((item) => item.label);
  };

  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  return (
    <View style={styles.containerForm}>
      <TouchableOpacity onPress={pickImage}>
        {avatar ? (
          <Image source={{ uri: avatar }} style={styles.avatar} />
        ) : (
          <View style={styles.avatarPlaceholder}>
            <Image
              source={require("../../../../../../assets/AvatarAnimal.png")}
            />
          </View>
        )}
      </TouchableOpacity>

      <View style={styles.form}>
        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <DropDownPicker
              listMode="SCROLLVIEW"
              scrollViewProps={{
                nestedScrollEnabled: true,
              }}
              open={openDropdown === "type"}
              value={
                petType.find((item) => item.label === value)?.value || null
              }
              items={petType}
              setOpen={() =>
                setOpenDropdown(openDropdown === "type" ? null : "type")
              }
              setValue={(callback) => {
                const newValue =
                  typeof callback === "function" ? callback(value) : callback;
                const selectedLabel = petType.find(
                  (item) => item.value === newValue
                )?.label;
                onChange(selectedLabel);
              }}
              setItems={setPetType}
              style={styles.input}
              placeholder="Вид питомца"
              dropDownContainerStyle={styles.input}
            />
          )}
          name="petType"
        />

        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Имя друга"
            />
          )}
          name="name"
        />

        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <DropDownPicker
              listMode="SCROLLVIEW"
              scrollViewProps={{
                nestedScrollEnabled: true,
              }}
              open={openDropdown === "breed"}
              value={
                petBreed.find((item) => item.label === value)?.value || null
              }
              items={petBreed}
              setOpen={() =>
                setOpenDropdown(openDropdown === "breed" ? null : "breed")
              }
              setValue={(callback) => {
                const newValue =
                  typeof callback === "function" ? callback(value) : callback;
                const selectedLabel = petBreed.find(
                  (item) => item.value === newValue
                )?.label;
                onChange(selectedLabel);
              }}
              setItems={setPetBreed}
              style={styles.input}
              placeholder="Порода питомца"
              dropDownContainerStyle={styles.input}
            />
          )}
          name="petBreed"
        />

<TouchableOpacity
        style={styles.falseInput}
        onPress={() => {
          if (Platform.OS === 'ios') {
            setShowBirthdayModal(true);
          } else {
            setShowDatePicker(true);
          }
        }}
      >
        {birthDate ? (
          <Text>{formattedBirthDate}</Text>
        ) : (
          <Text style={{ color: "grey" }}>Дата рождения</Text>
        )}
      </TouchableOpacity>

        <SelectableForm control={control} />

        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <DropDownPicker
              listMode="SCROLLVIEW"
              scrollViewProps={{
                nestedScrollEnabled: true,
              }}
              open={openDropdown === "vaccinations"}
              items={vaccinations}
              multiple={true}
              min={0}
              max={10}
              value={selectedVaccinations} 
              setOpen={() =>
                setOpenDropdown(
                  openDropdown === "vaccinations" ? null : "vaccinations"
                )
              }
              setValue={(callback) => {
                const newValues =
                  typeof callback === "function"
                    ? callback(selectedVaccinations)
                    : callback;

                if (Array.isArray(newValues)) {
                 
                  setSelectedVaccinations(newValues);
                  onChange(newValues); 
                }
              }}
              setItems={setVaccinations}
              multipleText={getLabelsFromValues(
                vaccinations,
                selectedVaccinations
              ).join(", ")} 
              style={styles.input}
              placeholder="Прививки"
              dropDownContainerStyle={[styles.input, styles.dropdownContainer]}
            />
          )}
          name="vaccinations"
        />

        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Общее здоровье"
            />
          )}
          name="allHealth"
        />

        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Дополнительная информация"
            />
          )}
          name="moreInfo"
        />
      </View>
      <DateBirthday
        modalVisible={showBirthdayModal}
        setModalVisible={setShowBirthdayModal}
        selectedDate={birthDate}
        setSelectedDate={handleBirthDateChange}
        onSave={handleSave} 
      />

      {/* DateTimePicker для Android */}
      {showDatePicker && (
        <DateTimePicker
          value={birthDate || new Date()}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={(event, selectedDate) => handleBirthDateChange(selectedDate || null)} 
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  containerForm: {
    paddingHorizontal: 15,
    width: "100%",
    alignItems: "center",
  },
  form: {
    paddingTop: 30,
    width: "100%",
    gap: 20,
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
});
