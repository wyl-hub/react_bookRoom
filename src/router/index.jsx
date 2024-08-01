import Home from "../pages/Home"
import ErrorPage from "../pages/ErrorPage"
import Login from "../pages/Login"
import Register from "../pages/Register"
import UpdateInfo from "../pages/UpdateInfo"
import UpdatePassword from "../pages/UpdatePassword"

const routes = [
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/updateInfo',
        element: <UpdateInfo />
      }
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  }
]

export default routes
