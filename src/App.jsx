import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import Favourite from "./pages/Favourite";
import Checkout from "./pages/Checkout";
import "./App.css";
import ProductDetails from "./pages/ProductDetails";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/favourite" element={<Favourite />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/productdetails" element={<ProductDetails />} />
    </Routes>
  );
}

export default App;
