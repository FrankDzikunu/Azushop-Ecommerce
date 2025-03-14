import { Link } from "react-router-dom";
import "./ProductGrid.css";
import { FaRegHeart, FaShoppingCart, FaEye} from "react-icons/fa";

const ProductGrid = () => {
  const products = [
    {
      id: 1,
      name: "Apple MacBook Pro 2019 | 16\"",
      specs: "RAM 16 GB | Memory 512 GB | Keyboard layout Eng (English)",
      price: "$749.99",
      brand: "Apple",
      image: "/images/macbook.png",
    },
    {
      id: 2,
      name: "Apple MacBook Pro 2020 | 13.3\" Touch Bar",
      specs: "RAM 16 GB | Memory 512 GB | Keyboard layout Eng (English)",
      price: "$949.99",
      brand: "Apple",
      image: "/images/Apple MacBook.png",
    },
    {
      id: 3,
      name: "HP EliteBook 840 G5 | i5-8350U | 14\"",
      specs: "8 GB | 128 GB SSD | Backlit keyboard | Webcam | Win 11 Pro | Silver",
      price: "$349.99",
      brand: "HP",
      image: "/images/HP laptop.png",
    },
    {
      id: 4,
      name: "iPhone 15",
      specs: "128 GB | Dual SIM | Blue | Unlocked",
      price: "$449.99",
      brand: "Apple",
      image: "/images/iphone.png",
    },
    {
      id: 5,
      name: "Samsung Galaxy S22 Ultra 5G",
      specs: "8GB | 128 GB | Dual-SIM | Phantom Black",
      price: "$449.99",
      brand: "Samsung",
      image: "/images/samsung.png",
    },
    {
      id: 6,
      name: "Lenovo Thinkpad T14 G1 | i7-10610U | 14\"",
      specs: "16 GB | 512 GB SSD | Backlit keyboard | FP | Win 11 Home | ND",
      price: "$649.99",
      brand: "Lenovo",
      image: "/images/lenovo.png",
    },
    {
      id: 7,
      name: "Sony Alpha 7 II with 28-70mm zoom lens, 24.2MP~ 35mm",
      specs: "Full-frame Exmor R CMOS sensor with 24.2 MP for BIONZ",
      price: "$449.99",
      brand: "Sony",
      image: "/images/camera.png",
    },
    {
      id: 8,
      name: "Samsung Galaxy S22 Ultra 5G",
      specs: "8GB | 128 GB | Dual-SIM | Phantom Black",
      price: "$449.99",
      brand: "Samsung",
      image: "/images/samsung.png",
    },
    {
      id: 9,
      name: "iPad 9 (2021) | 10.2\"",
      specs: "64GB | Silver",
      price: "$449.99",
      brand: "Apple",
      image: "/images/ipad.png",
    },
  ];

  return (
    <div>
      <nav className="breadcrumb">Home / <span className="active">Shop</span></nav>
    <div className="product-grid-container">
      <div className="product-layout">
        {/* Sidebar */}
        <aside className="sidebar">
          <div className="sidebar-category">
            <h3>Shop By</h3>
            <p><strong>Product Categories</strong></p>
            <label><input type="checkbox" /> Laptops (4)</label>
            <label><input type="checkbox" /> Phones (3)</label>
            <label><input type="checkbox" /> Cameras (2)</label>
            <label><input type="checkbox" /> Watches (3)</label>
          </div>

          <div className="sidebar-brand">
            <p><strong>Brand</strong></p>
            <label><input type="checkbox" /> Apple</label>
            <label><input type="checkbox" /> Samsung</label>
            <label><input type="checkbox" /> Lenovo</label>
            <label><input type="checkbox" /> Sony</label>
          </div>

          <div className="sidebar-price">
            <p><strong>Price</strong></p>
            <input type="text" placeholder="Enter price" className="price-input" />
            <button className="reset-btn">Reset</button>
          </div>
        </aside>

        {/* Product Grid */}
        <Link to="/productdetails"> 
        <div className="product-grid">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <div className="product-brand">{product.brand}</div>
              <img src={product.image} alt={product.name} className="product-image" />
              <h3 className="product-name">{product.name}</h3>
              <p className="product-specs">{product.specs}</p>
              <span className="product-price">{product.price}</span>
              <div className="product-actions">
                <FaRegHeart className="icon" />
                <FaShoppingCart className="icon" />
                <FaEye className="icon" />
              </div>
            </div>
          ))}
        </div> 
        </Link>
      </div>
    </div>
    </div>
  );
};

export default ProductGrid;
