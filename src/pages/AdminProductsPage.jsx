
import React from 'react'
import './Shop.css'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import AdminProducts from '../components/AdminProducts'

const adminProducts = () => {
  return (
    <div>
      <Navbar />
      <AdminProducts/>
      <Footer />
    </div>
  )
}

export default adminProducts
