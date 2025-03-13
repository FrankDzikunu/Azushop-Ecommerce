
import React from 'react'
import Navbar from '../components/Navbar'
import ShopHeader from '../components/ShopHeader'
import Footer from '../components/Footer'
import Cart from '../components/Cart'


const cart = () => {
  return (
    <div>
      <Navbar />
      <ShopHeader />
      <div className="Page-header">
      <h1>Cart</h1>
      <p></p>
      </div>
      <Cart />
      <Footer />
    </div>
  )
}

export default cart
