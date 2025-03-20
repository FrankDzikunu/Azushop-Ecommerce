
import React from 'react'
import './Shop.css'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import AdminOrders from '../components/AdminOrders'

const adminOrders = () => {
  return (
    <div>
      <Navbar />
      <AdminOrders/>
      <Footer />
    </div>
  )
}

export default adminOrders
