import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import selectedItemsReducer from "../features/selectedItems/selectedItemsSlice";

export const store = configureStore({
  reducer: {
    selectedItems: selectedItemsReducer,
  },
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
