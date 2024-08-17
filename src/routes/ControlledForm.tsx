import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import { addFormData, FormInputData, Gender } from "../store/formSlice";
import { readFile } from "../lib/readFile";
import Preview from "../components/Preview";
import CountryInput from "../components/CountryInput";
import validationSchema from "../lib/validations";

export interface RawFormInputData {
  name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  gender: Gender;
  termsAccepted: boolean;
  file?: FileList;
  country: string;
}

export default function ControlledForm() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });
  const dispatch = useDispatch();

  async function onSubmit(data: RawFormInputData) {
    let imageBase64: string | undefined;
    if (data.file) {
      imageBase64 = await readFile(data.file);
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
          {errors.name && <p>{errors.name.message}</p>}
        </div>
        <div>
          <label htmlFor="age">Age:</label>
          <input
            id="age"
            {...register("age", { valueAsNumber: true })}
            type="number"
            min="0"
          />
          {errors.age && <p>{errors.age.message}</p>}
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input id="email" {...register("email")} type="email" />
          {errors.email && <p>{errors.email.message}</p>}
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input id="password" {...register("password")} type="password" />
          {errors.password && <p>{errors.password.message}</p>}
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            id="confirmPassword"
            {...register("confirmPassword")}
            type="password"
          />
          {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
        </div>
        <div>
          <label>Gender:</label>
          <input
            id="male"
            {...register("gender")}
            type="radio"
            value="male"
            defaultChecked
          />
          <label htmlFor="male">Male</label>
          <input
            id="female"
            {...register("gender")}
            type="radio"
            value="female"
          />
          <label htmlFor="female">Female</label>
          {errors.gender && <p>{errors.gender.message}</p>}
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
          {errors.termsAccepted && <p>{errors.termsAccepted.message}</p>}
        </div>
        <div>
          <label htmlFor="file">Upload Picture:</label>
          <input
            id="file"
            type="file"
            accept="image/png, image/jpeg"
            {...register("file")}
          />
          {errors.file && <p>{errors.file.message}</p>}
        </div>
        <div style={{ position: "relative", display: "flex" }}>
          <label htmlFor="country">Country:</label>
          <CountryInput onChange={(country) => setValue("country", country)} />
          {errors.country && <p>{errors.country.message}</p>}
        </div>
        <button type="submit">Submit</button>
      </form>
      <Preview />
    </>
  );
}
