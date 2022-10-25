import { configureStore } from "@reduxjs/toolkit";
import basketReducer from "../slices/basketSlice";
import searchReducer from "../slices/searchSlice";

export const createStore = (initialState) =>
  configureStore({
    reducer: {
      basket: basketReducer,
      search: searchReducer,
    },
    preloadedState: initialState,
  });
