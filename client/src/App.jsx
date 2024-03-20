import { Layout } from "./components";
import { Register, Login, Home } from "./pages/index";
import ThemeProvider from "./context/ThemeContext.jsx";


import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  redirect,
  Navigate,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/register",
    element: (
      <>
        <Register />
      </>
    ),
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
        path: "/home",
        element: (
          <>
            <Home />
          </>
        ),
      },
      {
        path: "/",
        element: (
          <>
            <Home />
          </>
        ),
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
      ,
    </>
  );
}

export default App;
