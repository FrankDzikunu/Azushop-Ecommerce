
import React from 'react'
import './Shop.css'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import AdminOrderDetails from '../components/AdminOrderDetails'

const AdminOrderDetailsPage = () => {
  return (
    <div>
      <Navbar />
      <AdminOrderDetails />
      <Footer />
    </div>
  )
}

export default AdminOrderDetailsPage
