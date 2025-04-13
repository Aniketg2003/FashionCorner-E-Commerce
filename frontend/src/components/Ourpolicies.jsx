import React from 'react'
import { assets } from '../assets/assets'

const Ourpolicies = () => {
  return (
    <div className='flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20  test-sx sm:text-sm md-text-base text-gray-700'>
      
      <div>
        <img src={assets.exchange_icon} className='w-12 m-auto mb-5' alt="" />
        <p className='font-semibold'>Easy Exchnage Policies</p>
       
        <p className='text-gray-700'>We Offer Hassle Free Exchange</p>
      </div>
      <div>
        <img src={assets.quality_icon} className='w-12 m-auto mb-5' alt="" />
        <p className='font-semibold'>7 Days Return Policies</p>
       
        <p className='text-gray-700'>We Provide 7 Days Free Return Policies</p>
      </div>
      <div>
        <img src={assets.support_img} className='w-12 m-auto mb-5' alt="" />
        <p className='font-semibold'>Best Customer Support</p>
       
        <p className='text-gray-700'>We Provide 24*7 Customer Support</p>
      </div>
    </div>
  )
}

export default Ourpolicies 
