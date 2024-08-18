import * as yup from "yup";

export const email = yup
  .string()
  .email("Invalid email address")
  .required("Email is required");
