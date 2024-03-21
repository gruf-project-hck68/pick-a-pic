import { Layout } from "./components";
import { Home, Register, Login, Collection, MyCollection, MyProfile } from "./pages";
import ThemeProvider from "./context/ThemeContext.jsx";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  redirect,
  Navigate,
} from "react-router-dom";
import { UpdateProfile } from "./pages/UpdateProfile.jsx";
MyCollection;

const router = createBrowserRouter([
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
    loader: () => {
      if (localStorage.access_token) {
        return redirect("/home");
      }
      return null;
    },
  },
  {
    element: <Layout />,
    loader: () => {
      if (localStorage.access_token) {
        return null;
      }
      return redirect("/login");
    },
    children: [
      {
        path: "/",
        element: <Home />,
      },
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
      {
        path: "/my-profile",
        element: <MyProfile />
      },
      {
        path: "/update-profile",
        element: <UpdateProfile />
      }
    ],
  },
  {
    path: "/login",
    element: <Login />,
    loader: () => {
      if (localStorage.access_token) {
        return redirect("/home");
      }
      return null;
    },
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
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </>
  );
}

export default App;
