import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";

import {
  type RegisterPayload,
  type LoginPayload,
  type User,
  type AuthState,
} from "../types/authTypes";
import axiosInstance from "../api/axiosInstance";

export const registerUser = createAsyncThunk<
  User,
  RegisterPayload,
  { rejectValue: string }
>("auth/registerUser", async (userData, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post("/user/register", userData);
    return response.data.user;
  } catch (err: any) {
    return rejectWithValue(
      err.response?.data?.message || "Ro'yxatdan o'tishda xatolik"
    );
  }
});

export const loginUser = createAsyncThunk<
  { token: string },
  LoginPayload,
  { rejectValue: string }
>("auth/loginUser", async (userData, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post("/user/login", userData);
    return response.data.result;
  } catch (err: any) {
    return rejectWithValue(
      err.response?.data?.message || "Loginda xatolik yuz berdi"
    );
  }
});
const initialState: AuthState = {
  user: null,
  token: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
    },
    setToken(state, action: PayloadAction<string>) {
      state.token = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Register
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Ro'yxatdan o'tishda xatolik";
      })

      // Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Login xatoligi";
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
