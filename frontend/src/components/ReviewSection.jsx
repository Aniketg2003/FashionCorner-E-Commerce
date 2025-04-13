import { useState, useEffect } from "react";
import axios from "axios";

const ReviewSection = ({ productId, token, backendUrl }) => {
  const [reviews, setReviews] = useState([]);
  const [canReview, setCanReview] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [message, setMessage] = useState("");

  // Check if user can review
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
        console.error("Error checking review eligibility:", error);
      }
    };
    checkCanReview();
  }, [productId, token, backendUrl]);

  // Fetch reviews
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/review/product/${productId}`);
        setReviews(response.data.reviews);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };
    fetchReviews();
  }, [productId, backendUrl]);

  // Handle review submission
  const submitReview = async () => {
    try {
      const response = await axios.post(`${backendUrl}/api/review/submit`, { productId, rating, comment }, {
        headers: { token }
      });
      if (response.data.success) {
        setMessage("Review submitted successfully!");
        setCanReview(false);
        setReviews([...reviews, { userId: { name: "You" }, rating, comment }]);
      }
    } catch (error) {
      setMessage("Error submitting review. " + error.response?.data?.message);
    }
  };

  return (
    <div>
      <h3>Reviews</h3>
      {reviews.length === 0 ? <p>No reviews yet.</p> : (
        reviews.map((review, index) => (
          <div key={index}>
            <p><strong>{review.userId.name}:</strong> ⭐{review.rating}/5</p>
            <p>{review.comment}</p>
            <hr />
          </div>
        ))
      )}

      {canReview && (
        <div>
          <h3>Leave a Review</h3>
          <input type="number" value={rating} onChange={(e) => setRating(e.target.value)} max="5" min="1" />
          <textarea value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Write a review"></textarea>
          <button onClick={submitReview}>Submit</button>
        </div>
      )}

      {message && <p>{message}</p>}
    </div>
  );
};

export default ReviewSection;
