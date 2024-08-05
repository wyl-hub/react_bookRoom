import Home from "../pages/Home"
import ErrorPage from "../pages/ErrorPage"
import Login from "../pages/Login"
import Register from "../pages/Register"
import UpdateInfo from "../pages/UpdateInfo"
import UpdatePassword from "../pages/UpdatePassword"
import UserManager from "../pages/UserManager"
import MeetManager from "../pages/meetManager"

const routes = [
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/updateInfo',
        element: <UpdateInfo />
      },
      {
        path: '/updatePassword',
        element: <UpdatePassword />
      },
      {
        path: '/meetManager',
        element: <MeetManager />
      },
      {
        path: '/userManager',
        element: <UserManager />
      },
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
