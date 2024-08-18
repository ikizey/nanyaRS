import { FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { addFormData, Gender } from "../store/formSlice";
import { readFile } from "../lib/readFile";
import Preview from "../components/Preview";
import CountryInput from "../components/CountryInput";
import validationSchema from "../lib/validations";
import ErrorMessage from "../components/ErrorMessage";

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
  const [isValid, setIsValid] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    const formData = new FormData(form);

    try {
      const validated = await validateAndConvertFormData(formData, files!);
      const data = await convertData(validated);

      setErrors({});
      setIsValid(true);
      dispatch(addFormData(data));
    } catch (validationErrors) {
      const formattedErrors = formatValidationErrors(
        validationErrors as ValidationErrors,
      );
      setErrors(formattedErrors);
      setIsValid(false);
    }
  }

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const files = event.target.files;
    if (files) {
      setFiles(files);
    }
  }

  function handleFormChange() {
    setIsValid(true);
  }

  return (
    <>
      <form onSubmit={handleSubmit} onChange={handleFormChange}>
        <h2>Uncontrolled form</h2>
        <div>
          <label htmlFor="name">Name:</label>
          <input id="name" name="name" type="text" />
          <ErrorMessage>{errors.name && <p>{errors.name}</p>}</ErrorMessage>
        </div>
        <div>
          <label htmlFor="age">Age:</label>
          <input id="age" name="age" type="number" min="1" />
          <ErrorMessage>{errors.age && <p>{errors.age}</p>}</ErrorMessage>
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input id="email" name="email" type="email" />
          <ErrorMessage>{errors.email && <p>{errors.email}</p>}</ErrorMessage>
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input id="password" name="password" type="password" />
          <ErrorMessage>
            {errors.password && <p>{errors.password}</p>}
          </ErrorMessage>
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input id="confirmPassword" name="confirmPassword" type="password" />
          <ErrorMessage>
            {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
          </ErrorMessage>
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
          <ErrorMessage>{errors.gender && <p>{errors.gender}</p>}</ErrorMessage>
        </div>
        <div>
          <input id="termsAccepted" name="termsAccepted" type="checkbox" />
          <label htmlFor="termsAccepted">
            I accept the Terms and Conditions
          </label>
          <ErrorMessage>
            {errors.termsAccepted && <p>{errors.termsAccepted}</p>}
          </ErrorMessage>
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
          <ErrorMessage>{errors.file && <p>{errors.file}</p>}</ErrorMessage>
        </div>
        <div>
          <div style={{ position: "relative", display: "flex" }}>
            <label htmlFor="country">Country:</label>
            <CountryInput />
          </div>
          <ErrorMessage>
            {errors.country && <p>{errors.country}</p>}
          </ErrorMessage>
        </div>
        <button type="submit" disabled={!isValid}>
          Submit
        </button>
      </form>
      <Preview />
    </>
  );
}
