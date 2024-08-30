import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image } from "react-native";
import Events from "./features/screens/events/Events";
import Chat from "./features/screens/chat/Chat";
import Posts from "./features/screens/posts/Posts";
import Profile from "./features/screens/profile/Profile";
import Home from "./features/screens/home/Home";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import useUserStore from "../stores/userStore";
import CustomHeader from "./features/screens/home/components/CustomHeader";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {

  const { user } = useUserStore()

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
              size={size}
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
                size={size}
              />
            )
          ),
        }}
      />
    </Tab.Navigator>
  );
}
