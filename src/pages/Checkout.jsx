
import React from 'react'
import './Shop.css'
import Navbar from '../components/Navbar'
import ShopHeader from '../components/ShopHeader'
import Footer from '../components/Footer'
import Checkout from '../components/Checkout'


const checkout = () => {
  return (
    <div>
      <Navbar />
      <ShopHeader />
      <div className="Page-header">
      <h1>Checkout</h1>
      <p></p>
      </div>
      <Checkout />
      <Footer />
    </div>
  )
}

export default checkout
