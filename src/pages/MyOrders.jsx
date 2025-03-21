
import React from 'react'
import './Shop.css'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import MyOrders from '../components/MyOrders'

const myOrders = () => {
  return (
    <div>
      <Navbar />
      <MyOrders/>
      <Footer />
    </div>
  )
}

export default myOrders
