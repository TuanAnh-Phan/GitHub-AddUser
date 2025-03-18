import { create } from "zustand";
import { User } from "../models/user.model";

interface UserState {
  users: User[];
  editingUser: User | null;
  deletingUser: User | null;
  addUser: (user: Omit<User, "key">) => void;
  editUser: (key: number, updatedUser: Omit<User, "key">) => void;
  deleteUser: (key: number) => void;
  setEditingUser: (user: User | null) => void;
  setDeletingUser: (user: User | null) => void;
}

const useUserStore = create<UserState>((set) => ({
  users: [],
  editingUser: null,
  deletingUser: null,

  addUser: (user) => {
    set((state) => ({
      users: [...state.users, { ...user, key: Date.now() }],
    }));
  },

  editUser: (key, updatedUser) => {
    set((state) => ({
      users: state.users.map((user) =>
        user.key === key ? { ...user, ...updatedUser } : user
      ),
      editingUser: null,
    }));
  },

  deleteUser: (key) => {
    set((state) => ({
      users: state.users.filter((user) => user.key !== key),
      deletingUser: null,
    }));
  },

  setEditingUser: (user) => set(() => ({ editingUser: user })),
  setDeletingUser: (user) => set(() => ({ deletingUser: user })),
}));

export default useUserStore;
