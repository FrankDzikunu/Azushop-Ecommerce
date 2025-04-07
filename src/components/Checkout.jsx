import React, { useState, useEffect } from "react";
import API, { BASE_URL } from "../api";
import Swal from "sweetalert2";
import "./Checkout.css";


const Checkout = () => {
  const [cartItems, setCartItems] = useState([]);
  const [billingDetails, setBillingDetails] = useState({
    address: "",
    city: "",
    postalCode: "",
    country: "",
  });
  const [tax, setTax] = useState(0);
  const [shippingFee, setShippingFee] = useState(0);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");

  // Retrieve token from localStorage like in AdminProducts.jsx
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const token = storedUser?.access;

  useEffect(() => {
    const fetchCartAndCheckoutDetails = async () => {
      try {
        const cartResponse = await API.get(`/api/cart/`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
          withCredentials: true,
        });
        setCartItems(cartResponse.data);
        
        const checkoutResponse = await API.get(`/api/orders/checkout-details/`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
          withCredentials: true,
        });
        setTax(checkoutResponse.data.tax);
        setShippingFee(checkoutResponse.data.shippingFee);
        setPaymentMethods(checkoutResponse.data.paymentMethods);
        // Set default selected payment method to the first option
        if (checkoutResponse.data.paymentMethods && checkoutResponse.data.paymentMethods.length > 0) {
          setSelectedPaymentMethod(checkoutResponse.data.paymentMethods[0]);
        }
      } catch (error) {
        console.error("Error fetching checkout details:", error);
        Swal.fire("Error", "Failed to load checkout details. Please log in again.", "error");
      }
    };
  
    if (token) {
      fetchCartAndCheckoutDetails();
    } else {
      Swal.fire("Login Required", "You need to log in to proceed.", "warning");
    }
  }, [token]);

  // Calculate subtotal and total price
  const subtotal = cartItems.reduce(
    (acc, item) =>
      acc + parseFloat(item.product_detail.price) * item.quantity,
    0
  );
  const total = subtotal + tax + shippingFee;

  // Handle input change for billing details
  const handleChange = (e) => {
    setBillingDetails({ ...billingDetails, [e.target.name]: e.target.value });
  };

  // Place order function using SweetAlert2
  const placeOrder = async () => {
    const orderData = {
      items: cartItems.map((item) => ({
        product_id: item.product_detail.id,
        quantity: item.quantity,
      })),
      address: billingDetails.address,
      city: billingDetails.city,
      postal_code: billingDetails.postalCode, // backend expects "postal_code"
      country: billingDetails.country,
      payment_method: selectedPaymentMethod, // now from user selection
    };

    try {
      await API.post(`/api/orders/create/`, orderData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      Swal.fire("Success", "Order placed successfully!", "success");
      // Clear the cart items from frontend after successful order
      setCartItems([]);
    } catch (error) {
      console.error("Error placing order:", error);
      Swal.fire("Error", "Failed to place order. Try again.", "error");
    }
  };

  return (
    <div className="checkout-container">
      <nav className="breadcrumb">
        Home / <span className="active">Cart</span>
      </nav>

      <div className="checkout-content">
        {/* Billing Details Section */}
        <div className="billing-section">
          <h3>Billing Details</h3>
          <form className="billing-form">
            <input
              type="text"
              name="address"
              placeholder="Address *"
              value={billingDetails.address}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="city"
              placeholder="City"
              value={billingDetails.city}
              onChange={handleChange}
            />
            <input
              type="text"
              name="postalCode"
              placeholder="Postal code"
              value={billingDetails.postalCode}
              onChange={handleChange}
            />
            <input
              type="text"
              name="country"
              placeholder="Country"
              value={billingDetails.country}
              onChange={handleChange}
            />
          </form>
        </div>

        {/* Products & Summary Section */}
        <div className="summary-section">
          <h3>Products</h3>
          <div className="summary-box">
            {cartItems.map((item) => (
              <div className="product-item" key={item.id}>
                <img
                  src={`${BASE_URL}${item.product_detail.image}`}
                  alt={item.product_detail.name}
                  className="productimage"
                />
                <div className="productinfo">
                  <p className="producttitle">{item.product_detail.name}</p>
                  <p className="ProductBrand">
                    Brand: <span>{item.product_detail.brand}</span>
                  </p>
                  <p className="productprice">
                    ${parseFloat(item.product_detail.price).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}

            <div className="pricingdetails">
              <h2>Shipping</h2>
              <p>Shipping fees: <span>${shippingFee.toFixed(2)}</span></p>
              <p>Tax: <span>${tax.toFixed(2)}</span></p>
            </div>

            <div className="pricingtotal">
              <p className="total">Total: <span>${total.toFixed(2)}</span></p>
            </div>

            {/* Payment Method Section */}
            <div className="payment-method">
              <h4>Select Payment Method</h4>
              {paymentMethods.map((method, index) => (
                <label key={index}>
                  <input
                    type="radio"
                    name="payment"
                    value={method}
                    checked={selectedPaymentMethod === method}
                    onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                  />{" "}
                  {method}
                </label>
              ))}
            </div>

            {/* Place Order Button */}
            <button className="place-order-btn" onClick={placeOrder}>
              Place order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
