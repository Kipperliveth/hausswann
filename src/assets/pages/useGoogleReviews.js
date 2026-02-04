import { useState, useEffect } from 'react';

// You get these from Google Cloud Console
const GOOGLE_API_KEY = "YOUR_API_KEY_HERE"; 
const PLACE_ID = "YOUR_PLACE_ID_HERE"; 

export const useGoogleReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        // NOTE: Direct calls to Google API from the browser often get blocked by CORS.
        // In a real production app, you usually call your OWN backend, which then calls Google.
        // For testing/local, you might need a proxy.
        
        const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${PLACE_ID}&fields=reviews,rating,user_ratings_total&key=${GOOGLE_API_KEY}`;
        
        // This is a standard fetch. If you face CORS errors, you might need a proxy server.
        const response = await fetch(url);
        const data = await response.json();

        if (data.result && data.result.reviews) {
          setReviews(data.result.reviews);
        } else {
          setReviews([]); // No reviews found
        }
      } catch (err) {
        setError(err);
        // Fallback to empty array so the UI doesn't crash
        setReviews([]);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  return { reviews, loading, error };
};