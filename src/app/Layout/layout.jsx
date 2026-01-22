import "react-toastify/dist/ReactToastify.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "../../pages/Login/login.jsx";
import DashboardLayout from "../../pages/DashBoardLayout/dashboard.jsx";
import DashBoard from "../../pages/Dashboard/dashboard.jsx";
import Error from "../../pages/Error/error.jsx";
import {
  AddProducts,
  GetOrderById,
  EditProducts,
  Order,
  Others,
  Products,
} from "../others/lazy/lazy";
import { Suspense } from "react";
import { ToastContainer } from "react-toastify";
import Loading from "../components/Layout/Loading/Loading.jsx";

export default function Layout() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/dashboard",
      element: <DashboardLayout />,
      children: [
        {
          index: true,
          element: <DashBoard />,
        },
        {
          path: "orders",
          element: <Order />,
        },
        {
          path: "others",
          element: <Others />,
        },
        {
          path: "products",
          element: <Products />,
        },
        {
          path: "addProduct",
          element: <AddProducts />,
        },
        {
          path: "editProduct/:id",
          element: <EditProducts />,
        },
        {
          path: "getOrderById/:id",
          element: <GetOrderById />,
        },
      ],
    },
    {
      path: "*",
      element: <Error />,
    },
  ]);
  return (
    <>
      <Suspense fallback={<Loading />}>
        <RouterProvider router={router} />
      </Suspense>
      <ToastContainer />
    </>
  );
}
