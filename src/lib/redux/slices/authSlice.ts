import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { User } from "@/lib/types";
import { defaultUsers } from "@/lib/data";

interface AuthState {
  user: User | null;
  users: User[];
  isLoading: boolean;
}

const initialState: AuthState = {
  user: null,
  users: defaultUsers,
  isLoading: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {
    // After redux-persist rehydrates, set isLoading to false
    builder.addCase("persist/REHYDRATE", (state) => {
      state.isLoading = false;
    });
  },
  reducers: {
    setUser(state, action: PayloadAction<User | null>) {
      state.user = action.payload;
      state.isLoading = false;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    logout(state) {
      state.user = null;
    },
    addUser(state, action: PayloadAction<User>) {
      state.users.push(action.payload);
    },
    updateUser(
      state,
      action: PayloadAction<{ id: string; updates: Partial<User> }>
    ) {
      const idx = state.users.findIndex((u) => u.id === action.payload.id);
      if (idx !== -1) {
        state.users[idx] = {
          ...state.users[idx],
          ...action.payload.updates,
        };
      }
    },
    deleteUser(state, action: PayloadAction<string>) {
      state.users = state.users.filter((u) => u.id !== action.payload);
    },
    setUsers(state, action: PayloadAction<User[]>) {
      state.users = action.payload;
    },
  },
});

export const {
  setUser,
  setLoading,
  logout,
  addUser,
  updateUser,
  deleteUser,
  setUsers,
} = authSlice.actions;
export default authSlice.reducer;
