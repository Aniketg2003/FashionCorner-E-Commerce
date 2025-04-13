import React, { useContext, useEffect, useState } from 'react';
import { shopcontext } from '../context/shopcontext';
import Title from '../components/Title';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { backendurl, token, currency } = useContext(shopcontext);
  const [profileData, setProfileData] = useState({ user: null, orders: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const loadProfileData = async () => {
    try {
      setLoading(true);
      setError(null);

      if (!token) {
        navigate('/login');
        return;
      }

      const userResponse = await axios.get(`${backendurl}/api/user`, {
        headers: { token },
      });

      const ordersResponse = await axios.post(
        `${backendurl}/api/order/userorders`,
        {},
        { headers: { token } }
      );

      if (userResponse.data.success && ordersResponse.data.success) {
        const formattedOrders = ordersResponse.data.orders.flatMap(order =>
          order.items.map(item => ({
            ...item,
            status: order.status,
            paymentMethod: order.paymentMethod,
            date: order.date,
            orderId: order._id,
            address: order.address,
            productId: item.productId || item._id,
          }))
        ).reverse();

        setProfileData({
          user: userResponse.data.user,
          orders: formattedOrders,
        });
      }
    } catch (error) {
      console.error('Profile load error:', error);
      setError(error.response?.data?.message || 'Failed to load profile data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProfileData();
  }, [token, backendurl]);

  const handleWriteReview = (item) => {
    navigate(`/review/${item.productId}`, {
      state: {
        productName: item.name,
        productImage: item.image[0],
        orderDate: item.date,
      }
    });
  };

  if (loading) {
    return (
      <div className="border-t pt-16">
        <Title text1={'MY'} text2={'PROFILE'} />
        <div className="flex justify-center py-10">
          <p>Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="border-t pt-16">
        <Title text1={'MY'} text2={'PROFILE'} />
        <div className="flex justify-center py-10 text-red-500">
          <p>{error}</p>
          <button 
            onClick={loadProfileData}
            className="ml-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="border-t pt-16">
      <div className="max-w-4xl mx-auto px-4">
        <Title text1={'MY'} text2={'PROFILE'} />

        {/* User Info */}
        <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
          <h2 className="text-xl font-bold mb-4">Personal Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-gray-600">Full Name</p>
              <p className="font-medium">{profileData.user?.name || 'Not available'}</p>
            </div>
            <div>
              <p className="text-gray-600">Email</p>
              <p className="font-medium">{profileData.user?.email || 'Not available'}</p>
            </div>
            <div>
              <p className="text-gray-600">Member Since</p>
              <p className="font-medium">
                {profileData.user?.createdAt 
                  ? new Date(profileData.user.createdAt).toLocaleDateString() 
                  : 'Not available'}
              </p>
            </div>
            <div className="md:col-span-2">
  <p className="text-gray-600">Shipping Address (from latest order)</p>
  {profileData.orders.length > 0 && profileData.orders[0].address ? (
    <div className="font-medium">
      <p>{profileData.orders[0].address.firstName} {profileData.orders[0].address.lastName}</p>
      <p>{profileData.orders[0].address.street}, {profileData.orders[0].address.city}</p>
      <p>{profileData.orders[0].address.state} - {profileData.orders[0].address.zipcode}, {profileData.orders[0].address.country}</p>
      <p>Phone No:{profileData.orders[0].address.phone} </p>
    </div>
  ) : (
    <p className="text-gray-500">No address found in recent orders.</p>
  )}
</div>


          </div>
        </div>
        


        {/* Orders */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-bold mb-4">Order History</h2>
          {profileData.orders.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-gray-500">You haven't placed any orders yet.</p>
              <button
                onClick={() => navigate('/products')}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Browse Products
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {profileData.orders.map((item, index) => (
                <div 
                  key={`${item.orderId}-${index}`}
                  className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <p className="font-medium">
                        Order #{item.orderId.toString().slice(-6).toUpperCase()}
                      </p>
                      <p className="text-sm text-gray-500">
                        {new Date(item.date).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${
                        item.status === 'delivered' ? 'bg-green-500' :
                        item.status === 'shipped' ? 'bg-blue-500' : 
                        'bg-yellow-500'
                      }`} />
                      <span className="capitalize">{item.status.toLowerCase()}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 py-3 border-t">
                    <img 
                      src={item.image?.[0] || '/placeholder-product.jpg'} 
                      alt={item.name} 
                      className="w-16 h-16 object-cover rounded"
                      onError={(e) => { e.target.src = '/placeholder-product.jpg'; }}
                    />
                    <div className="flex-1">
                      <p className="font-medium">{item.name}</p>
                      <div className="flex gap-4 mt-1 text-sm text-gray-600">
                        <p>{currency}{item.price}</p>
                        <p>Qty: {item.quantity}</p>
                        <p>Size: {item.size}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row justify-between mt-4 pt-4 border-t text-sm text-gray-700">
                    <div className="mb-4 md:mb-0">
                      <p className="text-gray-600">Payment Method:</p>
                      <p className="capitalize">{item.paymentMethod}</p>
                    </div>

                    <div>
                      <p className="text-gray-600">Delivery Address:</p>
                      <p>{item.address.firstName} {item.address.lastName}</p>
                      <p>{item.address.street}, {item.address.city}</p>
                      <p>{item.address.state} - {item.address.zipcode}, {item.address.country}</p>
                      <p>Phone: {item.address.phone}</p>
                    </div>
                  </div>

                  
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
