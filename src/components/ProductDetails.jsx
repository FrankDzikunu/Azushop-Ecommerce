import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "./ProductDetails.css";
import { FaHeart, FaShoppingCart, FaEye } from "react-icons/fa";
import API from "../api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const ProductDetails = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("related");
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [reviewForm, setReviewForm] = useState({ rating: "", comment: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState(new Set());
  const [cart, setCart] = useState(new Set());

  // Check if user is logged in and get token
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const token = storedUser?.access;

  useEffect(() => {
    if (token) {
      fetchFavorites();
      fetchCart();
    }
  }, [token]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch product details
        const productRes = await API.get(`/api/products/${id}/`);
        setProduct(productRes.data);

        // Fetch related products
        const relatedRes = await API.get(`/api/products/${id}/related/`);
        setRelatedProducts(relatedRes.data);

        // Fetch all reviews for the product
        const reviewsRes = await API.get(`/api/products/${id}/reviews/`);
        setReviews(reviewsRes.data);
      } catch (err) {
        setError("Error fetching product details");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleReviewChange = (e) => {
    setReviewForm({ ...reviewForm, [e.target.name]: e.target.value });
  };

  const handleReviewSubmit = async () => {
    if (!token) {
      toast.warning("You must log in to submit a review", { position: "top-right", autoClose: 3000 });
      return;
    }
    try {
      const res = await API.post(
        `/api/products/${id}/review/`,
        reviewForm,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Review submitted successfully", { position: "top-right", autoClose: 3000 });
      // Refresh reviews list after submission
      const reviewsRes = await API.get(`/api/products/${id}/reviews/`);
      setReviews(reviewsRes.data);
      setReviewForm({ rating: "", comment: "" });
    } catch (err) {
      toast.error("Failed to submit review, You must purchase the product to review it ", { position: "top-right", autoClose: 3000 });
      console.error(err);
    }
  };

  const handleAddToCart = async () => {
    if (!token) {
      toast.warning("Please log in to add to cart", { position: "top-right", autoClose: 3000 });
      return;
    }
    try {
      await API.post(
        `/api/cart/${id}/`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Product added to cart", { position: "top-right", autoClose: 3000 });
      const updatedCart = new Set(cart);
      updatedCart.add(id);
      setCart(updatedCart);
      // Dispatch event to update Navbar counts
      window.dispatchEvent(new Event("updateCounts"));
    } catch (err) {
      toast.error("Failed to add product to cart", { position: "top-right", autoClose: 3000 });
      console.error(err);
    }
  };

    // Fetch favorites from backend
    const fetchFavorites = async () => {
      try {
        const response = await API.get(`/api/favorites/`, {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });
        setFavorites(new Set(response.data.map((fav) => fav.product)));
      } catch (error) {
        console.error("Error fetching favorites:", error);
      }
    };
  
    // Fetch cart from backend
    const fetchCart = async () => {
      try {
        const response = await API.get(`/api/cart/`, {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });
        setCart(new Set(response.data.map((item) => item.product)));
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };

    // Toggle favorite (add/remove)
    const toggleFavorite = async (productId) => {
      if (!token) {
        toast.warning("You must log in to add products to favorites!", {
          position: "top-right",
          autoClose: 3000,
        });
        return;
      }
      try {
        let updatedFavorites;
        if (favorites.has(productId)) {
          await API.delete(`/api/favorites/${productId}/`, {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
          });
          updatedFavorites = new Set(favorites);
          updatedFavorites.delete(productId);
        } else {
          await API.post(`/api/favorites/${productId}/`, {}, {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
          });
          updatedFavorites = new Set(favorites);
          updatedFavorites.add(productId);
        }
        setFavorites(updatedFavorites);
        // Dispatch custom event so Navbar updates counts immediately
        window.dispatchEvent(new Event("updateCounts"));
      } catch (error) {
        console.error("Error updating favorites:", error);
      }
    };
  
    // Add product to cart
    const addToCart = async (productId) => {
      if (!token) {
        toast.warning("You must log in to add products to cart!", {
          position: "top-right",
          autoClose: 3000,
        });
        return;
      }
      try {
        if (!cart.has(productId)) {
          await API.post(`/api/cart/${productId}/`, {}, {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
          });
          const updatedCart = new Set(cart);
          updatedCart.add(productId);
          setCart(updatedCart);
          // Dispatch event to update Navbar counts
          window.dispatchEvent(new Event("updateCounts"));
        }
      } catch (error) {
        console.error("Error adding to cart:", error);
      }
    };

  if (loading) return             
          <div className="loading-container">
          <img
            src="/load-35_256.gif" 
            alt="Loading..."
            className="loading-gif"
          />
          <p>Loading product details...</p>
        </div>;
  if (error) return <div>{error}</div>;
  if (!product) return <div>No product found</div>;

  return (
    <div className="product-details">
      <ToastContainer />
      <nav className="breadcrumb">
        <Link to="/">Home</Link> /{" "}
        {product.category_name} /{" "}
        {product.name}
      </nav>

      <div className="product-container">
        <img src={product.image} alt={product.name} className="product_image" />
        <div className="product-info">
          <p >
            <span className="product_brand">Brand:</span> <strong>{product.brand} <span className="product-rating"> 
              {"★".repeat(product.rating)}{"☆".repeat(5 - product.rating)}</span> ({product.num_reviews} reviews)
              </strong>
          </p>
          <h1>{product.name}</h1>
          <p className="product-description">
           {product.description}
          </p>
          <p className="price">${product.price}</p>
          <p className="stock">{product.stock || "In stock"}</p>
          <div className="straigthline"></div>

          <select className="quantity">
            {[...Array(product.count_in_stock || 10).keys()].map((num) => (
              <option key={num + 1} value={num + 1}>
                {num + 1}
              </option>
            ))}
          </select>
          <button className="add-to-cart" onClick={handleAddToCart}>
            Add to cart
          </button>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="tabs">
        <button
          className={activeTab === "related" ? "tab active" : "tab"}
          onClick={() => setActiveTab("related")}
        >
          Related Product
        </button>
        <button
          className={activeTab === "review" ? "tab active" : "tab"}
          onClick={() => setActiveTab("review")}
        >
          Write your Review
        </button>
        <button
          className={activeTab === "reviews" ? "tab active" : "tab"}
          onClick={() => setActiveTab("reviews")}
        >
          All Reviews
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === "related" && (
        <div className="related-products">
          {relatedProducts.map((p) => (
            <div key={p.id} className="product-card">
              <div className="product-brand">{p.brand}</div>
              <img src={p.image} alt={p.name} className="product-image" />
              <h3 className="product-name">{p.name}</h3>
              <p className="product-specs">{p.description}</p>
              <span className="product-price">${p.price}</span>
                  <div className="product-actions">
                    <FaHeart
                      className="icon"
                      onClick={() => toggleFavorite(p.id)}
                      style={{ color: favorites.has(p.id) ? "red" : "grey" }}
                    />
                    <FaShoppingCart
                      className="icon"
                      onClick={() => addToCart(p.id)}
                      style={{ color: cart.has(p.id) ? "green" : "grey" }}
                    />
                    <Link to={`/productdetails/${p.id}`}>
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
          <select
            className="review-select"
            name="rating"
            value={reviewForm.rating}
            onChange={handleReviewChange}
          >
            <option value="">Select</option>
            <option value="5">★★★★★</option>
            <option value="4">★★★★☆</option>
            <option value="3">★★★☆☆</option>
            <option value="2">★★☆☆☆</option>
            <option value="1">★☆☆☆☆</option>
          </select>

          <label>Comments</label>
          <textarea
            className="review-textarea"
            name="comment"
            placeholder="Write your review..."
            value={reviewForm.comment}
            onChange={handleReviewChange}
          ></textarea>

          <button className="submit-button" onClick={handleReviewSubmit}>
            Submit
          </button>
        </div>
      )}

      {activeTab === "reviews" && (
        <div className="all-reviews">
          {reviews.map((review, index) => (
            <div key={index} className="review-card">
              <p className="review-name">{review.user_name}</p>
              <p className="review-rating">
                {"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}
              </p>
              <p className="review-comment">{review.comment}</p>
              <p className="review-date">
              {new Date(review.created_at).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
