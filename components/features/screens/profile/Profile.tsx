import React, { useState } from "react";
import { Image, ScrollView, Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import DarkButton from "../../../../shared/ui/Button/DarkButton";
import LightButton from "../../../../shared/ui/Button/LightButton";
import InfoInput from "./_components/InfoInput";
import ModalProfile from "./_components/Modal/Modal";
import EditableField from "./_components/Modal/EditableField";
// import EditableField from "./_components/Modal/EditableField";

export default function Profile({ route }: any) {
  const {
    avatar,
    name: initialName,
    email,
    number,
    valueCity,
    valueServices,
    valueAnimals,
    selectedInterval,
  } = route.params;
  const insets = useSafeAreaInsets();
  const valueServicesString = valueServices.join(", ");
  const valueAnimalsString = valueAnimals.join(", "); 

  const [modalVisible, setModalVisible] = useState(false);

  const [name, setName] = useState(initialName);
  const handleSaveName = (newName: string) => {
    setName(newName); 
  };
  return (
    <ScrollView style={styles.container}>
      <View style={styles.infoUser}>
        <Image
          source={{ uri: avatar }}
          style={{ width: 50, height: 50, borderRadius: 9999 }}
        />
        <View style={styles.nameMail}>
          <Text style={{ fontSize: 16, fontWeight: 500 }}>{name}</Text>
          <Text style={{ fontSize: 14, fontWeight: 400 }}>{email}</Text>
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
      <View style={{paddingTop: 20, gap: 20}}>
        {/* <TouchableOpacity onPress={() => setModalVisible(true)}>
        <InfoInput title="Имя" info={name} />
        </TouchableOpacity>
        <ModalProfile
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          avatar={avatar}
          name={name}
          placeholder={"Измените ваше имя"}
          title={"Имя"}
          infoBlock={name}
          onSave={handleSaveName}
        /> */}
        <EditableField  title="Имя" initialValue={name} avatar={avatar} name={name}/>
        {/* <EditableField type="name" title="Имя" initialValue={name} onSave={setName}/> */}
        <InfoInput title="Телефон" info={number} />
        <InfoInput title="Email" info={email} />
        <InfoInput title="Карты для выплат" info={"Карты для выплат"} />
        <InfoInput title="Стаж работы" info={"Стаж работы"} />
        <InfoInput title="Какие услуги оказываете" info={valueServicesString} />
        <InfoInput title="Мои адреса" info={"Мои адреса"} />
        <InfoInput title="Бонусная программа" info={"Как она работает?"} />
        <InfoInput title="Город" info={valueCity} /> 
        <InfoInput title="Сколько времени вы с нами" info={"3 месяца"} /> 
        <Text>Благотворительность</Text>
        <Text>Помощь и документация</Text>
        <Text>Выйти из аккаунта</Text>
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
