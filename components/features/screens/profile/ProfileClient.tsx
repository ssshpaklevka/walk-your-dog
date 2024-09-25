import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import InfoInput from "./components/InfoInput";
import useUserStore from "../../../../stores/userStore";
import UpdateModal from "../../../../shared/ui/UpdateModal/UpdateModal";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

export default function ProfileClient() {

  const navigation = useNavigation()
  const { user, animals } = useUserStore();

  const [modalVisible, setModalVisible] = useState(false);
  const [modalField, setModalField] = useState<string | null>(null);
  const [fieldValue, setFieldValue] = useState("");

  const animalsCount = animals.length;
  let animalsText;

  if (animalsCount === 0) {
    animalsText = "Нет питомцев";
  } else if (animalsCount === 1) {
    animalsText = "1 питомец";
  } else if ([2, 3, 4].includes(animalsCount)) {
    animalsText = `${animalsCount} питомца`;
  } else {
    animalsText = `${animalsCount} питомцев`;
  }

  const navigationEmail = () => {
    navigation.navigate('Email' as never)
  }

  return (
    <ScrollView style={styles.container}>
      <View>
        <Text>Ваш ID: 842 427</Text>
      </View>
      <View style={styles.infoUser}>
        <Image
          source={
            user?.avatar
              ? { uri: user.avatar }
              : require("../../../../assets/Avatar.png")
          }
          style={{ width: 50, height: 50, borderRadius: 9999 }}
        />
        <View style={styles.nameMail}>
          <Text style={{ fontSize: 16, fontWeight: 500 }}>{user?.name}</Text>
          <Text style={{ fontSize: 14, fontWeight: 400 }}>{user?.email}</Text>
        </View>
      </View>
      <View style={styles.infoWork}></View>
      <View style={{ paddingTop: 20, paddingBottom: 30, gap: 20 }}>
        <TouchableOpacity
          onPress={() => {
            setModalField("name");
            setFieldValue(user?.name || '');
            setModalVisible(true);
          }}
        >
          <InfoInput title="Имя" info={user?.name} />
        </TouchableOpacity>
        <UpdateModal
          url={user?.avatar || ""}
          name={user?.name || ""}
          title={modalField === "name" ? "Имя" : "Email"}
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          initialValue={fieldValue}
          onSave={(newValue) => {
            // Здесь логика для обновления значения в userStore
            if (modalField === "name") {
                useUserStore.getState().updateUserField('name', newValue);
            } else if (modalField === "email") {
                useUserStore.getState().updateUserField('email', newValue);
            }
            setModalVisible(false);
          }}
        />
        <InfoInput title="Телефон" info={user?.number} />
        <TouchableOpacity
          onPress={() => navigationEmail()}
        >
          <InfoInput title="Email" info={user?.email} />
        </TouchableOpacity>
        <InfoInput title="Споособы оплаты" info={"Способы оплаты"} />
        <InfoInput title="Активные абонименты" info={"Активные абонементы"} />
        <InfoInput title="Мои питомцы" info={animalsText} />
        <InfoInput title="Мои адреса" info={"Мои адреса"} />
        <InfoInput title="Город" info={user?.valueCity} />
        <InfoInput title="Бонусная программа" info={"Как она работает?"} />
        <Text style={{ fontSize: 14, fontWeight: 500 }}>
          Благотворительность
        </Text>
        <Text style={{ fontSize: 14, fontWeight: 500 }}>
          Помощь и документация
        </Text>
        <TouchableOpacity>
          <Text style={{ fontSize: 14, fontWeight: 500 }}>
            Выйти из аккаунта
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    backgroundColor: "white",
  },
  infoUser: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  nameMail: {
    flexDirection: "column",
  },
  infoWork: {
    paddingTop: 25,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
