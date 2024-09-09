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
import RegistrationClient from "../../ClientRegistration/RegistrationClient";
import DatingWindowClient from "../../ClientRegistration/DatingWindowClient";
import RegistrationPeople from "../../ClientRegistration/Registration/RegistrationPeople";
import RegistrationAnimals from "../../ClientRegistration/Registration/RegistrationAnimals";
import Map from "../../../../../shared/ui/Map/Map";
import Reminder from "../../../reminder/Reminder";
import SelectPeet from "../../../reminder/SelectPeet";
import InfoEvent from "../../../reminder/InfoEvent";
import Services from "../../../service/Services";
import OrderDetails from "../../../service/OrderDetails";

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
        <Stack.Screen name="Map" component={Map}  options={{ headerShown: false}} />
        <Stack.Screen name="Profile" component={Profile}  options={{ headerShown: false, gestureEnabled: false}} />
         <Stack.Screen name="RegistrationClient" component={RegistrationClient}  options={{ headerShown: false}} />
         <Stack.Screen name="DatingWindowClient" component={DatingWindowClient}  options={{ headerShown: false}} />
         <Stack.Screen name="RegistrationPeople" component={RegistrationPeople}  options={{ headerShown: false}} />
         <Stack.Screen name="RegistrationAnimals" component={RegistrationAnimals}  options={{ headerShown: false}} />
         <Stack.Screen name="Reminder" component={Reminder}  options={{ headerShown: false}} />
         <Stack.Screen name="Services" component={Services}  options={{ headerShown: false}} />
         <Stack.Screen name="OrderDetails" component={OrderDetails}  options={{ headerShown: false}} />
         <Stack.Screen name="SelectPeet" component={SelectPeet}  options={{ headerShown: false}} />
         <Stack.Screen name="InfoEvent" component={InfoEvent}  options={{ headerShown: false}} />
        {/* <Stack.Screen name="SmsRegistration" component={SmsRegistration}  options={{ headerShown: false}} />  */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
