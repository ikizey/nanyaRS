import { FormEvent } from "react";
import { useDispatch } from "react-redux";
import { addFormData, FormInputData } from "../store/formSlice";

export function convertFormData(data: FormData) {
  const formEntries = Object.fromEntries(data.entries());
  const formData: FormInputData = {
    name: formEntries.name as string,
    age: Number(formEntries.age),
    email: formEntries.email as string,
    password: formEntries.password as string,
    confirmPassword: formEntries.confirmPassword as string,
    gender: formEntries.gender as "male" | "female",
    termsAccepted: formEntries.termsAccepted === "on",
  };
  return formData;
}

export function getFormData(event: FormEvent) {
  const form = event.currentTarget as HTMLFormElement;
  const formData = new FormData(form);
  return convertFormData(formData);
}

export default function UnControlledForm() {
  const dispatch = useDispatch();

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const data = getFormData(event);

    dispatch(addFormData(data));
  }

  return (
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
        <label htmlFor="termsAccepted">I accept the Terms and Conditions</label>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}
