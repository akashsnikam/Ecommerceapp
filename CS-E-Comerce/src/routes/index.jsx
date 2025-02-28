import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { Home } from "../pages/Home";
import { Login } from "../pages/Login";
import ForgotPassword from "../pages/ForgotPassword";
import SignUp from "../pages/SignUp";
import AdminPanel from "../pages/AdminPanel";
import AllUsers from "../pages/AllUsers";
import AllProducts from "../pages/AllProducts";
import CategoryProduct from "../pages/CategoryProduct";
import ProductDetails from "../pages/ProductDetails";
import Cart from "../pages/Cart";
import BayNow from "../pages/BayNow";
import SearchProduct from "../pages/SearchProduct";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home></Home>,
      },
      {
        path: "login",
        element: <Login></Login>,
      },
      {
        path: "forgot-password",
        element: <ForgotPassword></ForgotPassword>,
      },
      {
        path: "sign-up",
        element: <SignUp></SignUp>,
      },
      {
        path: "product-category",
        element: <CategoryProduct></CategoryProduct>,
      },
      {
        path: "product/:id",
        element: <ProductDetails></ProductDetails>,
      },
      {
        path: "cart",
        element: <Cart></Cart>,
      },
      {
        path: "payment",
        element: <BayNow></BayNow>,
      },
      {
        path: "search",
        element: <SearchProduct></SearchProduct>,
      },

      {
        path: "admin-panel",
        element: <AdminPanel></AdminPanel>,
        children: [
          {
            path: "all-users",
            element: <AllUsers></AllUsers>,
          },
          {
            path: "all-products",
            element: <AllProducts></AllProducts>,
          },
        ],
      },
    ],
  },
]);

export default router;
