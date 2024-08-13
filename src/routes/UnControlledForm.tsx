import { FormEvent } from "react";
import { useDispatch } from "react-redux";
import { addFormData, FormInputData } from "../store/formSlice";

export function convertFormData(data: FormData) {
  const formEntries = Object.fromEntries(data.entries());
  return formEntries as unknown as FormInputData;
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
      <button type="submit">Submit</button>
    </form>
  );
}
