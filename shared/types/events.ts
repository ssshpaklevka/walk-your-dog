import { AnimalInterface } from "./animal";

export interface EventInterface {
  id?: string;
  serviceName: string;
  selectedPet: AnimalInterface;
  address: string;
  date: Date;
  time: string;
  repeat: string;
  remind: string;
}