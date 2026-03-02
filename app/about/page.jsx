import HeroInvestment from '@/componont/AboutHeroSection/AboutHeroSection'
import ComplianceSection from '@/componont/ComplianceSection/ComplianceSection'
import HeroSection from '@/componont/Home/Hero/Hero'
import Navbar from '@/componont/Home/Navbar/Navbar'
import OurStorySection from '@/componont/OurStory/OurStory'
import ReadyJourneySection from '@/componont/ReadyJourneySection/ReadyJourneySection'
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