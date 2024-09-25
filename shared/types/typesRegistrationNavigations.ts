import { AnimalInterface } from "./animal";

export type RootStackParamList = {
  RegistrationEmployee: undefined; 
    SmsRegistration: { phoneNumber: string }; 
    DatingWindow: undefined;
    DatingWindowClient: undefined;
    FormRegistration: undefined;
    TabNavigator: undefined;
    Map: undefined;
    RegistrationPeople: undefined;
    RegistrationAnimals: undefined;
    Reminder: undefined;
    Services: undefined;
    OrderDetails: OrderDetails;
    SelectPeet: { serviceName: string }
    InfoEvent: {selectedPet: AnimalInterface, serviceName: string}
    Email: undefined;
    SmsEmail: undefined;
  };


  interface ServiceDetail {
    title: string;
    price: number;
  }
  
  export interface OrderDetails {
    selectedAnimal: AnimalInterface;
    selectedServices: ServiceDetail[];
    selectedDate: Date | string;
    selectedTime: string;
    selectedRepeat: string;
    totalCost: number;
  }

  // type Pet = {
  //   aggressive: string,
  //   allHealth: string,
  //   avatar: string,
  //   birthday?: any,
  //   bite: string,
  //   castration: string,
  //   gender: string,
  //   leash: string,
  //   moreInfo: string,
  //   name: string,
  //   petBreed: string,
  //   petType: string,
  //   vaccinations: Array<string>
  // };