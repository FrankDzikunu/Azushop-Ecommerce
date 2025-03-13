import "./Checkout.css";

const Checkout = () => {
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
            <input type="text" placeholder="Address *" required />
            <input type="text" placeholder="City" />
            <input type="text" placeholder="Postal code" />
            <input type="text" placeholder="Country" />
          </form>
        </div>

        {/* Products & Summary Section */}
        <div className="summary-section">
          <h3>Products</h3>
          <div className="summary-box">
            <div className="product-item">
              <img
                src="/images/macbook.png" 
                alt="Apple MacBook Pro"
                className="productimage"
              />
              <div className="productinfo">
                <p className="producttitle">Apple MacBook Pro 2019 | 16"</p>
                <p className="ProductBrand">Brand: <span>Apple</span></p>
                <p className="productprice">$749.99</p>
              </div>
            </div>

            <div className="pricingdetails">
                <h2>Shipping</h2>
              <p>
                Shipping fees: <span>$0.00</span>
              </p>
              <p>
                Tax: <span>$10.00</span>
              </p>
              </div>

              <div className="pricingtotal">
              <p className="total">
                Total: <span>$759.99</span>
              </p>
              </div>
            

            {/* Payment Method */}
            <div className="payment-method">
              <h4>Select Method</h4>
              <label>
                <input type="radio" name="payment" defaultChecked /> Paypal or
                credit card
              </label>
            </div>

            {/* Place Order Button */}
            <button className="place-order-btn">Place order</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
