
import React from 'react'
import './Shop.css'
import Navbar from '../components/Navbar'
import ShopHeader from '../components/ShopHeader'
import Footer from '../components/Footer'
import Favourite from '../components/Favourite'

const favourite = () => {
  return (
    <div>
      <Navbar />
      <ShopHeader />
      <div className="Page-header">
      <h1>Favourite</h1>
      <p></p>
      </div>
      <Favourite />
      <Footer />
    </div>
  )
}

export default favourite
