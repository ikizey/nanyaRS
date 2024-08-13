import { useSelector } from "react-redux";
import { RootState } from "../store";

export default function Preview() {
  const data = useSelector((state: RootState) => state.forms.formData);

  if (!data) return null;

  return (
    <div>
      <hr />
      <h2>Submission Preview</h2>
      <div>
        <p>
          <strong>Name:</strong> {data.name}
        </p>
        <p>
          <strong>Age:</strong> {data.age}
        </p>
        <p>
          <strong>Email:</strong> {data.email}
        </p>
        <p>
          <strong>Gender:</strong> {data.gender}
        </p>
        <p>
          <strong>Terms Accepted:</strong> {data.termsAccepted ? "Yes" : "No"}
        </p>
        <p>
          <strong>Password:</strong> {data.password}
        </p>
        <p>
          <strong>Confirm Password:</strong> {data.confirmPassword}
        </p>
        {data.imageBase64 && (
          <div>
            <strong>Uploaded Image:</strong>
            <br />
            <img src={data.imageBase64} alt="" />
          </div>
        )}
      </div>
    </div>
  );
}
