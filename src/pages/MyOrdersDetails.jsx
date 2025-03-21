
import React from 'react'
import './Shop.css'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import MyOrderDetails from '../components/MyOrdersDetails'

const myOrderDetailsPage = () => {
  return (
    <div>
      <Navbar />
      <MyOrderDetails />
      <Footer />
    </div>
  )
}

export default myOrderDetailsPage
