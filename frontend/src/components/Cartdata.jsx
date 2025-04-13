import React, { useContext } from 'react'
import { shopcontext } from '../context/shopcontext'
import Title from './Title';

const Cartdata = () => {
    const{currency,Delivery_fee,getcartAmount}=useContext(shopcontext);
  return (
    <div className='w-full'>
        <div className='text-2xl'>
            <Title text1={'CART'} text2={'TOTALS'} />
        </div>
        <div className='flex flex-col gap-2 mt-2 text-sm'>
            <div className='flex justify-between '>
                <p>Subtotal</p>
                <p>{currency} {getcartAmount()}.00</p>
            </div>
            <hr />
            <div className='flex justify-between'>
                <p>Shipping Fee</p>
            <p>{currency} {Delivery_fee}.00</p>
            </div>
            <hr />
            <div className='flex justify-between'>
                <b>Total</b>
                <b>{currency} {getcartAmount() === 0 ? 0 : getcartAmount() + Delivery_fee}.00</b>
            </div>
        </div>
      
    </div>
  )
}

export default Cartdata

