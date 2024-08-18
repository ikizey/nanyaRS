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

export interface TrackedField<T> {
  value: T;
  changed: boolean;
}

export interface TrackedFormInputData {
  name: TrackedField<string>;
  age: TrackedField<number>;
  email: TrackedField<string>;
  password: TrackedField<string>;
  confirmPassword: TrackedField<string>;
  gender: TrackedField<string>;
  termsAccepted: TrackedField<boolean>;
  imageBase64?: TrackedField<string | undefined>;
  country: TrackedField<string>;
}

export interface FormState {
  formData?: TrackedFormInputData;
}

const initialState: FormState = {
  formData: undefined,
};

const trackFormField = <T>(
  field: TrackedField<T>,
  newValue: T,
): TrackedField<T> => {
  return {
    value: newValue,
    changed: field.value !== newValue,
  };
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    addFormData(state, action: PayloadAction<FormInputData>) {
      const formData: TrackedFormInputData = state.formData || {
        name: { value: "", changed: false },
        age: { value: 0, changed: false },
        email: { value: "", changed: false },
        password: { value: "", changed: false },
        confirmPassword: { value: "", changed: false },
        gender: { value: "", changed: false },
        termsAccepted: { value: false, changed: false },
        imageBase64: { value: undefined, changed: false },
        country: { value: "", changed: false },
      };

      formData.name = trackFormField(formData.name, action.payload.name);
      formData.age = trackFormField(formData.age, action.payload.age);
      formData.email = trackFormField(formData.email, action.payload.email);
      formData.password = trackFormField(
        formData.password,
        action.payload.password,
      );
      formData.confirmPassword = trackFormField(
        formData.confirmPassword,
        action.payload.confirmPassword,
      );
      formData.gender = trackFormField(formData.gender, action.payload.gender);
      formData.termsAccepted = trackFormField(
        formData.termsAccepted,
        action.payload.termsAccepted,
      );
      formData.imageBase64 = trackFormField(
        formData.imageBase64!,
        action.payload.imageBase64 || undefined,
      );
      formData.country = trackFormField(
        formData.country,
        action.payload.country,
      );

      state.formData = formData;
    },
  },
});

export const { addFormData } = formSlice.actions;
export default formSlice.reducer;
