import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import NotFound from "./pages/404.tsx";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Home from "./pages/Home.tsx";
import { Provider } from "react-redux";
import { store } from "./app/store.tsx";
import RequireAuth from "./features/auth/RequireAuth.tsx";
import { Auth0Provider } from "@auth0/auth0-react";
import Login from "./features/auth/Login.tsx";
import PersistLogin from "./features/auth/PersistLogin.tsx";
import Products from "./pages/Products.tsx";
import Orders from "./pages/Orders.tsx";
import Settings from "./pages/Settings.tsx";
import NewProduct from "./components/NewProduct.tsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditProduct from "./components/products/EditProduct.tsx";
import Categories from "./pages/Categories.tsx";
import Register from "./features/auth/Register.tsx";
import Unauthorized from "./pages/unauthorized.tsx";
import Order from "./pages/Order.tsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      {/*start- Public routes */}
      {/* <Route index={true} element={<Home />} /> */}
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />

      {/*end- Public routes */}

      {/*start- protected routes */}
      <Route element={<PersistLogin />}>
        <Route index={true} element={<Home />} />
        <Route
          element={
            <RequireAuth
              allowedRoles={[`${import.meta.env.VITE_ADMIN_ROLE}`]}
            />
          }
        >
          <Route path="products">
            <Route index={true} element={<Products />} />
            <Route path="edit/:id" element={<EditProduct />} />
            <Route path="new" element={<NewProduct />} />
          </Route>
          <Route path="categories" element={<Categories />} />
          <Route path="orders">
            <Route index={true} element={<Orders />} />
            <Route path=":id" element={<Order />} />
          </Route>
          <Route path="settings" element={<Settings />} />
        </Route>
      </Route>
      {/*end- protected routes */}
      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);
console.log(window.location.origin + "/profile");
ReactDOM.createRoot(document.getElementById("root")!).render(
  <>
    <Provider store={store}>
      <ToastContainer
        theme="dark"
        position="top-center"
        stacked
        draggable
        draggablePercent={60}
      />
        <RouterProvider router={router} />
    </Provider>
  </>
);
