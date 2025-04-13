import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { shopcontext } from '../context/shopcontext';
import { assets } from '../assets/assets';
import Related from '../components/Related';
import axios from 'axios';

const Product = () => {
  const { productId } = useParams();
  const {
    products,
    currency,
    addToCard,
    token,
    backendUrl,
    userInfo
  } = useContext(shopcontext);

  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState('');
  const [size, setSize] = useState('');
  const [activeTab, setActiveTab] = useState('description');
  const [reviews, setReviews] = useState([]);
  const [canReview, setCanReview] = useState(false);
  const [reviewData, setReviewData] = useState({ rating: 0, comment: '' });

  useEffect(() => {
    const fetchProductData = () => {
      const foundProduct = products.find((item) => item._id === productId);
      if (foundProduct) {
        setProductData(foundProduct);
        setImage(foundProduct.image[0]);
      }
    };
    fetchProductData();
  }, [productId, products]);

  const fetchReviews = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/review/product/${productId}`, {
        headers: { token:token } });
      console.log("Reviews response:", response.data);  // <-- log the entire response
      if (response.data.success) {
        const sorted = response.data.reviews.sort((a, b) => new Date(b.date) - new Date(a.date));
        setReviews(sorted);
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  useEffect(() => {
    if (productId) fetchReviews();
  }, [productId]);

  useEffect(() => {
    const checkCanReview = async () => {
      if (!token) return;
      try {
        const response = await axios.get(`${backendUrl}/api/review/can-review/${productId}`, {
          headers: { token }
        });
        if (response.data.success) {
          setCanReview(response.data.canReview);
        }
      } catch (error) {
        console.error('Error checking review eligibility:', error);
      }
    };
    checkCanReview();
  }, [productId, token]);

  const handleReviewSubmit = async () => {
    if (!token) {
      alert('Please login to submit a review');
      return;
    }
    if (reviewData.rating === 0) {
      alert('Please select a rating');
      return;
    }
    try {
      const response = await axios.post(
        `${backendUrl}/api/review/submit`,
        {
          productId,
          userId: userInfo._id,
          username: userInfo.username,
          rating: reviewData.rating,
          comment: reviewData.comment
        },
        { headers: { token } }
      );
      if (response.data.success) {
        alert('Review submitted successfully');
        setCanReview(false);
        setReviewData({ rating: 0, comment: '' });
        fetchReviews();
      }
    } catch (error) {
      console.error('Error submitting review:', error);
      alert(error.response?.data?.message || 'Failed to submit review');
    }
  };

  const renderStars = (rating, interactive = false) => (
    <div className='flex'>
      {[1, 2, 3, 4, 5].map((star) => (
        <img
          key={star}
          src={star <= rating ? assets.star_icon : assets.star_dull_icon}
          alt="star"
          className={`w-5 h-5 ${interactive ? 'cursor-pointer' : ''}`}
          onClick={
            interactive ? () => setReviewData({ ...reviewData, rating: star }) : undefined
          }
        />
      ))}
    </div>
  );

  const averageRating =
    reviews.length > 0
      ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
      : 0;

  if (!productData) return <div className='opacity-0'></div>;

  return (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>
        {/* Image Section */}
        <div className='flex-1 flex flex-col-reverse sm:flex-row gap-3'>
          <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:w-[18.7%] w-full'>
            {productData.image.map((item, index) => (
              <img
                onClick={() => setImage(item)}
                src={item}
                key={index}
                className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer'
                alt='Product Thumbnail'
              />
            ))}
          </div>
          <div className='w-full sm:w-[80%]'>
            <img className='w-full h-auto' src={image} alt='Product' />
          </div>
        </div>

        {/* Product Details */}
        <div className='flex-1'>
          <h1 className='font-medium text-2xl mt-2'>{productData.name}</h1>
          <div className='flex items-center gap-1 mt-2'>
            {renderStars(Math.round(averageRating))}
            <p className='pl-2'>({reviews.length})</p>
          </div>
          <p className='mt-5 text-3xl font-medium'>
            {currency}
            {productData.price}
          </p>
          <p className='mt-5 text-gray-500 md:w-3/4'>{productData.description}</p>

          {/* Size Selection */}
          <div className='flex flex-col gap-4 my-8'>
            <p>Select Size</p>
            <div className='flex gap-2'>
              {productData.sizes.map((item, index) => (
                <button
                  onClick={() => setSize(item)}
                  className={`border py-2 px-4 bg-gray-100 ${
                    item === size ? 'border-orange-500' : ''
                  }`}
                  key={index}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => addToCard(productData._id, size)}
            className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700'
          >
            ADD TO CART
          </button>

          <hr className='mt-8 sm:w-4/5' />
          <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
            <p>100% Original Product.</p>
            <p>Cash On Delivery is Available on this Product</p>
            <p>Easy return and Exchange policy within 7 days.</p>
          </div>
        </div>
      </div>

      {/* Description & Reviews */}
      <div className='mt-20'>
        <div className='flex'>
          <button
            className={`border px-5 py-3 text-sm ${activeTab === 'description' ? 'bg-gray-200' : ''}`}
            onClick={() => setActiveTab('description')}
          >
            Description
          </button>
          <button
            className={`border px-5 py-3 text-sm ${activeTab === 'reviews' ? 'bg-gray-200' : ''}`}
            onClick={() => setActiveTab('reviews')}
          >
            Reviews ({reviews.length})
          </button>
        </div>

        <div className='border px-6 py-6'>
          {activeTab === 'description' && (
            <div className='text-gray-700'>
              <p>{productData.fullDescription || productData.description}</p>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className='space-y-6'>
              {canReview && (
                <div className='mb-8 p-4 border rounded bg-gray-50'>
                  <h3 className='text-lg font-medium mb-4'>Write a Review</h3>
                  <div className='mb-4'>
                    <p className='mb-2'>Your Rating:</p>
                    {renderStars(reviewData.rating, true)}
                  </div>
                  <textarea
                    className='w-full p-3 border rounded mb-4'
                    rows='4'
                    placeholder='Share your thoughts about this product...'
                    value={reviewData.comment}
                    onChange={(e) => setReviewData({ ...reviewData, comment: e.target.value })}
                  />
                  <button
                    className='bg-black text-white px-6 py-2 text-sm rounded'
                    onClick={handleReviewSubmit}
                  >
                    Submit Review
                  </button>
                </div>
              )}

              {/* Reviews List */}
              <div>
                <div className='flex items-center mb-6'>
                  <div className='flex items-center mr-4'>
                    {renderStars(Math.round(averageRating))}
                    <span className='ml-2 text-gray-600'>
                      {averageRating.toFixed(1)} out of 5
                    </span>
                  </div>
                  <span className='text-gray-600'>{reviews.length} reviews</span>
                </div>

                {reviews.length > 0 ? (
                  reviews.map((review) => (
                    <div key={review._id || Math.random()} className='border-b pb-6 mb-6 last:border-0'>
                      <div className='flex items-center justify-between mb-2'>
                        <p className='font-medium'>{review.username || 'Anonymous'}</p>
                        <div className='flex items-center'>
                          {renderStars(review.rating)}
                          <span className='ml-2 text-gray-500 text-sm'>
                            {new Date(review.date).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <p className='text-gray-700'>{review.comment}</p>
                    </div>
                  ))
                ) : (
                  <p className='text-gray-500'>No reviews yet. Be the first to review!</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      
      <Related category={productData.category} subCategory={productData.subCategory} />
    </div>
  );
  
};

const ReviewTest = ({ productId }) => {
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/api/review/product/${productId}`);
        console.log("✅ Review fetch successful:", res.data);

        if (res.data.success) {
          const reviews = res.data.reviews;
          console.log("📝 Reviews:", reviews);
        } else {
          console.warn("⚠️ Backend returned success: false");
        }
      } catch (error) {
        console.error("❌ Error fetching reviews:", error);
      }
    };

    if (productId) {
      console.log("🔍 Fetching reviews for product:", productId);
      fetchReviews();
    }
  }, [productId]);

  return null; // Or replace with JSX if you want to display
};



export default Product;
