import { Layout } from "./components";
import { Register, Login } from "./pages/index";

import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  redirect,
  Navigate,
} from "react-router-dom";

Layout;
const router = createBrowserRouter([
  {
    path: "*",
    element: <Navigate to="/home" replace />,
  },
  {
    path: "/register",
    element: (
      <>
        <Register />
      </>
    ),
  },
  {
    path: "/login",
    element: (
      <>
        <Login />
      </>
    ),
    // loader: () => {
    //   if (localStorage.access_token) {
    //     return redirect("/home");
    //   }
    //   return null;
    // },
  },
  {
    element: (
      <>
        <Layout />
      </>
    ),
    // loader: () => {
    //   if (!localStorage.access_token) {
    //     return redirect("/login");
    //   }
    //   return null;
    // },
    children: [
      {
        path: "/home",
        element: <>{/* <Home /> */}</>,
      },
      {
        path: "/posts",
        element: <>{/* <Posts /> */}</>,
      },
      {
        path: "/my-posts",
        element: <>{/* <MyPosts /> */}</>,
      },
    ],
  },
  {
    path: "/logout",
    loader: () => {
      localStorage.clear();
      return redirect("/login");
    },
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
