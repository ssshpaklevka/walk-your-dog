import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Role from "../../Role";
import RegistrationClient from "../RegistrationClient";


const Stack = createNativeStackNavigator();

export default function RegistrationClientNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Role" component={Role}  options={{ headerShown: false }} />
        <Stack.Screen name="RegistrationClient" component={RegistrationClient}  options={{ headerShown: false}} />
        {/* <Stack.Screen name="SmsRegistration" component={SmsRegistration}  options={{ headerShown: false}} />
        <Stack.Screen name="DatingWindow" component={DatingWindow}  options={{ headerShown: false}} />
        <Stack.Screen name="FormRegistration" component={FormRegistration}  options={{ headerShown: false}} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}