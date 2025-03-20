
import React from 'react'
import './Shop.css'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import AdminUsers from '../components/AdminUsers'

const adminUsers = () => {
  return (
    <div>
      <Navbar />
      <AdminUsers/>
      <Footer />
    </div>
  )
}

export default adminUsers
