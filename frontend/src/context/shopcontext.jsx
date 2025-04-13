import { createContext, useEffect, useState } from "react";
import axios from 'axios'
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
export const shopcontext =createContext ();


const ShopContextProvider =(props)=>{

    const currency='₹';
    const Delivery_fee=30;
    const backendurl= import.meta.env.VITE_BACKEND_URL;
    const [search,setSearch]= useState('');
    const [showSearch,setShowSearch] = useState(false);
    const [cardItem,setCarditem] = useState({});
    const [products,setProducts] = useState([]);
    const [profile,setProfile] = useState([]);
    const [token,setToken] = useState('')
    const navigate =useNavigate();
    const [userInfo, setUserInfo] = useState(null);




    const fetchUserInfo = async () => {
        try {
          const res = await axios.get(`${backendurl}/api/user`, {
            headers: { token }
          });
          if (res.data.success) {
            setUserInfo(res.data.user);
          }
        } catch (error) {
          console.error("Error fetching user info:", error);
        }
      };
      
      // Automatically fetch userInfo if token exists
      useEffect(() => {
        if (token) {
          fetchUserInfo();
        }
      }, [token]);






    

    const addToCard =async (itemId,size) =>{


        if (!size) {
            toast.error ('Select Product Size');
            return;
            
        }


        let cardData = structuredClone(cardItem);

        if (cardData[itemId]) {
            if ( cardData[itemId][size]) {
                cardData[itemId][size]+=1;
                
            }
            else{
                cardData[itemId][size] =1;
            }
        }
        else{
            cardData[itemId]={}
            cardData[itemId][size] =1;
        }
        setCarditem(cardData);

        if (token) {
            try {
                await axios.post(backendurl+'/api/cart/add',{itemId,size},{headers:{token}})

            } catch (error) {
                console.log(error)
                 toast.error(error.message)
                
            }
            
        }


    }

    const getCardCount = () =>{
        let TotalCount= 0;
        for (const items in cardItem){
            for (const item in cardItem[items]){
                try {
                    if (cardItem[items][item] > 0) {
                        TotalCount += cardItem [items][item];
                        
                    }
                } catch ( error) {
                    
                }
            }
        }
        return TotalCount;
    }

    const updateQuantity =async(itemId,size,quantity)=>{
        let cardData =structuredClone(cardItem);

        cardData[itemId][size] =quantity;
        setCarditem(cardData);

        if (token) {
            try {
                await axios.post(backendurl+'/api/cart/update',{itemId,size,quantity},{headers:{token}})

            } catch (error) {
                console.log(error)
                toast.error(error.message)
                
            }
            
        } else {
            
        }
    }

    const getcartAmount = () =>{
        let totalAmount =0;
        for (const items in cardItem){
            let itemInfo=products.find((product)=> product._id ===items);
            for (const item in cardItem [items] ){
                try {
                    if(cardItem[items][item] >0 ){
                        totalAmount+=itemInfo.price * cardItem[items] [item];
                    }
                } catch (error) {
                    
                }
            }
        }
        return totalAmount;
    }

    const getProductsData = async ()=>{
        try {

            const response = await axios.get(backendurl + '/api/product/list')
            if (response.data.success) {
                setProducts(response.data.products)
                
            }else{
                toast.error(error.message)
            }
            
        } catch (error) {
            console.log(error)
            toast.error(error.message)
            
        }
    };

    /*const getUserData = async ()=>{
        try {

            const profile = await axios.get(backendurl + '/api/user/address')
            if (response.data.success) {
                setProfile(response.data.products)
                
            }else{
                toast.error(error.message)
            }
            
        } catch (error) {
            console.log(error)
            toast.error(error.message)
            
        }
    };*/
/*
    const getUserCart = async ( token ) => {
        try {
            
            const response =await axios.post(backendurl + '/api/cart/get',{},{headers:{token}})
            if(response.data.success){
                setCarditem(response.data.cardData)

            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
            
        }
    }
*/
const getUserCart = async (token) => {
    try {
        const response = await axios.post(backendurl + '/api/cart/get', {}, { headers: { token } });

        if (response.data.success) {
            console.log("Cart Data Fetched:", response.data.cartData);
            setCarditem(response.data.cartData); 
        } else {
            toast.error("Failed to fetch cart data");
        }
    } catch (error) {
        console.log(error);
        toast.error(error.message);
    }
};















    useEffect(()=>{
        getProductsData();

    },[])
/*
    useEffect(()=>{
        if(!token && localStorage.getItem('token')){
            setToken(localStorage.getItem('token'))
            getUserCart(localStorage.getItem('token'))
        }

    },[])*/
    useEffect(() => {
        const fetchCart = async () => {
            const storedToken = localStorage.getItem('token');
    
            if (storedToken) {
                setToken(storedToken);
                console.log("Fetching cart data..."); // Debugging log
                await getUserCart(storedToken);
            }
        };
    
        fetchCart();
    }, [token]); // ✅ Now fetches only when `token` is available
    
    
    

    const value ={
        products,currency,Delivery_fee,
        search,setSearch,showSearch,setShowSearch,
        cardItem,addToCard,getCardCount,updateQuantity,
        getcartAmount,navigate,backendurl,setCarditem,
        token,setToken,userInfo,
        setUserInfo,

    }

    return(
        <shopcontext.Provider value={value}>
            {props.children}
        </shopcontext.Provider>
    )
}

export default ShopContextProvider;