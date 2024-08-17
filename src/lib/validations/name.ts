import * as yup from "yup";

export const name = yup
  .string()
  .matches(/^[A-Z]/, "Name must start with an uppercase letter")
  .required("Name is required");
