import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import RootLayout from "./pages/RootLayout";
import Index from "./pages/Index";
import ErrorPage from "./pages/ErrorPage";
import Login from "./pages/Login";
import CircleLoading from "./util/CircleLoading";


const AddAdvertisment = React.lazy(() => import("./pages/AddAdvertisment"));
const EditAdvertisment = React.lazy(() => import("./pages/EditAdvertisment"));

const adParamHandler = ({ params }) => {
  if (isNaN(params.id)) {
    throw new Response("Bad Request", {
      statusText: "please make sure to insert correct post ID",
      status: 400,
    });
  }
};

const router = createBrowserRouter([
  { path: "login", element: <Login /> },
  {
    path: "/",
    element: (
      <Suspense fallback={<CircleLoading />}>
        <RootLayout />
      </Suspense>
    ),
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Index /> },
      { path: "advertisment", element: <Index /> },
      {
        path: "advertisment/add",
        element: (
          <Suspense fallback={<CircleLoading />}>
            <AddAdvertisment />
          </Suspense>
        ),
      },
      {
        path: "ads/:id/edit",
        element: (
          <Suspense fallback={<CircleLoading />}>
            <EditAdvertisment />
          </Suspense>
        ),
        loader: adParamHandler,
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
