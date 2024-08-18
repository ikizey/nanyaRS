import { useSelector } from "react-redux";
import { RootState } from "../store";
import HighlightedChange from "./HighlightedChange";

export default function Preview() {
  const data = useSelector((state: RootState) => state.forms.formData);

  if (!data) return null;

  return (
    <div>
      <hr />
      <h2>Submission Preview</h2>
      <div>
        <HighlightedChange changed={data.name.changed}>
          <strong>Name:</strong> {data.name.value}
        </HighlightedChange>
        <HighlightedChange changed={data.age.changed}>
          <strong>Age:</strong> {data.age.value}
        </HighlightedChange>
        <HighlightedChange changed={data.email.changed}>
          <strong>Email:</strong> {data.email.value}
        </HighlightedChange>
        <HighlightedChange changed={data.gender.changed}>
          <strong>Gender:</strong> {data.gender.value}
        </HighlightedChange>
        <HighlightedChange changed={data.termsAccepted.changed}>
          <strong>Terms Accepted:</strong>{" "}
          {data.termsAccepted.value ? "Yes" : "No"}
        </HighlightedChange>
        <HighlightedChange changed={data.password.changed}>
          <strong>Password:</strong> {data.password.value}
        </HighlightedChange>
        <HighlightedChange changed={data.confirmPassword.changed}>
          <strong>Confirm Password:</strong> {data.confirmPassword.value}
        </HighlightedChange>
        {data.imageBase64?.value && (
          <HighlightedChange changed={data.imageBase64.changed}>
            <strong>Uploaded Image:</strong>
            <br />
            <img src={data.imageBase64.value} alt="" />
          </HighlightedChange>
        )}
        <HighlightedChange changed={data.country.changed}>
          <strong>Country:</strong> {data.country.value}
        </HighlightedChange>
      </div>
    </div>
  );
}
