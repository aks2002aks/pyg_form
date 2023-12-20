import { configureStore, combineReducers } from "@reduxjs/toolkit";
import formFieldReducer from "../features/formField/formFieldSlice";
import responseFieldSlice from "../features/responseField/responseFieldSlice";

const rootReducer = combineReducers({
  formField: formFieldReducer,
  formResponse: responseFieldSlice,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
