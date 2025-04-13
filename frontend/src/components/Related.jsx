import React, { useContext, useEffect, useState } from 'react'
import { shopcontext } from '../context/shopcontext'
import Title from './Title';
import Productitem from './Productitem';

const Related = ({category,subCategory}) => {

    const {products}= useContext(shopcontext);
    const [related,setRelated] =useState ([]);

    useEffect(()=>{
      if(products.length >0 ){

        let productscopy  = products.slice ();
        productscopy=productscopy.filter((item)=>category === item.category);
        productscopy=productscopy.filter((item)=> subCategory ===item.subCategory);

        setRelated(productscopy.slice(0,5));


      }

    },[products])


  return (
    <div className='my-24'>
      <div className='text-center text-3xl py-2'>
        <Title text1={'RELATED'} text2={'PRODUCTS'}/>
      </div>
      <div className='grid grid-cols-2 sm:gridcols-3 md:grid-cols-4 lg:grid-col-5 gap-4 gap-y-6'>
        {related.map((item,index)=>(
          <Productitem key={index} id={item._id} name={item.name} price={item.price} image={item.image}/>
        ))}
      </div>


    </div>
  )
}

export default Related


