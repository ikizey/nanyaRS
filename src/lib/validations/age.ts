import * as yup from "yup";

export const age = yup
  .number()
  .typeError("Age must be a number")
  .min(0, "Age must be positive")
  .required("Age is required");
