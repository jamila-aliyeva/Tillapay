import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../api/axiosInstance";

interface CurrencyState {
  buy_price: string;
  sell_price: string;
  loading: boolean;
  error: string | null;
}

const initialState: CurrencyState = {
  buy_price: "0",
  sell_price: "0",
  loading: false,
  error: null,
};

export const fetchCurrency = createAsyncThunk(
  "currency/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/currency", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (res.data.success) {
        const { buy_price, sell_price } = res.data.result;

        const dataWithExpiry = {
          buy_price,
          sell_price,
          expiresAt: Math.floor(Date.now() / 1000) + 3600,
        };
        localStorage.setItem("currency_prices", JSON.stringify(dataWithExpiry));

        return { buy_price, sell_price };
      } else {
        return rejectWithValue("Valyutani olishda xatolik");
      }
    } catch (err) {
      return rejectWithValue("Valyutani yuklashda server xatoligi");
    }
  }
);

const currencySlice = createSlice({
  name: "currency",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrency.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCurrency.fulfilled, (state, action) => {
        state.loading = false;
        state.buy_price = action.payload.buy_price;
        state.sell_price = action.payload.sell_price;
      })
      .addCase(fetchCurrency.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default currencySlice.reducer;
