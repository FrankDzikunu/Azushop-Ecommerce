
import React from 'react'
import './Shop.css'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import AdminCategory from '../components/AdminCategory'

const adminCategory = () => {
  return (
    <div>
      <Navbar />
      <AdminCategory/>
      <Footer />
    </div>
  )
}

export default adminCategory
