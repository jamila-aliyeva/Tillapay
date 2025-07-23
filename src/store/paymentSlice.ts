import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import axiosInstance from "../api/axiosInstance"; // bu senga kerak bo'lsa
import type { RootState } from "./store";

interface PaymentState {
  loading: boolean;
  error: string | null;
  paymentUrl: string | null;
}

const initialState: PaymentState = {
  loading: false,
  error: null,
  paymentUrl: null,
};

// thunk
export const createPayment = createAsyncThunk<
  string,
  number,
  { rejectValue: string }
>("payment/create", async (amount, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post("/payment/create", { amount });
    return response.data.result.url;
  } catch (err: any) {
    return rejectWithValue(
      err.response?.data?.message || "To‘lov yaratishda xatolik"
    );
  }
});

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    clearPayment(state) {
      state.paymentUrl = null;
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createPayment.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.paymentUrl = null;
      })
      .addCase(
        createPayment.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.loading = false;
          state.paymentUrl = action.payload;
        }
      )
      .addCase(createPayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "To‘lovda xatolik";
      });
  },
});

export const { clearPayment } = paymentSlice.actions;
export default paymentSlice.reducer;
