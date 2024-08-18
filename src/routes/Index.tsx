import { Link, Outlet } from "react-router-dom";
import Preview from "../components/Preview";

export default function Index() {
  return (
    <div>
      <ul>
        <li>
          <Link to="/uncontrolled">uncontrolled form</Link>
        </li>
        <li>
          <Link to="/controlled">controlled form</Link>
        </li>
      </ul>
      <div>
        <Outlet />
      </div>
      <div>
        <Preview />
      </div>
    </div>
  );
}
