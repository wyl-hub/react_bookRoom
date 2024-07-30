import { Link, Outlet } from "react-router-dom";

function Layout() {
  return (
    <div>
      <div>Layout hhh</div>
      <Link to="/aaa">Login</Link>
      <Link to="/bbb">Update</Link>
      <div>
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
