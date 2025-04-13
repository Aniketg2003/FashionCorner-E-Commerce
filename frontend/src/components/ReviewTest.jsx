import { useEffect } from 'react';
import axios from 'axios';

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

export default ReviewTest;
