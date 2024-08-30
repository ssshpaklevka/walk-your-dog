export type UserType = {
    id?: string;
    avatar: string;
    name: string;
    email: string;
    number: string;
    valueCity: string;
    valueServices?: string[];
    valueAnimals?: string[];
    selectedInterval?: string;
    balance: number;
  };

  export interface UserInterface {
    id?: string;
    avatar: string;
    name: string;
    email: string;
    number: string;
    valueCity: string;
    valueServices: string[];
    valueAnimals: string[];
    selectedInterval: string;
    balance: number;
  }