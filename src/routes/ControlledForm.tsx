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
      <div>
        <label htmlFor="age">Age:</label>
        <input
          id="age"
          {...register("age", { valueAsNumber: true })}
          type="number"
          min="0"
        />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input id="email" {...register("email")} type="email" />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input id="password" {...register("password")} type="password" />
      </div>
      <div>
        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input
          id="confirmPassword"
          {...register("confirmPassword")}
          type="password"
        />
      </div>
      <div>
        <label>Gender:</label>
        <input id="male" {...register("gender")} type="radio" value="male" />
        <label htmlFor="male">Male</label>
        <input
          id="female"
          {...register("gender")}
          type="radio"
          value="female"
        />
        <label htmlFor="female">Female</label>
      </div>
      <div>
        <input
          id="termsAccepted"
          {...register("termsAccepted")}
          type="checkbox"
        />
        <label htmlFor="termsAccepted">I accept the Terms and Conditions</label>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}
