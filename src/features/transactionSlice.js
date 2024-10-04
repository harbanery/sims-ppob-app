import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../services/api";

export const getBalance = createAsyncThunk(
  "transaction/getBalance",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/balance");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const topUp = createAsyncThunk(
  "transaction/topUp",
  async (requestData, { rejectWithValue }) => {
    try {
      const response = await api.post("/topup", requestData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getTransaction = createAsyncThunk(
  "transaction/getTransaction",
  async ({ offset = 0, limit = 5 }, { rejectWithValue }) => {
    try {
      const response = await api.get("/transaction/history", {
        params: {
          offset,
          limit: limit + 1,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createTransaction = createAsyncThunk(
  "transaction/createTransaction",
  async (requestData, { rejectWithValue }) => {
    try {
      const response = await api.post("/transaction", requestData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const transactionSlice = createSlice({
  name: "transaction",
  initialState: {
    balance: 0,
    transactions: [],
    length: 0,
    offset: 0,
    limit: 5,
    next: false,
    loading: false,
    error: null,
  },
  reducers: {
    defaultTransaction: (state) => {
      state.transactions = [];
      state.length = 0;
      state.offset = 0;
      state.next = false;
    },
    changeOffset: (state) => {
      const newOffset = state.offset + state.limit;
      state.offset = newOffset;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getBalance.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getBalance.fulfilled, (state, action) => {
      state.loading = false;
      state.balance = action.payload.data?.balance;
    });
    builder.addCase(getBalance.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(topUp.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(topUp.fulfilled, (state, action) => {
      state.loading = false;
      state.balance = action.payload.data?.balance;
    });
    builder.addCase(topUp.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(getTransaction.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getTransaction.fulfilled, (state, action) => {
      state.loading = false;
      state.transactions.push(
        action.payload.data?.records?.slice(0, state.limit)
      );
      state.length = state.transactions?.length;
      state.next = action.payload.data?.records?.length > state.limit;
    });
    builder.addCase(getTransaction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(createTransaction.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(createTransaction.fulfilled, (state, action) => {
      state.loading = false;
      state.balance -= action.payload.data?.total_amount;
    });
    builder.addCase(createTransaction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});
export const { defaultTransaction, changeOffset } = transactionSlice.actions;

export default transactionSlice.reducer;
