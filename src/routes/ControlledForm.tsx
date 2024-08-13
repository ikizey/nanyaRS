import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addFormData, FormInputData, Gender } from "../store/formSlice";
import { readFile } from "../lib/readFile";
import Preview from "../components/Preview";
import CountryField from "../components/CountryField";

export interface RawFormInputData {
  name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  gender: Gender;
  termsAccepted: boolean;
  file: File[];
  country: string;
}

export default function ControlledForm() {
  const { register, handleSubmit, setValue } = useForm<RawFormInputData>();
  const dispatch = useDispatch();

  async function onSubmit(data: RawFormInputData) {
    let imageBase64: string | undefined;
    if (data.file) {
      imageBase64 = await readFile(data.file[0] as File);
    }

    const finalData: FormInputData = {
      name: data.name,
      age: data.age,
      email: data.email,
      password: data.password,
      confirmPassword: data.confirmPassword,
      gender: data.gender,
      termsAccepted: data.termsAccepted,
      imageBase64,
      country: data.country,
    };

    dispatch(addFormData(finalData));
  }

  return (
    <>
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
          <label htmlFor="termsAccepted">
            I accept the Terms and Conditions
          </label>
        </div>
        <div>
          <label htmlFor="file">Upload Picture:</label>
          <input
            id="file"
            type="file"
            accept="image/png, image/jpeg"
            {...register("file")}
          />
        </div>
        <CountryField
          inputProps={register("country")}
          setFormValue={(country) => setValue("country", country)}
        />
        <button type="submit">Submit</button>
      </form>
      <Preview />
    </>
  );
}
