import React from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import RegistrationEmployeeNavigation from "./components/features/registration/EmployeeRegistration/NavigationRegistration/RegistrationEmployeeNavigation";
import Slide from "./components/features/slices/Slide";
import RegistrationClientNavigation from "./components/features/registration/ClientRegistration/NavigationRegistration.tsx/RegistrationClientNavigationt";

export default function App() {
  
  return (
    <SafeAreaProvider>
      <RegistrationEmployeeNavigation/>
      {/* <Slide/> */}
      <StatusBar style="auto" />
    </SafeAreaProvider>
  );
}
