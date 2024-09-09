import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Events from "./features/screens/events/Events";
import Chat from "./features/screens/chat/Chat";
import Posts from "./features/screens/posts/Posts";
import Profile from "./features/screens/profile/Profile";
import Home from "./features/screens/home/Home";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import useUserStore from "../stores/userStore";
import CustomHeader from "./features/screens/home/components/CustomHeader";
import AddRecord from "./features/modal/AddRecord";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {

  const { user } = useUserStore()

  const [modalVisible, setModalVisible] = React.useState(false);
  const CustomTabBarButton = ({ children, onPress }:any) => (
    <Pressable
      style={{
        top: -10, // Поднятие кнопки вверх
        justifyContent: 'center',
        alignItems: 'center',
      }}
      onPress={onPress}
    >
      <View
        style={{
          width: 90,
          height: 90,
          borderRadius: 9999,
          backgroundColor: '#F8F8F8',
        }}
      >
        {children}
      </View>
    </Pressable>
  );
  const CustomTabBarLabel = ({ focused, color, size }:any) => (
    <View style={{ alignItems: 'center', gap: 5 }}>
      <MaterialCommunityIcons name="plus" color={"black"} size={30} />
      <Text style={{ color: "#979797", fontSize: 10, paddingTop: 10 }}>Прогулка</Text>
    </View>
  );

  const WalkScreen = () => null;

  return (
    <>
    <Tab.Navigator
      screenOptions={{
        headerShown: true,
        tabBarActiveTintColor: "black",
        tabBarInactiveTintColor: "gray",
        tabBarLabelStyle: { fontSize: 10, marginTop: -10 },
        headerTitleAlign: "center",
        headerStyle: {backgroundColor: "white", borderBottomWidth: 0, shadowOpacity: 0},
        tabBarStyle: {
          height: 100,
          backgroundColor: "#F8F8F8",
          borderTopWidth: 0,
          borderRadius: 16,
          elevation: 4, // Для тени на Android
          shadowColor: '#000', // Для тени на iOS
          shadowOffset: { width: -0, height: -2 },
          shadowOpacity: 0.15,
          shadowRadius: 10,
        }
      }}
    >
      {/* <Tab.Screen
        name="Events"
        component={Events}
        options={{
          tabBarLabel: "События",
          tabBarIcon: ({ focused, color, size }) => (
            <MaterialCommunityIcons
              name={focused ? "bell" : "bell-outline"}
              color={color}
              size={size}
            />
          ),
        }}
      /> */}
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: "Главная",
          headerShown: true,
          tabBarIcon: ({ focused, color, size }) => (
            <MaterialCommunityIcons
              name={focused ? "home" : "home-outline"}
              color={color}
              size={30}
            />
          ),
          header: props => <CustomHeader {...props} />
        }}
      />
      <Tab.Screen
        name="Posts"
        component={Posts}
        options={{
          tabBarLabel: "Записи",
          tabBarIcon: ({ focused, color, size }) => (
            <MaterialCommunityIcons
              name={focused ? "clipboard" : "clipboard-outline"}
              color={color}
              size={30}
            />
          ),
        }}
      />
      <Tab.Screen
          name="Прогулка"
          component={WalkScreen} // Пустой компонент, так как это не страница
          options={{
            tabBarIcon: ({ color, size }) => (
              <CustomTabBarLabel color={color} size={size} />
            ),
            tabBarButton: (props) => (
              <CustomTabBarButton {...props} onPress={() => setModalVisible(true)} />
            ),
            tabBarLabel: () => null
          }}
        />
      <Tab.Screen
        name="Chat"
        component={Chat}
        options={{
          tabBarLabel: "Чат",
          tabBarIcon: ({ focused, color, size }) => (
            <MaterialCommunityIcons
              name={focused ? "chat" : "chat-outline"}
              color={color}
              size={30}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: "Профиль",
          tabBarIcon: ({ focused, color, size }) => (
            user?.avatar ? (
              <Image
                source={{ uri: user.avatar }}
                style={{ width: 30, height: 30, borderRadius: 15 }}
              />
            ) : (
              <MaterialCommunityIcons
                name={focused ? "account" : "account-outline"}
                color={color}
                size={30}
              />
            )
          ),
        }}
      />
    </Tab.Navigator>
     <AddRecord modalVisible={modalVisible} setModalVisible={setModalVisible} />
     </>
  );
}