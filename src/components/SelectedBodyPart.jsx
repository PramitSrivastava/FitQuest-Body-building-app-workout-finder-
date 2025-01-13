import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ExercisesList from './ExercisesList';
import DropdownMenu from './DropdownMenu';

const SelectedBodyPart = ({ selectedBodyPart, setSelectedBodyPart, myExercises, setMyExercises, addedExercises, setAddedExercises, loading, setLoading }) => {
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    if (selectedBodyPart) {
      const fetchExercises = async () => {
        setLoading(true);
        try {
          const response = await axios.get(`https://exercisedb.p.rapidapi.com/exercises/bodyPart/${selectedBodyPart}`, {
            headers: {
              'X-RapidAPI-Key': import.meta.env.VITE_RAPIDAPI_KEY,
              'X-RapidAPI-Host': import.meta.env.VITE_RAPIDAPI_HOST,
            },
          });
          setExercises(response.data);
        } catch (error) {
          console.error('Error fetching exercises:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchExercises();
    }
  }, [selectedBodyPart, setLoading]);

  // Handle adding exercise to "My Exercises"
  const handleAddToMyExercises = (exercise) => {
    if (!myExercises.includes(exercise)) {
      setMyExercises((prevExercises) => [...prevExercises, exercise]);
      setAddedExercises((prevAdded) => [...prevAdded, exercise]); // Add to addedExercises
    }
  };

  // Handle removing exercise from "My Exercises"
  const handleRemoveFromMyExercises = (exercise) => {
    setMyExercises((prevExercises) => prevExercises.filter((item) => item.id !== exercise.id));
    setAddedExercises((prevAdded) => prevAdded.filter((item) => item.id !== exercise.id)); // Remove from addedExercises
  };

  return (
    <div className="bg-gradient-to-r from-indigo-500 via-blue-400 to-purple-600 min-h-screen py-12">
      <div className="max-w-6xl mx-auto text-center text-white">
        <h2 className="text-4xl font-extrabold mb-8">Select Body Part</h2>

        <div className="mb-8">
          <DropdownMenu setSearch={setSelectedBodyPart} />
        </div>

        {loading ? (
          <div className="flex justify-center items-center min-h-screen">
            <div className="w-12 h-12 border-4 border-t-4 border-blue-500 rounded-full animate-spin"></div>
          </div>
        ) : (
          <>
            {exercises.length === 0 ? (
              <p className="text-xl font-semibold text-gray-300">No exercises found for the selected body part.</p>
            ) : (
              <ExercisesList
                exercises={exercises}
                onAddToMyExercises={handleAddToMyExercises}
                addedExercises={addedExercises} // Pass added exercises to highlight the cards
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default SelectedBodyPart;