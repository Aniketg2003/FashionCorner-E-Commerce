import React from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'

const Sidebar = () => {
  return (
    <div className='w-[18%] min-h-screen border-r-2'>
        <div className='flex flex-col gap-4 pt-8 pl-[20%] text-ellipsis[15px]'>

            <NavLink className='flex items-center gap-3 border border-gray-300 border-r*0 px- py-2 rounded-l'  to="/add">
            <img className='pl-1 w-6 h-5' src={assets.add_icon} alt="" />
            <p className='hidden md:block'>Add Items</p>
            </NavLink>

            <NavLink className='flex items-center gap-3 border border-gray-300 border-r*0 px- py-2 rounded-l'  to="/list">
            <img className='pl-1 w-6 h-5' src={assets.order_icon} alt="" />
            <p className='hidden md:block'>List Items</p>
            </NavLink>

            <NavLink className='flex items-center gap-3 border border-gray-300 border-r*0 px- py-2 rounded-l'  to="/orders">
            <img className='pl-1 w-6 h-5' src={assets.order_icon} alt="" />
            <p className='hidden md:block'>Orders</p>
            </NavLink>

        </div>
      
    </div>
  )
}

export default Sidebar
