import React, { useContext, useState } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { shopcontext } from '../context/shopcontext';
import axios from 'axios';
import { toast } from 'react-toastify';

const ReviewForm = () => {
    const { backendurl, token, userInfo } = useContext(shopcontext);
    const { productId } = useParams();
    const { state } = useLocation();
    const navigate = useNavigate();
    const [rating, setRating] = useState('');
    const [comment, setComment] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!rating || !comment) {
            toast.error('Please provide both rating and comment');
            return;
        }

        setIsSubmitting(true);
        
        try {
            const res = await axios.post(
                `${backendurl}/api/review/submit`,
                {
                    productId,
                    userId: userInfo.id,
                    username: userInfo.name,
                    rating: Number(rating),
                    comment
                },
                { headers: { token } }
            );
            
            toast.success('Review submitted successfully!');
            navigate(`/product/${productId}`); // Redirect to product page after submission
        } catch (err) {
            console.error('Review submission error:', err);
            toast.error(err.response?.data?.message || 'Failed to submit review');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="p-4 max-w-lg mx-auto border mt-10 shadow-md rounded-xl">
            <h2 className="text-xl font-semibold mb-4">Write a Review</h2>
            {state && (
                <div className="flex items-center gap-4 mb-4">
                    <img src={state.productImage} alt="product" className="w-20 h-20 object-cover" />
                    <div>
                        <p className="font-medium">{state.productName}</p>
                        {state.orderDate && (
                            <p className="text-sm text-gray-500">
                                Ordered on: {new Date(state.orderDate).toDateString()}
                            </p>
                        )}
                    </div>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block mb-1">Rating</label>
                    <select
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                        className="w-full p-2 border rounded"
                        required
                    >
                        <option value="">Select Rating</option>
                        <option value="5">⭐⭐⭐⭐⭐ (5)</option>
                        <option value="4">⭐⭐⭐⭐ (4)</option>
                        <option value="3">⭐⭐⭐ (3)</option>
                        <option value="2">⭐⭐ (2)</option>
                        <option value="1">⭐ (1)</option>
                    </select>
                </div>

                <div>
                    <label className="block mb-1">Review</label>
                    <textarea
                        className="w-full border p-2 rounded"
                        rows="4"
                        placeholder="Share your experience with this product..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        required
                    />
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    {isSubmitting ? 'Submitting...' : 'Submit Review'}
                </button>
            </form>
        </div>
    );
};

export default ReviewForm;