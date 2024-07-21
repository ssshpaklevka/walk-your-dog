export type RootStackParamList = {
  RegistrationEmployee: undefined; 
    SmsRegistration: { phoneNumber: string }; 
    DatingWindow: undefined;
    FormRegistration: undefined;
    TabNavigator: {avatar: string | null,
      name: string | null,
      email: string | null,
      number: string | null,
      valueCity: string | null,
      valueServices: string[] | null,
      valueAnimals: string[] | null,
      selectedInterval: string | null,
    };
  };