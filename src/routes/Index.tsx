import { Link } from "react-router-dom";
import Preview from "../components/Preview";

export default function Index() {
  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ color: "coral", margin: "0 auto" }}>
        styling is not a requirement
      </h2>
      <br />
      <ul style={{ listStyle: "none" }}>
        <li>
          <Link to="/uncontrolled">uncontrolled form</Link>
        </li>
        <li>
          <Link to="/controlled">controlled form</Link>
        </li>
      </ul>
      <div>
        <Preview />
      </div>
    </div>
  );
}
