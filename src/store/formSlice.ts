import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface FormData {
  name: string;
  age: number;
  email: string;
  password: string;
  gender: string;
  imageBase64: string;
  country?: string;
  termsAccepted: boolean;
}

export interface FormState {
  formData: FormData[];
}

const initialState: FormState = {
  formData: [],
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    addFormData(state, action: PayloadAction<FormData>) {
      state.formData.push(action.payload);
    },
  },
});

export const { addFormData } = formSlice.actions;
export default formSlice.reducer;
