import React from 'react'
import { Routes,Route} from 'react-router-dom'
import Home from './pages/Home'
import Collection from './pages/collection'
import About from './pages/about'
import Contact from './pages/contact'
import Product from './pages/product'
import Card from './pages/card'
import Login from './pages/login'
import Placeorder from './pages/placeorder'
import Order from './pages/order'
import PrivacyPolicy from './pages/privacy'
import Navbar from   './components/Nav'
import Footer from './components/Footer'
import Searchbr from './components/Searchbr'
import { ToastContainer, toast } from 'react-toastify';
import Verify from './pages/verify'
import ReviewPage from './pages/Review'
import Profile from './pages/profile'


const App = () => {
    return (
      <div  className='px-4 sm:px-[5vw] md:px-[7vm] lg:px-[9vm]'>
        <ToastContainer />
        <Navbar />
        <Searchbr />
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/collection' element={<Collection/>} />
          <Route path='/about' element={<About/>}  />
          <Route path='/contact' element={<Contact/>}/>
          <Route path='/product/:productId' element={<Product/>} />
          <Route path='/cart' element={<Card/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/place-order' element={<Placeorder/>} />
          <Route path='/orders' element={<Order/>} />
          <Route path='/verify' element={<Verify/>} />
          <Route path='/privacy' element={<PrivacyPolicy/>} />
          <Route path='/review/:productId' element={<ReviewPage />} />
          <Route path='/profile' element={<Profile />} />
          

        </Routes>
        <Footer/>
      </div>
    )
}

export default App