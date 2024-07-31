import { Link, Outlet } from "react-router-dom";

function Layout() {
  return (
    <div>
      <div>Layout hhh</div>
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
      <div>
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
