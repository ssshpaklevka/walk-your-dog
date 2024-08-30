import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import useUserStore from "../../../../../../stores/userStore";
import DarkButton from "../../../../../../shared/ui/Button/DarkButton";
import AddRecord from "../../../../modal/AddRecord";
import { useState } from "react";

export default function Events() {
  const { events } = useUserStore();

  const [modalVisible, setModalVisible] = useState(false);

  const formatDate = (date: Date, format: "short" | "long" = "long") => {
    const options: Intl.DateTimeFormatOptions = {
      
      day: "numeric",
      month: "long", 
      
     
      
    };
    return date.toLocaleString("ru-RU", options);
  };

  const formatEventDate = (date: Date) => {
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
      return "Сегодня";
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return "Завтра";
    } else {
      return formatDate(date, "short");
    }
  };

  const sortedEvents = events.slice().sort((a, b) => {
    const dateA = new Date(a.date).getTime(); 
    const dateB = new Date(b.date).getTime(); 
    return dateA - dateB; 
  });

  const truncateString = (str: any, num: any) => {
    if (str.length > num) {
      return str.slice(0, num) + "...";
    } else {
      return str;
    }
  };
  
  return (
    <View>
      <View style={styles.events}>
        <Text
          style={{
            width: "100%",
            textAlign: "left",
            fontSize: 14,
            color: "#00000085",
          }}
        >
          Ближайшие события
        </Text>
        {sortedEvents.length === 0 ? (
          <Text style={{fontSize: 16}}>У вас отсутсвуют ближайшие события</Text>
        ) : (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.scrollEvent}
          >
            {sortedEvents.map((event, index) => (
              <View style={styles.event} key={index}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <Image
                    source={{ uri: event.selectedPet.avatar }}
                    style={{ width: 40, height: 40, borderRadius: 9999 }}
                  />
                  <View style={{ flexDirection: "column" }}>
                    <Text style={{ fontSize: 15, color: "#00000085" }}>
                      {event.selectedPet.name}
                    </Text>
                    <Text style={{ fontSize: 14, fontWeight: 500 }}>
                      {truncateString(`${event.serviceName}`, 13)}
                    </Text>
                  </View>
                </View>
                <Text style={{ fontSize: 14, fontWeight: 500 }}>
                {formatEventDate(event.date)} в {event.time} 
                </Text>
              </View>
            ))}
          </ScrollView>
        )}

        {/* <View style={styles.event}>
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
              >
                <Image
                  source={{ uri: animal.selectedPet.avatar }}
                  style={{ width: 40, height: 40, borderRadius: 9999 }}
                />
                <View style={{ flexDirection: "column" }}>
                  <Text style={{ fontSize: 15, color: "#00000085" }}>
                    {animal.selectedPet.name}
                  </Text>
                  <Text style={{ fontSize: 14, fontWeight: 500 }}>
                    Прогулка
                  </Text>
                </View>
              </View>
              <Text style={{ fontSize: 14, fontWeight: 500 }}>
                {animal.time}
              </Text>
            </View>
            <View style={styles.event}>
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
              >
                <Image
                  source={{  uri: animal.selectedPet.avatar }}
                  style={{ width: 40, height: 40, borderRadius: 9999 }}
                />
                <View style={{ flexDirection: "column" }}>
                  <Text style={{ fontSize: 15, color: "#00000085" }}>
                    {animal.selectedPet.name}
                  </Text>
                  <Text style={{ fontSize: 14, fontWeight: 500 }}>
                    
                  </Text>
                </View>
              </View>
              <Text style={{ fontSize: 14, fontWeight: 500 }}>
                {animal.time} 
              </Text>
            </View> */}
        <DarkButton
          title="Добавить запись"
          onPress={() => setModalVisible(true)}
        />
      </View>

      <AddRecord
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  events: {
    backgroundColor: "white",
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 13,
    width: "100%",
    alignItems: "center",
    gap: 15,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  scrollEvent: {
    paddingRight: 30,
  },
  event: {
    flexDirection: "column",
    backgroundColor: "#E7EFBE",
    borderRadius: 16,
    padding: 10,
    gap: 5,
    marginRight: 10,
  },
});
