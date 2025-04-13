import React, { useState, useEffect } from 'react'
import Navbar from './components/Nav'
import Sidebar from './components/sidebar'
import { Routes, Route } from 'react-router-dom'
import Add from './pages/add'
import Orders from './pages/order'
import List from './pages/list'
import Login from './components/Login'
import { ToastContainer } from 'react-toastify';

export const backendUrl= import.meta.env.VITE_BACKEND_URL
export const currency='₹'


const App = () => {

  const [token, setToken] = useState(localStorage.getItem('token')?localStorage.getItem('token'):'');

  useEffect(()=>{
    localStorage.setItem('token',token)
  },[token])


  return (
    <div className='bg-gra-50 min-h-screen'>
      <ToastContainer/>
      {token === ""
        ? <Login setToken={setToken}/>
        :

        <>
          <Navbar setToken={setToken}/>
          <hr />
          <div className='flex w-full'>
            <Sidebar />
            <div className='w-[70%] mx-auto  ml-[max(5vw,25px)] m-8 text-gray-600 text-base'>
              <Routes>
                <Route path='/add' element={<Add token={token}/>} />
                <Route path='/list' element={<List token={token}/>} />
                <Route path='/orders' element={<Orders token={token}/>} />
              </Routes>

            </div>
          </div>
        </>
      }
    </div>
  )
}

export default App
