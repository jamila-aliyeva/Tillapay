import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../api/axiosInstance";

export const fetchConvertationList = createAsyncThunk(
  "convertation/list",
  async () => {
    const res = await axiosInstance.get("/convertation");
    return res.data.result;
  }
);

export const buyGold = createAsyncThunk(
  "convertation/buy",
  async ({ amount }: { amount: number }) => {
    const res = await axiosInstance.post("/convertation/buy", { amount });
    return res.data;
  }
);

export const sellGold = createAsyncThunk(
  "convertation/sell",
  async ({ amount, card_number }: { amount: number; card_number: string }) => {
    const res = await axiosInstance.post("/convertation/sell", {
      amount,
      card_number,
    });
    return res.data;
  }
);

const convertationSlice = createSlice({
  name: "convertation",
  initialState: {
    convertations: [],
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchConvertationList.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchConvertationList.fulfilled, (state, action) => {
        state.convertations = action.payload;
        state.loading = false;
      })
      .addCase(fetchConvertationList.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default convertationSlice.reducer;
