import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../services/api";

export const getServices = createAsyncThunk(
  "information/getServices",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/services");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getBanners = createAsyncThunk(
  "information/getBanners",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/banner");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const informationSlice = createSlice({
  name: "information",
  initialState: {
    services: null,
    banners: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getServices.pending, (state) => {
      state.error = null;
    });
    builder.addCase(getServices.fulfilled, (state, action) => {
      state.services = action.payload.data;
    });
    builder.addCase(getServices.rejected, (state, action) => {
      state.error = action.payload;
    });

    builder.addCase(getBanners.pending, (state) => {
      state.error = null;
    });
    builder.addCase(getBanners.fulfilled, (state, action) => {
      state.banners = action.payload.data;
    });
    builder.addCase(getBanners.rejected, (state, action) => {
      state.error = action.payload;
    });
  },
});

export default informationSlice.reducer;
