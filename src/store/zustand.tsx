import { create } from "zustand";


interface User {
  key: number;
  firstName: string;
  lastName: string;
  age: number;
  address: string;
  tags: string[];
}

interface UserStore {
  users: User[];
  addUser: (user: Omit<User, "key">) => void;
  editUser: (key: number, updatedUser: Partial<User>) => void;
  deleteUser: (key: number) => void;
}

const useUserStore = create<UserStore>((set) => ({
  users: [],
  addUser: (user) =>
    set((state) => ({ users: [...state.users, { ...user, key: Date.now() }] })),
  editUser: (key, updatedUser) =>
    set((state) => ({
      users: state.users.map((user) => (user.key === key ? { ...user, ...updatedUser } : user)),
    })),
  deleteUser: (key) => set((state) => ({ users: state.users.filter((user) => user.key !== key) })),
}));

export default useUserStore;
