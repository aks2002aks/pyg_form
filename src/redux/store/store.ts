import { configureStore } from "@reduxjs/toolkit";
import formFieldReducer from "../features/formField/formFieldSlice";

export const store = configureStore({
  reducer: formFieldReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
