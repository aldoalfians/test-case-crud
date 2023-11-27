// import { useDispatch, useSelector } from "react-redux";
import { useAppDispatch, useAppSelector } from "../src/app/hooks";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";

import "./App.css";
import "./styles/dashboard.css";
import "./styles/login.css";
import Dashboard from "./components/main-layout/Dashboard";
import { LoginUser } from "./features/users/authSlice";
import { useEffect } from "react";
import LoginPage from "./app/LoginPage";
import ProductPage from "./app/admin/product/ProductPage";
import { AdminRoute, CustomerRoute, GuestRoute } from "./middlewares/AuthRoute";
import AdminPage from "./app/admin/AdminPage";
import CustomerPage from "./app/customer/CustomerPage";
import AddProduct from "./app/admin/product/AddProduct";
import EditProduct from "./app/admin/product/EditProduct";
import CategoryPage from "./app/admin/product/category/CategoryPage";
import AddCategory from "./app/admin/product/category/AddCategory";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AdminRoute />}>
          <Route path="/admin">
            <Route index element={<AdminPage />} />
            <Route path="product" element={<ProductPage />} />
            <Route path="product/add" element={<AddProduct />} />
            <Route path="product/:id" element={<EditProduct />} />

            <Route path="category" element={<CategoryPage />} />
            <Route path="category/add" element={<AddCategory />} />
          </Route>
        </Route>

        <Route element={<CustomerRoute />}>
          <Route path="/" element={<CustomerPage />} />
        </Route>

        <Route element={<GuestRoute />}>
          <Route path="/login" element={<LoginPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
