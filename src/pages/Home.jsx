import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import TrendingProducts from '../components/TrendingProducts'
import Features from '../components/Features'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <TrendingProducts />
      <Features />
      <Footer />
    </div>
  )
}

export default Home
