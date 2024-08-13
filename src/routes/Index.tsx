import { Link } from "react-router-dom";

export default function Index() {
  return (
    <ul>
      <li>
        <Link to="/uncontrolled">uncontrolled form</Link>
      </li>
      <li>
        <Link to="/controlled">controlled form</Link>
      </li>
    </ul>
  );
}
