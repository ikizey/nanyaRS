import * as yup from "yup";

export const password = yup
  .string()
  .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
  .matches(/[a-z]/, "Password must contain at least one lowercase letter")
  .matches(/\d/, "Password must contain at least one number")
  .matches(/[\W_]/, "Password must contain at least one special character")
  .required("Password is required");
