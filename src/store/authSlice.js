import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { END_POINT } from "../enviroment/env";

const initialState = {
  isLoggedIn: false,
  token: null,
  loading: false,
  error: null,
};
export const loginHandler = createAsyncThunk(
  "auth/loginHandler",
  async ({ phone, password }, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await fetch(`${END_POINT}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phone, password, account_type: "admin" }),
      });
      const data = await res.json();

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const logOutHandler = createAsyncThunk(
  "auth/logOutHandler",
  async (userToken, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const res = await fetch(`${END_POINT}/api/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      });
      const data = await res.json();

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const postSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: {
    //login
    [loginHandler.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [loginHandler.fulfilled]: (state, action) => {
      state.loading = false;
      state.isLoggedIn = true;
      localStorage.setItem("token", action.payload.data.token);
      state.token = action.payload.data.token;
    },
    [loginHandler.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    //Log out
    [logOutHandler.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [logOutHandler.fulfilled]: (state, action) => {
      state.loading = false;
      state.isLoggedIn = true;
      localStorage.removeItem("token");
    },
    [logOutHandler.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default postSlice.reducer;
