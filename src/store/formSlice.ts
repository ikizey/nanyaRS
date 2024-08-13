import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Gender = "male" | "female";

export interface FormInputData {
  name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  gender: Gender;
  termsAccepted: boolean;
  imageBase64?: string;
  country: string;
}

export interface FormState {
  formData?: FormInputData;
}

const initialState: FormState = {
  formData: undefined,
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    addFormData(state, action: PayloadAction<FormInputData>) {
      state.formData = action.payload;
    },
  },
});

export const { addFormData } = formSlice.actions;
export default formSlice.reducer;
