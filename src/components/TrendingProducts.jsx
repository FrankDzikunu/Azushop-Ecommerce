import React from "react";
import "./TrendingProducts.css";
import macbookImage from "../assets/macbook.png";
import iphoneImage from "../assets/iphone.png";
import cameraImage from "../assets/camera.png";

const TrendingProducts = () => {
  const products = [
    { name: "Macbook", description: "Up to 50% off laptop", image: macbookImage },
    { name: "Iphones", description: "Free shipping", image: iphoneImage },
    { name: "Digital Lens", description: "Up to 40% off Camera", image: cameraImage },
  ];

  return (
    <section className="trending-products">
      <h2>Top Trending Products</h2>
      <p>Discover the latest must-have items that are taking the market by storm. 
        Stay ahead with our curated collection
      of trending products designed to elevate your lifestyle.</p>
      <div className="productgrid">
        {products.map((product, index) => (
          <div key={index} className="productcard">
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <img src={product.image} alt={product.name} />
            <button className="Shop-Now">Shop now →</button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TrendingProducts;