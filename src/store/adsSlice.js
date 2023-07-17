import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { END_POINT } from "../enviroment/env";

const initialState = {
  ads: [],
  stores: [],
  loading: false,
  error: null,
  ad: [],
};

export const fetchAds = createAsyncThunk(
  "ads/fetchAds",
  async (userToken, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await fetch(`${END_POINT}/api/manage/ads`, {
        method: "GET",
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
export const fetchStores = createAsyncThunk(
  "ads/fetchStores",
  async (userToken, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await fetch(`${END_POINT}/api/manage/stores`, {
        method: "GET",
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
export const createAd = createAsyncThunk(
  "ads/createAd",
  async ( adDetail , thunkAPI) => {
    console.log(adDetail );
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await fetch(`${END_POINT}/api/manage/ads`, {
        method: "POST",
        body:JSON.stringify(adDetail),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${adDetail.userToken}`,
        },
      });
      const data = await res.json();

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const editAd = createAsyncThunk(
  "ads/editAd",
  async ( item , thunkAPI) => {
    console.log(item.id );
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await fetch(`${END_POINT}/api/manage/ads/${item.id}`, {
        method: "POST",
        body:JSON.stringify(item),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${item.userToken}`,
        },
      });
      const data = await res.json();

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const deleteAds = createAsyncThunk(
  "ads/deleteAds",
  async ({ id, userToken }, thunkAPI) => {
    console.log(id, userToken);
    const { rejectWithValue } = thunkAPI;
    try {
     await fetch(`${END_POINT}/api/manage/ads/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      });
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


const postSlice = createSlice({
  name: "ads",
  initialState,
  reducers: {
    cleanRecord: (state) => {
      state.record = null;
    },
  },
  extraReducers: {
    //get Ads
    [fetchAds.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [fetchAds.fulfilled]: (state, action) => {
      state.loading = false;
      state.ads = action.payload.data.data;
    },
    [fetchAds.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    //delete Ads
    [deleteAds.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [deleteAds.fulfilled]: (state, action) => {
      state.loading = false;
      state.ads = state.ads.filter((el) => el.id !== action.payload);
    },
    [deleteAds.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    //edit ad 
    [editAd.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [editAd.fulfilled]: (state, action) => {
      state.loading = false;
      state.ad = action.payload;
    },
    [editAd.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    //get stores
    [fetchStores.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [fetchStores.fulfilled]: (state, action) => {
      state.loading = false;
      state.stores = action.payload.data.data;
    },
    [fetchStores.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

  
  },
});

export default postSlice.reducer;
