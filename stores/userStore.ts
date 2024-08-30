import { create } from 'zustand';
import { UserType } from '../shared/types/user';
import { AnimalInterface } from '../shared/types/animal';
import { EventInterface } from '../shared/types/events';

interface UserState {
  user: UserType | null;
  animals: AnimalInterface[];
  events: EventInterface[]
  newUser: (userData: UserType) => void;
  newAnimal: (animalData: AnimalInterface) => void;
  addEvent: (eventData: EventInterface) => void;
  clearUser: () => void;
}

const useUserStore = create<UserState>((set) => ({
  user: null,
  animals: [],
  events: [],
  newUser: (userData: UserType) => set((state) => ({ user: userData })),
  newAnimal:(animalData: AnimalInterface) => set(state => {
    const id = Math.random().toString(36).substr(2, 9); // Генерация уникального ID
    return { animals: [...state.animals, { ...animalData, id }] };
  }),
  addEvent: (eventData: EventInterface) => set((state) => ({
    events: [...state.events, eventData],
  })),
  clearUser: () => set({ user: null, animals: [] }),
}));

export default useUserStore;