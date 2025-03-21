import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "./ProductDetails.css";
import { FaRegHeart, FaShoppingCart, FaEye } from "react-icons/fa";

const ProductDetails = () => {
  const { id } = useParams();

  const [activeTab, setActiveTab] = useState("related");

  const product = {
    name: "Apple MacBook Pro 2019 | 16\"",
    brand: "Apple",
    ram: "16 GB",
    memory: "512 GB",
    keyboard: "Eng (English)",
    price: "$749.99",
    stock: "In stock",
    rating: 4,
    reviews: 1,
    image: "/images/macbook.png",
  };

  const relatedProducts = [
    { name: "Apple MacBook Pro 2019 | 16\"", price: "$749.99", image: "/images/macbook.png", brand: "Apple", description: "RAM 16.0 GB | Memory 512 GB Keyboard layout Eng (English)"  },
    { name: "Apple MacBook Pro 2020 | 13.3\" Touch Bar", price: "$949.99", image: "/images/Apple MacBook.png", brand: "Apple", description: "RAM 16.0 GB | Memory 512 GB Keyboard layout Eng (English)" },
    { name: "HP EliteBook 840 G5 | i5-8350U | 14\"", price: "$349.99", image: "/images/HP laptop.png", brand: "HP", description: "RAM 16.0 GB | Memory 512 GB Keyboard layout Eng (English)" },
  ];

  const reviews = [
    {
      name: "John Doe",
      rating: 4,
      comment: "Experience exceptional clarity and precision",
      date: "August 6, 2024",
    },
    {
      name: "John Doe",
      rating: 3,
      comment: "Experience exceptional clarity and precision",
      date: "August 6, 2024",
    },
  ];

  return (
    <div className="product-details">
      <nav className="breadcrumb">
        <a href="/">Home</a> / <a href="/laptop">laptop</a> / {product.name}
      </nav>

      <div className="product-container">
        <img src={product.image} alt={product.name} className="product_image" />
        <div className="product-info">
          <p>Brand: <strong>{product.brand}</strong></p>
          <h1>{product.name}</h1>
          <p><strong>RAM:</strong> {product.ram} | <strong>Memory:</strong> {product.memory}</p>
          <p><strong>Keyboard:</strong> {product.keyboard}</p>
          <p className="price">{product.price}</p>
          <p className="stock">{product.stock}</p>
          <div className="straigthline"></div>

          <select className="quantity">
            <option>1</option>
            <option>2</option>
            <option>3</option>
          </select>
          <button className="add-to-cart">Add to cart</button>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="tabs">
        <button className={activeTab === "related" ? "tab active" : "tab"} onClick={() => setActiveTab("related")}>
          Related Product
        </button>
        <button className={activeTab === "review" ? "tab active" : "tab"} onClick={() => setActiveTab("review")}>
          Write your Review
        </button>
        <button className={activeTab === "reviews" ? "tab active" : "tab"} onClick={() => setActiveTab("reviews")}>
          All Reviews
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === "related" && (
        <div className="related-products">
          {relatedProducts.map((p, index) => (
            <div key={index} className="product-card">
              <div className="product-brand">{p.brand}</div>
              <img src={p.image} alt={p.name} className="product-image"/>       
              <h3 className="product-name">{p.name}</h3>
              <p className="product-specs">{p.description}</p>
              <span className="product-price">${p.price}</span>
              <div className="product-actions">
                    <FaRegHeart
                      className="icon"
                    />
                    <FaShoppingCart
                      className="icon"
                    />
                    <Link to={`/productdetails/${product.id}`}>
                      <FaEye className="icon" style={{ color: "black" }} />
                    </Link>
                  </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "review" && (
        <div className="review-form">
          <label>Ratings</label>
          <select className="review-select">
            <option>Select</option>
            <option value="5">★★★★★</option>
              <option value="4">★★★★☆</option>
              <option value="3">★★★☆☆</option>
              <option value="2">★★☆☆☆</option>
              <option value="1">★☆☆☆☆</option>
          </select>

          <label>Comments</label>
          <textarea className="review-textarea" placeholder="Write your review..."></textarea>

          <button className="submit-button">Submit</button>
        </div>
      )}

      {activeTab === "reviews" && (
        <div className="all-reviews">
          {reviews.map((review, index) => (
            <div key={index} className="review-card">
              <p className="review-name">{review.name}</p>
              <p className="review-rating">
                {"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}
              </p>
              <p className="review-comment">{review.comment}</p>
              <p className="review-date">{review.date}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
