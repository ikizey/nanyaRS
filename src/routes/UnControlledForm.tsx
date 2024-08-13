import { FormEvent } from "react";
import { useDispatch } from "react-redux";
import { addFormData, FormInputData, Gender } from "../store/formSlice";
import { readFile } from "../lib/readFile";
import Preview from "../components/Preview";
import CountryField from "../components/CountryField";

export async function convertFormData(data: FormData) {
  const rawName = data.get("name") as string;
  const name = rawName;

  const rawAge = data.get("age") as string;
  const age = Number(rawAge);

  const rawEmail = data.get("email") as string;
  const email = rawEmail;

  const rawPassword = data.get("password") as string;
  const password = rawPassword;

  const rawConfirmPassword = data.get("confirmPassword") as string;
  const confirmPassword = rawConfirmPassword;

  const rawGender = data.get("gender") as string;
  const gender = rawGender as Gender;

  const rawTermsAccepted = data.get("termsAccepted") as string;
  const termsAccepted = rawTermsAccepted === "on";

  const rawFile = data.get("file") as File;
  const imageBase64 = await readFile(rawFile);

  const rawCountry = data.get("country") as string;
  const country = rawCountry;

  const formData: FormInputData = {
    name,
    age,
    email,
    password,
    confirmPassword,
    gender,
    termsAccepted,
    imageBase64,
    country,
  };
  return formData;
}

export async function getFormData(event: FormEvent) {
  const form = event.currentTarget as HTMLFormElement;
  const formData = new FormData(form);
  return await convertFormData(formData);
}

export default function UnControlledForm() {
  const dispatch = useDispatch();

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const data = await getFormData(event);

    dispatch(addFormData(data));
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h2>Uncontrolled form</h2>
        <div>
          <label htmlFor="name">Name:</label>
          <input id="name" name="name" type="text" />
        </div>
        <div>
          <label htmlFor="age">Age:</label>
          <input id="age" name="age" type="number" min="0" />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input id="email" name="email" type="email" />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input id="password" name="password" type="password" />
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input id="confirmPassword" name="confirmPassword" type="password" />
        </div>
        <div>
          <label>Gender:</label>
          <input id="male" name="gender" type="radio" value="male" />
          <label htmlFor="male">Male</label>
          <input id="female" name="gender" type="radio" value="female" />
          <label htmlFor="female">Female</label>
        </div>
        <div>
          <input id="termsAccepted" name="termsAccepted" type="checkbox" />
          <label htmlFor="termsAccepted">
            I accept the Terms and Conditions
          </label>
        </div>
        <div>
          <label htmlFor="file">Upload Picture:</label>
          <input
            id="file"
            name="file"
            type="file"
            accept="image/png, image/jpeg"
          />
        </div>
        <CountryField />
        <button type="submit">Submit</button>
      </form>
      <Preview />
    </>
  );
}
