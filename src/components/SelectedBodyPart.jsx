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
              'X-RapidAPI-Key': '86e7f2ed69mshec33da2e64f7f2fp102a12jsn849c12bd2bfa',
              'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com',
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
    <div>
      <div className="flex justify-center mb-6">
        <DropdownMenu setSearch={setSelectedBodyPart} />
      </div>

      {loading ? (
        <div className="flex justify-center items-center min-h-screen">
          <div className="w-12 h-12 border-4 border-t-4 border-blue-500 rounded-full animate-spin"></div>
        </div>
      ) : (
        <ExercisesList
          exercises={exercises}
          onAddToMyExercises={handleAddToMyExercises}
          addedExercises={addedExercises} // Pass added exercises to highlight the cards
        />
      )}
    </div>
  );
};

export default SelectedBodyPart;
