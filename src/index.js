import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import store from "./store/RootStore";
import App from "./views/App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import About from "./views/About";
import ErrorPage from "./views/ErrorPage";
import MainLayout from "./layouts/MainLayout";
import Users from "./views/Users";
import "./index.scss";
import Blog from "./views/Blog";
import Post from "./views/Post";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "blog",
        element: <Blog />,
      },
      {
        path: "post/:id",
        element: <Post />,
      },
      {
        path: "users",
        element: <Users />,
      },
      {
        path: "about",
        element: <About />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
