import React, { useState } from "react";
import { Image, ScrollView, Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import DarkButton from "../../../../shared/ui/Button/DarkButton";
import LightButton from "../../../../shared/ui/Button/LightButton";
import InfoInput from "./components/InfoInput";
import ModalProfile from "./components/Modal/Modal";
import useUserStore from "../../../../stores/userStore";
import { UserInterface, UserType } from "../../../../shared/types/user";
import { useNavigation } from "@react-navigation/native";

export default function Profile({ route }: any) {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const { user, clearUser } = useUserStore(); 
  console.log(user?.valueServices)
  console.log(user?.valueCity)

  const [modalVisible, setModalVisible] = useState(false);

  const handleSaveName = (newName: string) => {
    useUserStore.setState((state) => {
      if (state.user) {
        return {
          user: {
            ...state.user, 
            name: newName, 
          } as Partial<UserType>, 
        };
      }
     
      return { user: state.user };
    });
  };


  if (!user) {
    return <Text>Пользователь не зарегистрирован</Text>;
  }

  const handleLogout = () => {
    clearUser(); 
    navigation.navigate('RegistrationEmployee' as never); 
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.infoUser}>
        <Image
          source={user.avatar ? { uri: user.avatar } : require('../../../../assets/Avatar.png')}
          style={{ width: 50, height: 50, borderRadius: 9999 }}
        />
        <View style={styles.nameMail}>
          <Text style={{ fontSize: 16, fontWeight: 500 }}>{user.name}</Text>
          <Text style={{ fontSize: 14, fontWeight: 400 }}>{user.email}</Text>
        </View>
      </View>
      <View style={styles.infoWork}>
      <View style={styles.review}>
          <View>
            <Text style={{ textAlign: "center", fontSize: 20, fontWeight: 500 }}>583 отзыва</Text>
            <Text style={{ maxWidth: 120, textAlign: "center", fontSize: 12, fontWeight: 400 }}>
              Оставили ваши клиенты
            </Text>
          </View>
          <DarkButton title={`Как влиять \n на рейтинг?`}  buttonStyle={{padding: 5, paddingHorizontal: 30}} textStyle={{fontSize: 13}}/>
        </View>
        <View style={styles.earnings}>
          <View>
            <Text style={{ textAlign: "center", fontSize: 20, fontWeight: 500 }}>5542 Р</Text>
            <Text style={{ maxWidth: 120, textAlign: "center", fontSize: 12, fontWeight: 400 }}>
              Вы заработали до вывода
            </Text>
          </View>
          <LightButton title={`Как вывести \n деньги?`}  buttonStyle={{padding: 5, paddingHorizontal: 30}} textStyle={{fontSize: 13}}/>
        </View>
      </View>
      <View style={{ paddingTop: 20, paddingBottom: 30, gap: 20 }}>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <InfoInput title="Имя" info={user.name} />
        </TouchableOpacity>
        <ModalProfile
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          avatar={user.avatar || ""}
          name={user.name}
          placeholder={user.name}
          title={"Имя"}
          infoBlock={user.name}
          onSave={handleSaveName}
        />
        <InfoInput title="Телефон" info={user.number} />
        <InfoInput title="Email" info={user.email} />
        <InfoInput title="Карты для выплат" info={"Карты для выплат"} />
        <InfoInput title="Стаж работы" info={"Стаж работы"} />
        <InfoInput title="Какие услуги оказываете" info={user.valueServices?.join(",")} />
        <InfoInput title="Мои адреса" info={"Мои адреса"} />
        <InfoInput title="Бонусная программа" info={"Как она работает?"} />
        <InfoInput title="Город" info={user.valueCity} />
        <InfoInput title="Сколько времени вы с нами" info={"3 месяца"} />
        <Text style={{fontSize: 14, fontWeight: 500}}>Благотворительность</Text>
        <Text style={{fontSize: 14, fontWeight: 500}}>Помощь и документация</Text>
        <TouchableOpacity onPress={handleLogout}>
        <Text style={{fontSize: 14, fontWeight: 500}}>Выйти из аккаунта</Text>
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
  review: {
    alignItems: "center",
    gap: 15,
    backgroundColor: "#F4F4F4",
    borderRadius: 16,
    padding: 15,
  },
  earnings: {
    alignItems: "center",
    gap: 15,
    backgroundColor: "#F4F4F4",
    borderRadius: 16,
    padding: 15,
  },
});
