import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Role from "../../Role";
import RegistrationEmployee from "../RegistrationEmployee";
import Slide from "../../../slices/Slide";
import SmsRegistration from "../SmsRegistration";
import DatingWindow from "../DatingWindow";
import FormRegistration from "../FormRegistration";
import TabNavigator from "../../../../Footer";
import Profile from "../../../screens/profile/Profile";

const Stack = createNativeStackNavigator();

export default function RegistrationEmployeeNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Slide" component={Slide}  options={{ headerShown: false, gestureEnabled: false }} />
        <Stack.Screen name="Role" component={Role}  options={{ headerShown: false }} />
        <Stack.Screen name="RegistrationEmployee" component={RegistrationEmployee}  options={{ headerShown: false}} />
        <Stack.Screen name="SmsRegistration" component={SmsRegistration}  options={{ headerShown: false}} />
        <Stack.Screen name="DatingWindow" component={DatingWindow}  options={{ headerShown: false}} />
        <Stack.Screen name="FormRegistration" component={FormRegistration}  options={{ headerShown: false}} />
        <Stack.Screen name="TabNavigator" component={TabNavigator}  options={{ headerShown: false}} />
        <Stack.Screen name="Profile" component={Profile}  options={{ headerShown: false}} />
        {/* <Stack.Screen name="RegistrationClient" component={RegistrationClient}  options={{ headerShown: false}} />
        <Stack.Screen name="SmsRegistration" component={SmsRegistration}  options={{ headerShown: false}} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
