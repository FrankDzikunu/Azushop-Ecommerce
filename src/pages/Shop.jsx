
import React from 'react'
import './Shop.css'
import Navbar from '../components/Navbar'
import ShopHeader from '../components/ShopHeader'
import Footer from '../components/Footer'
import ProductGrid from '../components/ProductGrid'

const Shop = () => {
  return (
    <div>
      <Navbar />
      <ShopHeader />
      <div className="Page-header">
      <h1>New Arrival</h1>
      <p>Shop through our latest selection of Products</p>
      </div>
      <ProductGrid />
      <Footer />
    </div>
  )
}

export default Shop
