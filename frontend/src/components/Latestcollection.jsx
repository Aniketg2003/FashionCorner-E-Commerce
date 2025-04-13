import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { shopcontext } from '../context/shopcontext'
import Title from './Title';
import Productitem from './Productitem';


const Latestcollection = () => {
    const { products }= useContext(shopcontext);
    const [Latestproducts,setLatestproduct]=useState([]);

    useEffect (()=>{
      setLatestproduct(products.slice(0,10));
    }, [products])
    

  return (
    <div className='my-10'>
      <div className='text-center py-3 text-3xl'>
        <Title text1={'LATEST'} text2={'COLLECTION'}/>
        <p className='w-3/4 m-auto text-xs sm:text-base text-gray-700'>Explore our latest collection featuring trendy designs, premium quality, and must-have styles. Shop now and stay ahead of the trends! ✨🔥
        </p>
      </div>
      {/*product*/}
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
        {
          Latestproducts.map((item,index)=>(
            <Productitem key ={index} id={item._id} image={item.image} name={item.name} price={item.price}/>
          ))
        }
      </div>


    </div>
  )
}

export default Latestcollection
