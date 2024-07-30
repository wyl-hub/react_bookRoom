import Layout from "../components/Layout";
import ErrorPage from "../pages/ErrorPage";
import Login from "../pages/Login";
import UpdateInfo from "../pages/UpdateInfo";


const routes = [
    {
      path: "/",
      element: <Layout/>,
      errorElement: <ErrorPage/>,
      children: [
        {
          path: "aaa",
          element: <Login />,
        },
        {
          path: "bbb",
          element: <UpdateInfo />,
        }    
      ],
    }
  ];

  export default routes