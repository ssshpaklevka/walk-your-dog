import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image } from "react-native";
import Events from "./features/screens/events/Events";
import Chat from "./features/screens/chat/Chat";
import Posts from "./features/screens/posts/Posts";
import Profile from "./features/screens/profile/Profile";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

export default function TabNavigator({ route }: any) {
  const {
    avatar,
    name,
    email,
    number,
    valueCity,
    valueServices,
    valueAnimals,
    selectedInterval,
  } = route.params;

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: true,
        tabBarActiveTintColor: "black",
        tabBarInactiveTintColor: "gray",
        tabBarLabelStyle: { fontSize: 10 },
        headerTitleAlign: "center",
        headerStyle: {backgroundColor: "white", borderBottomWidth: 0, shadowOpacity: 0}
      }}
    >
      <Tab.Screen
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
              size={size}
            />
          ),
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
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Профиль"
        component={Profile}
        options={{
          tabBarLabel: "Профиль",
          tabBarIcon: ({ focused }) => (
            <Image
              source={{ uri: avatar }}
              style={{ width: 30, height: 30, borderRadius: 15 }}
            />
          ),
        }}
        initialParams={{
          avatar,
          name,
          email,
          number,
          valueCity,
          valueServices,
          valueAnimals,
          selectedInterval,
        }}
      />
    </Tab.Navigator>
  );
}
