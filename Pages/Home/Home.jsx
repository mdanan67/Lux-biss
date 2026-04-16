import Business from '@/componont/User/Home/Business/Business'
import Footer from '@/componont/User/Home/Footer/Footer'
import Hero from '@/componont/User/Home/Hero/Hero'
import HowYouWillEarn from '@/componont/User/Home/HowYouWillEarn/HowYouWillEarn'
import Navbar from '@/componont/User/Home/Navbar/Navbar'
import ProductInvestment from '@/componont/User/Home/ProductInvestment/ProductInvestment'
import Testimonial from '@/componont/User/Home/Trust/Testomonial'
import StartInvestingCTA from '@/componont/User/Home/WholeseleProduct/WholeseleProduct'
import Works from '@/componont/User/Home/Work/Work'
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