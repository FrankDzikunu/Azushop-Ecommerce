
import React from 'react'
import './Shop.css'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import AdminCreateProduct from '../components/AdminCreateProduct'

const adminCreateProducts = () => {
  return (
    <div>
      <Navbar />
      <AdminCreateProduct/>
      <Footer />
    </div>
  )
}

export default adminCreateProducts
