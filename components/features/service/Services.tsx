import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import DarkButton from "../../../shared/ui/Button/DarkButton";
import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import { AnimalInterface } from "../../../shared/types/animal";
import { useEffect, useState } from "react";
import ModalEvent from "../modal/ModalEvent";
import Toast from "react-native-toast-message";
import useUserStore from "../../../stores/userStore";
import CustomRadioButton from "../../../shared/ui/CustomRadioButton/RadioButton";
import AddServices from "./components/addServices";
import ModalInfo from "../modal/ModalInfo";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { OrderDetails, RootStackParamList } from "../../../shared/types/typesRegistrationNavigations";
import SelectPets from "./components/selectPets";

const daysToShow = 30;
export default function Services() {
  const insets = useSafeAreaInsets();
  const route = useRoute();
  const navigation =  useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { animals } = useUserStore()
 


  const [selectedServices, setSelectedServices] = useState([]);
  const handleServicePress = (service: any) => {
    if (selectedServices.includes(service as never)) {

      setSelectedServices(selectedServices.filter((item) => item !== service));
    } else {

      setSelectedServices([...selectedServices, service] as never);
    }
  };

  const [selectedAddServices, setSelectedAddServices] = useState([]);
  const handleAddServicePress = (service: any) => {
    if (selectedAddServices.includes(service as never)) {
      setSelectedAddServices(selectedAddServices.filter(item => item !== service));
    } else {
      setSelectedAddServices([...selectedAddServices, service] as never);
    }
  };

 
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState("9:00");
  const [selectedRepeat, setSelectedRepeat] = useState("Никогда");

  const [selectedAnimal, setSelectedAnimal] = useState(animals[0]);

  const handleAnimalSelect = (animal: AnimalInterface) => {
    setSelectedAnimal(animal);
  };

  const formatSelectedDateTime = () => {
    if (!selectedDate || !selectedTime) return "";

    const datePart = selectedDate.toLocaleDateString("ru-RU", {
      day: "numeric",
      month: "long",
    });

    return `${datePart}, ${selectedTime}`;
  };

  const dates = Array.from({ length: daysToShow }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    return date;
  });

  const handleSaveDate = (
    date: Date,
    time: string,
    repeat: string
    // remind: string
  ) => {
    setSelectedDate(date);
    setSelectedTime(time);
    setSelectedRepeat(repeat);
    // setSelectedRemind(remind);
  };

  const buttonSave = () => {
    const selectedServiceDetails = [];

    // Основные услуги
    if (selectedServices.includes("walk" as never)) {
      selectedServiceDetails.push({ title: "Выгул", price: 450 });
    }
    if (selectedServices.includes("nanny"  as never)) {
      selectedServiceDetails.push({ title: "Няня", price: 850 });
    }
    if (selectedServices.includes("sitter"  as never)) {
      selectedServiceDetails.push({ title: "Ситтер", price: 450 });
    }
  
    // Дополнительные услуги
    if (selectedAddServices.includes("washPaws"  as never)) {
      selectedServiceDetails.push({ title: "Помыть лапы", price: 150 });
    }
    if (selectedAddServices.includes("feed"  as never)) {
      selectedServiceDetails.push({ title: "Покормить", price: 250 });
    }
    if (selectedAddServices.includes("training"  as never)) {
      selectedServiceDetails.push({ title: "Дрессировка", price: 150 });
    }
    if (selectedAddServices.includes("grooming"  as never)) {
      selectedServiceDetails.push({ title: "Грумминг", price: 1250 });
    }
  
    const totalCost = selectedServiceDetails.reduce((sum, service) => sum + service.price, 0);

    const orderDetails: OrderDetails = {
      selectedAnimal,
      selectedServices: selectedServiceDetails,
      selectedDate,
      selectedTime,
      selectedRepeat,
      totalCost,
    };
  
    navigation.navigate('OrderDetails', orderDetails );
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const [modalVisible, setModalVisible] = useState(false);
  const [modalInfoVisible, setModalInfoVisible] = useState(false);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <MaterialIcons name="keyboard-backspace" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Выберите питомца и услугу</Text>
      </View>
      <View style={{ paddingTop: 20, gap: 20 }}>
        <SelectPets onAnimalSelect={handleAnimalSelect}/>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: 15 }}>
            <CustomRadioButton
              checked={selectedServices.includes("walk" as never)}
              onPress={() => handleServicePress("walk")}
            />
            <Text style={styles.radioBtnText}>Выгул</Text>
          </View>
          <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
            <Text style={styles.radioBtnText}>450 ₽</Text>
            <TouchableOpacity
              onPress={() => setModalInfoVisible(true)}
              style={{
                borderRadius: 9999,
                backgroundColor: "white",
                paddingHorizontal: 10,
                paddingVertical: 4.5,
              }}
            >
              <Text style={[styles.radioBtnText]}>i</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            gap: 10,
            borderBottomColor: "#D9D9D9",
            borderBottomWidth: 1,
            paddingBottom: 15,
          }}
        >
          <Text style={styles.radioBtnText}>Дополнительно</Text>
          <View style={styles.addServ}>
            <AddServices
              title="Помыть лапы"
              price={150}
              checked={selectedAddServices.includes("washPaws" as never)}
              onPress={() => handleAddServicePress("washPaws")}
            />
            <AddServices
              title="Покормить"
              price={250}
              checked={selectedAddServices.includes("feed" as never)}
              onPress={() => handleAddServicePress("feed")}
            />
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottomColor: "#D9D9D9",
            borderBottomWidth: 1,
            paddingBottom: 15,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: 15 }}>
            <CustomRadioButton
              checked={selectedServices.includes("nanny" as never)}
              onPress={() => handleServicePress("nanny")}
            />
            <Text style={styles.radioBtnText}>Няня</Text>
          </View>
          <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
            <Text style={styles.radioBtnText}>850 ₽</Text>
            <TouchableOpacity
              onPress={() => setModalInfoVisible(true)}
              style={{
                borderRadius: 9999,
                backgroundColor: "white",
                paddingHorizontal: 10,
                paddingVertical: 4.5,
              }}
            >
              <Text style={[styles.radioBtnText]}>i</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: 15 }}>
            <CustomRadioButton
              checked={selectedServices.includes("sitter" as never)}
              onPress={() => handleServicePress("sitter")}
            />
            <Text style={styles.radioBtnText}>Ситтер</Text>
          </View>
          <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
            <Text style={styles.radioBtnText}>450 ₽</Text>
            <TouchableOpacity
              onPress={() => setModalInfoVisible(true)}
              style={{
                borderRadius: 9999,
                backgroundColor: "white",
                paddingHorizontal: 10,
                paddingVertical: 4.5,
              }}
            >
              <Text style={[styles.radioBtnText]}>i</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ gap: 10 }}>
          <Text style={styles.radioBtnText}>Дополнительно</Text>
          <View style={styles.addServ}>
            <AddServices
              title="Дрессировка"
              price={150}
              checked={selectedAddServices.includes("training" as never)}
              onPress={() => handleAddServicePress("training")}
            />
            <AddServices
              title="Грумминг"
              price={1250}
              checked={selectedAddServices.includes("grooming" as never)}
              onPress={() => handleAddServicePress("grooming")}
            />
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View style={{ gap: 5 }}>
            <Text style={{ fontSize: 14, opacity: 0.5 }}>
              Квартира возле набережной
            </Text>
            <Text style={{ fontSize: 16 }}>Нахимова, д. 24, кв. 28</Text>
          </View>
          <View>
            <MaterialCommunityIcons
              name="chevron-right"
              color={"#545454"}
              size={22}
            />
          </View>
        </View>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View style={{ gap: 5 }}>
              <Text style={{ fontSize: 14, opacity: 0.5 }}>Дата</Text>
              <Text style={{ fontSize: 16 }}>
                {formatSelectedDateTime()} | Повтор: {selectedRepeat}{" "}
              </Text>
            </View>
            <View>
              <MaterialCommunityIcons
                name="chevron-right"
                color={"#545454"}
                size={22}
              />
            </View>
          </View>
        </TouchableOpacity>
        <ModalEvent
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          selectedDate={selectedDate}
          dates={dates}
          onSaveDate={handleSaveDate}
        />
        <ModalInfo
          modalVisible={modalInfoVisible}
          setModalVisible={setModalInfoVisible}
        />
        <View style={{ gap: 10 }}></View>
      </View>
      <View
        style={{
          justifyContent: "flex-end",
          
        }}
      >
        <DarkButton title="Далее" onPress={buttonSave} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
    color: "#C0C0C0",
  },
  selectedDayOfWeekText: {},
  container: {
    paddingHorizontal: 15,
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center", 
    position: "relative", 
    paddingHorizontal: 15,
  },
  backButton: {
    position: "absolute", 
    left: 0, 
  },
  headerText: {
    fontSize: 20,
    textAlign: "center", 
  },
  blockEvent: {
    gap: 5,
    padding: 10,
    backgroundColor: "#F4F4F4",
    borderRadius: 16,
  },
  blockAddress: {
    gap: 5,
    padding: 10,
    backgroundColor: "#F4F4F4",
    borderRadius: 16,
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
  textInput: {
    fontSize: 16,
    fontWeight: 500,
  },
  textHeaderInput: {
    fontSize: 10,
    fontWeight: 400,
    paddingBottom: 2,
    color: "#B8B8B8",
  },
  textHeader: {
    fontSize: 12,
    opacity: 0.5,
    color: "black",
  },
  radioBtnText: {
    fontSize: 16,
    fontWeight: 500,
  },
  addServ: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
