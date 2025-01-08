import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DropdownMenu = ({ setSearch }) => {
  const [bodyParts, setBodyParts] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch the list of body parts from the API
  useEffect(() => {
    const fetchBodyParts = async () => {
      setLoading(true);
      try {
        const options = {
          method: 'GET',
          url: 'https://exercisedb.p.rapidapi.com/exercises/bodyPartList',
          headers: {
            'X-RapidAPI-Key': import.meta.env.VITE_RAPIDAPI_KEY,
            'X-RapidAPI-Host': import.meta.env.VITE_RAPIDAPI_HOST,
          },
        };
        const response = await axios.request(options);
        setBodyParts(response.data);  // Store the list of body parts
      } catch (error) {
        console.error('Error fetching body parts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBodyParts();
  }, []);

  const handleChange = (event) => {
    setSearch(event.target.value);  // Update the selected body part
  };

  if (loading) {
    return <div>Loading body parts...</div>;
  }

  return (
    <div className="relative inline-block w-48 ">
      <select
        onChange={handleChange}
        className="block w-full px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none"
      >
        <option value="">Select a body part</option>
        {bodyParts.map((bodyPart, index) => (
          <option key={index} value={bodyPart}>{bodyPart}</option>
        ))}
      </select>
    </div>
  );
};

export default DropdownMenu;
