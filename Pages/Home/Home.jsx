import Business from '@/componont/Home/Business/Business'
import Footer from '@/componont/Home/Footer/Footer'
import Hero from '@/componont/Home/Hero/Hero'
import HowYouWillEarn from '@/componont/Home/HowYouWillEarn/HowYouWillEarn'
import Navbar from '@/componont/Home/Navbar/Navbar'
import ProductInvestment from '@/componont/Home/ProductInvestment/ProductInvestment'
import Testimonial from '@/componont/Home/Trust/Testomonial'
import StartInvestingCTA from '@/componont/Home/WholeseleProduct/WholeseleProduct'
import Works from '@/componont/Home/Work/Work'
import React from 'react'

const Home = () => {
  return (
    <div className=''>
    <Navbar></Navbar>
    <Hero></Hero>
    <Business></Business>
    <Works></Works>
    <ProductInvestment></ProductInvestment>
    <HowYouWillEarn></HowYouWillEarn>
    <Testimonial></Testimonial>
    <StartInvestingCTA></StartInvestingCTA>
    <Footer></Footer>
    
    </div>
  )
}

export default Home