import { configureStore } from "@reduxjs/toolkit";
import auth from "./authSlice";
import ads from "./adsSlice";

const store = configureStore({
  reducer: { ads,auth },
});

export default store;
