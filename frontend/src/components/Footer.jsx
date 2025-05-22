import React from 'react';
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom';


const Footer = () => {
  return (
    <div>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-10 text-sm'>
        <div>
          <img src={assets.logo} className='mb-5 w-32' alt="Fashion Corner Logo" />
          <p className='w-full md:w-2/3 text-gray-400'>
            Fashion Corner – Your go-to destination for the latest trends, timeless styles, and premium-quality fashion. We bring you a curated collection of clothing and accessories designed for every occasion. Shop with confidence and enjoy a seamless, stylish, and affordable shopping experience.
            <br /><br />
            ✨ Stay Trendy | Stay Confident | Stay You ✨
          </p>
        </div>

        <div>
          <p className='text-xl font-medium mb-5'>COMPANY</p>
          <ul className='flex flex-col gap-1 text-gray-700'>
            <li><Link to="/" className="hover:text-blue-500 transition-colors duration-300">HOME</Link></li>
            <li><Link to="/about" className="hover:text-blue-500 transition-colors duration-300">ABOUT US</Link></li>
            <li>DELIVERY</li>
            <li><Link to="/privacy" className="hover:text-blue-500 transition-colors duration-300">PRIVACY POLICIES</Link></li>
          </ul>
        </div>

        <div>
          <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
          <ul className='flex flex-col gap-1 text-gray-700'>
            <li className="flex items-center gap-2">
              <img src={assets.phone} alt="Phone" className="w-4 h-4" />
              +91-21235-58859
            </li>
            <li className="flex items-center gap-2">
              <img src={assets.email} alt="Email" className="w-4 h-4" />
              <a
                href="mailto:contact@fashioncorner.com"
                className="hover:text-blue-500 transition-colors duration-300"
              >
                contact@fashioncorner.com
              </a>
            </li>
          </ul>
          <div className="flex items-center gap-4 mt-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <img src={assets.facebook} alt="Facebook" className="w-6 h-6 hover:opacity-70 transition" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <img src={assets.instagram} alt="Instagram" className="w-6 h-6 hover:opacity-70 transition" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <img src={assets.twitter} alt="Twitter" className="w-6 h-6 hover:opacity-70 transition" />
            </a>
          </div>
        </div>
      </div>

      <div>
        <hr />
        <p className='py-5 text-sm text-center'>Copyright 2025-2026 @ fashioncorner.com - All Rights Reserved</p>
      </div>
    </div>
  );
};

export default Footer;
