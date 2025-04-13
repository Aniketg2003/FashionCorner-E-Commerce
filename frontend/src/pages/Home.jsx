import React from 'react'
import Hero from '../components/Hero'
import Latestcollection from '../components/Latestcollection';
import Bestseller from '../components/Bestseller';
import Ourpolicies from '../components/Ourpolicies';
import Newsletter from '../components/Newsletter';


const Home = () => {
  return (
    <div>
      <Hero />
      <Latestcollection />
      <Bestseller />
      <Ourpolicies />
      <Newsletter />
    </div>
  )
}

export default Home;
