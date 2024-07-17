import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Character } from "../../types/character";

const selectedItemsSlice = createSlice({
  name: "selectedItems",
  initialState: { selectedItems: [] as Character[] },
  reducers: {
    addItem: (state, action: PayloadAction<Character>) => {
      state.selectedItems.push(action.payload);
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.selectedItems = state.selectedItems.filter(
        (item) => item.name !== action.payload,
      );
    },
    setItems: (state, action: PayloadAction<Character[]>) => {
      state.selectedItems = action.payload;
    },
  },
});

export const { addItem, removeItem, setItems } = selectedItemsSlice.actions;

export default selectedItemsSlice.reducer;
