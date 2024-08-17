import * as yup from "yup";
import { name } from "./name";
import { age } from "./age";
import { email } from "./email";
import { password } from "./password";
import { confirmPassword } from "./confirmPassword";
import { gender } from "./gender";
import { termsAccepted } from "./termsAccepted";
import { file } from "./file";
import { country } from "./country";

export default yup.object().shape({
  name,
  age,
  email,
  password,
  confirmPassword,
  gender,
  termsAccepted,
  file,
  country,
});
