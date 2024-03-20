import { Layout } from "./components";
import { Home, Register, Login, Collection, MyCollection } from "./pages";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  redirect,
  Navigate,
} from "react-router-dom";
MyCollection;

Layout;
const router = createBrowserRouter([
  {
    path: "*",
    element: <Navigate to="/home" replace />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
    // loader: () => {
    //   if (localStorage.access_token) {
    //     return redirect("/home");
    //   }
    //   return null;
    // },
  },
  {
    element: <Layout />,

    // loader: () => {
    //   if (!localStorage.access_token) {
    //     return redirect("/login");
    //   }
    //   return null;
    // },
    children: [
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/collections",
        element: <Collection />,
      },
      {
        path: "/my-collections",
        element: <MyCollection />,
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
