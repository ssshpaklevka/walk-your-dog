export type AnimalType = {
    id?: string;
    avatar: string;
    name: string;
    petType: string;
    petBreed: string;
    birthday: Date | null;
    gender: string;
    castration: boolean;
    leash: boolean;
    bite: boolean;
    aggressive: boolean;
    vaccinations: string | string[];
    allHealth: string;
    moreInfo: string;
  };

  export interface AnimalInterface {
    id?: string;
    avatar: string;
    name: string;
    petType: string;
    petBreed: string;
    birthday: Date | undefined;
    gender: string;
    castration: boolean;
    leash: boolean;
    bite: boolean;
    aggressive: boolean;
    vaccinations: string | string[];
    allHealth: string;
    moreInfo: string;
  }