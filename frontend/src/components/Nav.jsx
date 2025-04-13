import React, { useContext, useState } from 'react'
import {assets} from '../assets/assets'
import { Link, NavLink } from 'react-router-dom'
import { shopcontext } from '../context/shopcontext';


const navbar = () => {
  const[Visible,setVisible]=useState(false);
  const {setShowSearch,getCardCount, navigate, token, setToken, setCartItem} =useContext(shopcontext)

 const logout=()=>{
  navigate('/login')
    localStorage.removeItem('token')
    setToken('')
    setCartItem({})
    
  }

  return (
    <div className='flex items-center justify-between py-5 font-medium'>

        <Link to='/'><img src={assets.logo} className='w-36' alt="" /></Link>
      
        <ul className='hidden sm:flex gap-5 text-sm text-gray-700'>
            <NavLink to='/' className='flex flex-col items-center gap-1' >
             <p>HOME</p>
             <hr className='w-2/4 border-none h-[2px] bg-gray-700 hidden ' />
             </NavLink>
             <NavLink to='/collection' className='flex flex-col items-center gap-1' >
             <p>COLLECTION</p>
             <hr className='w-2/4 border-none h-[2px] bg-gray-700 hidden' />
             </NavLink>
             <NavLink to='/about' className='flex flex-col items-center gap-1' >
             <p>ABOUT</p>
             <hr className='w-2/4 border-none h-[2px] bg-gray-700 hidden ' />
             </NavLink>
             <NavLink to='/contact' className='flex flex-col items-center gap-1' >
             <p>CONTACT</p>
             <hr className='w-2/4 border-none h-[2px] bg-gray-700 hidden ' />
             </NavLink>
        </ul>
        <div className='flex item-center gap-6'>
            <img  onClick={()=>setShowSearch(true)} src={assets.search_icon} className='w-6 cursor-pointer' alt=''/>

            <div className='group relative'>
                
                <img onClick={()=> token ? null: navigate('/login')} className='w-5 cursor-pointer ' src={assets.profile_icon} alt='' />

                {/*dropdown*/}

                {token && <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4'>
                    <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-700  rounded'>
                      <p onClick={()=>navigate('/profile')} className='cursor-pointer hover:text-black'>My Profile</p>
                      <p onClick={()=>navigate('/orders')} className='cursor-pointer hover:text-black'>Orders</p>
                      <p onClick={logout} className='cursor-pointer hover:text-black'>Log Out</p>
                    </div>
                </div>}
            </div>
            <Link to='/cart' className='relative'>
            <img src={assets.cart_icon} className='w-5 minw-5 ' alt="" />
            <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]'>{getCardCount()}</p>
            </Link>
            <img onClick={()=>setVisible(true)} src={assets.menu_icon} className='w-5 cursor-pointer sm:hidden' alt="" />
        </div>
      {/*sidebar menu for small screen*/}
      <div className={` absolute top-0 right-0 overflow-hidden bg-white transition-all ${Visible ? 'w-full' : 'w-0'}`}>
      <div className='flex flex-col text-gray-600'>
        <div onClick={()=>setVisible(false)} className='flex item-center p-3 gap-4'>
          <img  className='cursor-pointer h-4 rotate-180' src={assets.dropdown_icon} alt="" />
          <p>Back</p>
        </div>
        <NavLink onClick={()=>setVisible(false)} className='py-2 pl-6 border' to='/'>HOME</NavLink>
        <NavLink onClick={()=>setVisible(false)} className='py-2 pl-6 border' to='/collection'>COLLECTION</NavLink>
        <NavLink onClick={()=>setVisible(false)} className='py-2 pl-6 border' to='/about'>ABOUT</NavLink>
        <NavLink onClick={()=>setVisible(false)} className='py-2 pl-6 border' to='/contact'>CONTACT</NavLink>
      </div>
      </div>

    </div>
  )
}

export default navbar
