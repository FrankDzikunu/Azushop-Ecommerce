
import React from 'react'
import './Shop.css'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import AdminProductDetails from '../components/AdminProductDetails'

const adminProductDetails = () => {
  return (
    <div>
      <Navbar />
      <AdminProductDetails/>
      <Footer />
    </div>
  )
}

export default adminProductDetails
