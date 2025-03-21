import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import Favourite from "./pages/Favourite";
import Checkout from "./pages/Checkout";
import "./App.css";
import ProductDetails from "./pages/ProductDetails";
import AdminProductsPage from "./pages/AdminProductsPage";
import AdminCreateProductPage from "./pages/AdminCreateProductPage";
import AdminProductDetailsPage from "./pages/AdminProductDetailsPage";
import AdminCategoryPage from "./pages/AdminCategoryPage";
import Profile from "./pages/Profile";
import AdminUsersPage from "./pages/AdminUsersPage";
import AdminOrdersPage from "./pages/AdminOrdersPage";
import AdminOrderDetailsPage from "./pages/AdminOrderDetailsPage";
import MyOrders from "./pages/MyOrders";
import MyOrdersDetails from "./pages/MyOrdersDetails";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/favourite" element={<Favourite />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/productdetails/:id" element={<ProductDetails />} />
      <Route path="/admin/products" element={<AdminProductsPage />} />
      <Route path="/admin/createproduct" element={<AdminCreateProductPage />} />
      <Route path="/admin/updateproduct/:id" element={<AdminProductDetailsPage />} />
      <Route path="/admin/categories" element={<AdminCategoryPage />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/admin/users" element={<AdminUsersPage />} />
      <Route path="/admin/orders" element={<AdminOrdersPage />} />
      <Route path="/admin/orders/:id" element={<AdminOrderDetailsPage />} />
      <Route path="/admin/myorders/:id" element={<MyOrders />} />
      <Route path="/admin/viewmyorder/:id" element={<MyOrdersDetails />} />
    </Routes>
  );
}

export default App;
