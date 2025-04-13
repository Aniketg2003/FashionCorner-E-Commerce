import React, { useEffect } from 'react'
import { useContext } from 'react'
import { shopcontext } from '../context/shopcontext'
import { useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'


const Verify = () => {

    const {navigate, token,setCarditem,backendurl} = useContext(shopcontext)
    const [searchparams,setSearchparams]=useSearchParams();

    const success = searchparams.get('success');
    const orderId = searchparams.get('orderId');


    const verifypayment = async ()=>{
        try {

            if (!token) {
               return null 
            } 

            const response = await axios.post(backendurl+'/api/order/verifyStripe',{success,orderId},{headers:{token}})
            if (response.data.success) {
                setCarditem({})
                navigate('/orders')
                
            } else {
                navigate('/cart')
                
            }

        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }

    useEffect(()=>{
        verifypayment()

    },[token])

  return (
    <div>
      
    </div>
  )
}

export default Verify
