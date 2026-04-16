import HeroInvestment from '@/componont/User/AboutHeroSection/AboutHeroSection'
import ComplianceSection from '@/componont/User/ComplianceSection/ComplianceSection'
import HeroSection from '@/componont/User/Home/Hero/Hero'
import Navbar from '@/componont/User/Home/Navbar/Navbar'
import OurStorySection from '@/componont/User/OurStory/OurStory'
import ReadyJourneySection from '@/componont/User/ReadyJourneySection/ReadyJourneySection'
import React from 'react'

const page = () => {
  return (
    <div>
        <Navbar></Navbar>
        <HeroInvestment></HeroInvestment>
        <OurStorySection></OurStorySection>
        <ComplianceSection></ComplianceSection>
        <ReadyJourneySection></ReadyJourneySection>
            
    </div>
  )}

export default page