import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../services/api";
import {
  removeTokenfromSessionStorage,
  setTokentoSessionStorage,
} from "../helpers/storage";

export const loginUser = createAsyncThunk(
  "membership/loginUser",
  async (requestData, { rejectWithValue }) => {
    try {
      const response = await api.post("/login", requestData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const registerUser = createAsyncThunk(
  "membership/registerUser",
  async (requestData, { rejectWithValue }) => {
    try {
      const response = await api.post("/registration", requestData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getProfile = createAsyncThunk(
  "membership/getProfile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/profile");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateProfile = createAsyncThunk(
  "membership/updateProfile",
  async (requestData, { rejectWithValue }) => {
    try {
      const response = await api.put("/profile/update", requestData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateImageProfile = createAsyncThunk(
  "membership/updateImageProfile",
  async (requestData, { rejectWithValue }) => {
    const formData = new FormData();
    formData.append("file", requestData);

    try {
      const response = await api.put("/profile/image", formData, {
        headers: { "content-type": "multipart/form-data" },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const membershipSlice = createSlice({
  name: "membership",
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: () => {
      removeTokenfromSessionStorage();
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false;
      const { data } = action.payload;
      setTokentoSessionStorage(data?.token);
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(registerUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(registerUser.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(getProfile.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getProfile.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.data;
    });
    builder.addCase(getProfile.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      removeTokenfromSessionStorage();
    });

    builder.addCase(updateProfile.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateProfile.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.data;
    });
    builder.addCase(updateProfile.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(updateImageProfile.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateImageProfile.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.data;
    });
    builder.addCase(updateImageProfile.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const { logout } = membershipSlice.actions;

export default membershipSlice.reducer;
