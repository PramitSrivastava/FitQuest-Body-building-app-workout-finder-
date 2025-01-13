import axios from 'axios';

const API_URL = 'http://127.0.0.1:5000'; // Flask backend URL

// Register a new user
export const registerUser = async (username, password) => {
    try {
        const response = await axios.post(`${API_URL}/register`, { username, password });
        return response.data;
    } catch (error) {
        console.error('Error registering user:', error);
        return error.response.data;
    }
};

// Login a user and get the JWT token
export const loginUser = async (username, password) => {
    try {
        const response = await axios.post(`${API_URL}/login`, { username, password });
        return response.data; // Contains the access_token if login is successful
    } catch (error) {
        console.error('Error logging in:', error);
        return error.response.data;
    }
};

// If you still need to fetch a message or data from the backend
export const fetchMessage = async () => {
    try {
        const response = await axios.get(`${API_URL}/`);
        return response.data;
    } catch (error) {
        console.error('Error fetching data from backend:', error);
    }
};

// Calculate calories based on the exercise data
export const calculateCalories = async (duration, weight, exercise_type, reps) => {
    try {
      // Prepare the data with the correct parameters expected by the backend
      const data = {
        weight: weight,
        exercise_type: exercise_type,  // Exercise type is now passed directly
        duration: duration,
        reps: reps  // Include reps in the payload
      };
  
      console.log("API Request Data:", data);
  
      const response = await axios.post(
        `${API_URL}/calculate-calories`,
        data,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`  // JWT token for authentication
          }
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error calculating calories:', error.response ? error.response.data : error);
      throw error;
    }
};
