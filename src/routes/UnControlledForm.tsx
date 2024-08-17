import { FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { addFormData, Gender } from "../store/formSlice";
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

async function validateAndConvertFormData(formData: FormData, file: FileList) {
  const formDataObj = Object.fromEntries(formData.entries());
  const typedData = {
    ...formDataObj,
    age: Number(formDataObj.age),
    termsAccepted: formDataObj.termsAccepted === "on",
    file,
  };

  return (await validationSchema.validate(typedData, {
    abortEarly: false,
  })) as RawFormInputData;
}

async function convertData(data: RawFormInputData) {
  return {
    name: data.name,
    age: data.age,
    email: data.email,
    password: data.password,
    confirmPassword: data.confirmPassword,
    gender: data.gender,
    termsAccepted: data.termsAccepted,
    imageBase64: await readFile(data.file!),
    country: data.country,
  };
}

interface ValidationErrors {
  inner?: ValidationError[];
}
interface ValidationError {
  path: string;
  message: string;
}

function formatValidationErrors(
  validationErrors: ValidationErrors,
): Record<string, string> {
  const formattedErrors: Record<string, string> = {};

  validationErrors.inner?.forEach((err: ValidationError) => {
    formattedErrors[err.path] = err.message;
  });

  return formattedErrors;
}

export default function UnControlledForm() {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [files, setFiles] = useState<FileList | undefined>();

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    const formData = new FormData(form);

    try {
      const validated = await validateAndConvertFormData(formData, files!);
      const data = await convertData(validated);

      setErrors({});
      dispatch(addFormData(data));
    } catch (validationErrors) {
      const formattedErrors = formatValidationErrors(
        validationErrors as ValidationErrors,
      );
      setErrors(formattedErrors);
    }
  }

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const files = event.target.files;
    if (files) {
      setFiles(files);
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h2>Uncontrolled form</h2>
        <div>
          <label htmlFor="name">Name:</label>
          <input id="name" name="name" type="text" />
          {errors.name && <p>{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="age">Age:</label>
          <input id="age" name="age" type="number" min="0" />
          {errors.age && <p>{errors.age}</p>}
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input id="email" name="email" type="email" />
          {errors.email && <p>{errors.email}</p>}
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input id="password" name="password" type="password" />
          {errors.password && <p>{errors.password}</p>}
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input id="confirmPassword" name="confirmPassword" type="password" />
          {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
        </div>
        <div>
          <label>Gender:</label>
          <input
            id="male"
            name="gender"
            type="radio"
            value="male"
            defaultChecked
          />
          <label htmlFor="male">Male</label>
          <input id="female" name="gender" type="radio" value="female" />
          <label htmlFor="female">Female</label>
          {errors.gender && <p>{errors.gender}</p>}
        </div>
        <div>
          <input id="termsAccepted" name="termsAccepted" type="checkbox" />
          <label htmlFor="termsAccepted">
            I accept the Terms and Conditions
          </label>
          {errors.termsAccepted && <p>{errors.termsAccepted}</p>}
        </div>
        <div>
          <label htmlFor="file">Upload Picture:</label>
          <input
            id="file"
            name="file"
            type="file"
            accept="image/png, image/jpeg"
            onChange={handleFileChange}
          />
          {errors.file && <p>{errors.file}</p>}
        </div>
        <div>
          <div style={{ position: "relative", display: "flex" }}>
            <label htmlFor="country">Country:</label>
            <CountryInput />
          </div>
          {errors.country && <p>{errors.country}</p>}
        </div>
        <button type="submit">Submit</button>
      </form>
      <Preview />
    </>
  );
}
