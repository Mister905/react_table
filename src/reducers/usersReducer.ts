import {
  createSlice,
  type PayloadAction,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import type { User } from "../types";
import { faker } from "@faker-js/faker";

const LOCAL_STORAGE_KEY = import.meta.env.VITE_LOCAL_STORAGE_KEY || "users";

// Async thunk to load or generate users
export const loadOrGenerateUsers = createAsyncThunk<User[]>(
  "users/loadOrGenerate",
  async () => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (stored) {
      try {
        const parsed: User[] = JSON.parse(stored);
        if (parsed.length >= 500) return parsed;
      } catch (error) {
        console.log(error);
      }
    }

    // Generate 500 fake users
    const users: User[] = [];
    for (let i = 1; i <= 500; i++) {
      users.push({
        id: i,
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        city: faker.address.city(),
        registeredDate: faker.date.past(2).toISOString(), // past 2 years
      });
    }

    // Save generated users to localStorage
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(users));
    return users;
  }
);

interface UsersState {
  users: User[];
  loading: boolean;
  error?: string;
}

const initialState: UsersState = {
  users: [],
  loading: false,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadOrGenerateUsers.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(
        loadOrGenerateUsers.fulfilled,
        (state, action: PayloadAction<User[]>) => {
          state.users = action.payload;
          state.loading = false;
        }
      )
      .addCase(loadOrGenerateUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default usersSlice.reducer;
