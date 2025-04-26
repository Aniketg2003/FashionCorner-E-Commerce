import React, { useContext, useEffect, useState } from 'react';
import { shopcontext } from '../context/shopcontext';
import Title from '../components/Title';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Order = () => {
  const { backendurl, token, currency } = useContext(shopcontext);
  const [orderdata, setOrderdata] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const loadorderData = async () => {
    try {
      if (!token) {
        setError('Please login to view orders');
        return;
      }

      setLoading(true);
      const response = await axios.post(
        `${backendurl}/api/order/userorders`, 
        {}, 
        { headers: { token } }
      );

      if (response.data.success) {
        const allorderitem = [];
        response.data.orders.forEach((order) => {
          order.items.forEach((item) => {
            allorderitem.push({
              ...item,
              status: order.status,
              payment: order.payment,
              paymentMethod: order.paymentMethod,
              date: order.date,
              // Ensure we're using the correct product ID field
              productId: item.productId || item._id // Fallback to _id if productId doesn't exist
            });
          });
        });
        setOrderdata(allorderitem.reverse());
      }
    } catch (error) {
      console.error('Error loading orders:', error);
      setError('Failed to load orders. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadorderData();
  }, [token, backendurl]);

  const handleWriteReview = (item) => {
    if (!item.productId) {
      console.error('Product ID is missing for this item');
      return;
    }
    navigate(`/review/${item.productId}`, {
      state: {
        productName: item.name,
        productImage: item.image[0],
        orderDate: item.date
      }
    });
  };

  if (loading) {
    return (
      <div className="border-t pt-16">
        <Title text1={'MY'} text2={'ORDERS'} />
        <div className="flex justify-center py-10">
          <p>Loading your orders...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="border-t pt-16">
        <Title text1={'MY'} text2={'ORDERS'} />
        <div className="flex justify-center py-10 text-red-500">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="border-t pt-16">
      <div className="text-zxl">
        <Title text1={'MY'} text2={'ORDERS'} />
      </div>
      
      {orderdata.length === 0 ? (
        <div className="flex justify-center py-10">
          <p>You haven't placed any orders yet.</p>
        </div>
      ) : (
        <div>
          {orderdata.map((item, index) => (
            <div 
              key={index} 
              className="py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
            >
              <div className="flex items-start gap-6 text-sm">
                <img 
                  className="w-16 sm:w-20 object-cover" 
                  src={item.image[0]} 
                  alt={item.name} 
                />
                <div>
                  <p className="sm:text-base font-medium">{item.name}</p>
                  <div className="flex items-center gap-3 mt-2 text-base text-gray-700">
                    <p>{currency}{item.price}</p>
                    <p>Quantity: {item.quantity}</p>
                    <p>Size: {item.size}</p>
                  </div>
                  <p className="mt-2">
                    Date: <span className="text-gray-400">{new Date(item.date).toDateString()}</span>
                  </p>
                  <p className="mt-2">
                    Payment: <span className="text-gray-400">{item.paymentMethod}</span>
                  </p>
                </div>
              </div>
              
              <div className="md:w-1/2 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${
                    item.status === 'Delivered' ? 'bg-green-600' : 
                    item.status === 'Shipped' ? 'bg-blue-600' : 
                    'bg-yellow-500'
                  }`}></div>
                  <p className="text-sm md:text-base capitalize">{item.status.toLowerCase()}</p>
                </div>
                
                <div className="flex gap-2">
                  <button 
                    onClick={loadorderData} 
                    className="border px-4 py-2 text-sm font-medium rounded-sm hover:bg-gray-100"
                  >
                    Track Order
                  </button>
                  
                  {item.status === 'Delivered' && (
                    <button 
                      onClick={() => handleWriteReview(item)}
                      className="px-4 py-2 text-sm font-medium rounded-sm bg-blue-500 text-white hover:bg-blue-600 transition-colors"
                    >
                      Write Review
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Order;