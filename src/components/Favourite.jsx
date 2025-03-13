import { FaShoppingCart, FaHeart, FaEye, FaTrash } from "react-icons/fa";
import "./Favourite.css";

const Favourite = () => {
  const favouriteItems = [
    {
      id: 1,
      name: "Apple MacBook Pro 2019 | 16\"",
      brand: "Apple",
      specs: "RAM 16.0 GB | Memory 512 GB | Keyboard layout Eng (English)",
      price: 749.99,
      image: "/images/macbook.png", 
    },
  ];

  return (
    <div className="favourite-container">
      <nav className="breadcrumb">
        Home / <span className="active">Favourite</span>
      </nav>

      <div className="favourite-content">
        {favouriteItems.map((item) => (
          <div key={item.id} className="product-card" style={{ width: "300px" }}>
            <span className="brand-label">{item.brand}</span>
            <img src={item.image} alt={item.name} className="product-image" />
            <p className="product-name">{item.name}</p>
            <p className="product-specs">{item.specs}</p>
            <p className="product-price">${item.price.toFixed(2)}</p>

            <div className="icon-buttons">
              <button className="icon-btn cart-btn">
                <FaShoppingCart />
              </button>
              <button className="icon-btn heart-btn">
                <FaHeart />
              </button>
              <button className="icon-btn eye-btn">
                <FaEye />
              </button>
              <button className="icon-btn trash-btn">
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favourite;
