import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addFormData, FormInputData } from "../store/formSlice";

export default function ControlledForm() {
  const { register, handleSubmit } = useForm<FormInputData>();
  const dispatch = useDispatch();

  function onSubmit(data: FormInputData) {
    dispatch(addFormData(data));
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Controlled form</h2>
      <div>
        <label htmlFor="name">Name:</label>
        <input id="name" {...register("name")} />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}
