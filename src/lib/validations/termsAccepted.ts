import * as yup from "yup";

export const termsAccepted = yup
  .boolean()
  .oneOf([true], "You must accept the terms and conditions")
  .required();
