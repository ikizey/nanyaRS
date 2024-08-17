import * as yup from "yup";
import countries from "../countries";

export const country = yup
  .string()
  .oneOf(countries, "You must select country from the list")
  .required("Country is required");
