import * as yup from "yup";

export const confirmPassword = yup
  .string()
  .oneOf([yup.ref("password")], "Passwords must match")
  .required("Confirm Password is required");
