import * as yup from "yup";

export const gender = yup
  .string()
  .oneOf(["male", "female"], "Please select a gender")
  .required("Gender is required");
