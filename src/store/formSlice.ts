import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface FormInputData {
  name: string;
}

export interface FormState {
  formData: FormInputData[];
}

const initialState: FormState = {
  formData: [],
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    addFormData(state, action: PayloadAction<FormInputData>) {
      state.formData.push(action.payload);
    },
  },
});

export const { addFormData } = formSlice.actions;
export default formSlice.reducer;
