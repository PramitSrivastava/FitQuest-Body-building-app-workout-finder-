import React, { useState, useEffect } from 'react';
import { calculateCalories } from '../api';

const MyExercises = ({ myExercises, handleRemoveFromMyExercises, addedExercise }) => {
  const [exercises, setExercises] = useState(myExercises);
  const [caloriesBurned, setCaloriesBurned] = useState({});
  const [totalCaloriesBurned, setTotalCaloriesBurned] = useState(0); // New state for total calories burned

  useEffect(() => {
    setExercises(myExercises); // Sync with parent state when myExercises changes
    setCaloriesBurned({});
    setTotalCaloriesBurned(0); // Reset total calories when exercises change
  }, [myExercises]);

  const handleCalculateCalories = async (exercise) => {
    try {
      const duration = parseFloat(exercise.duration);
      const weight = parseFloat(exercise.weight);
      const exercise_type = exercise.bodyPart;
      const reps = parseInt(exercise.reps, 10);

      if (isNaN(duration) || isNaN(weight) || isNaN(reps) || duration <= 0 || weight <= 0 || reps <= 0) {
        console.error('Invalid input values: Duration, weight, and reps must be positive numbers');
        return;
      }

      const response = await calculateCalories(duration, weight, exercise_type, reps);
      setCaloriesBurned((prevState) => {
        const updatedCalories = { ...prevState, [exercise.id]: response.calories_burned };
        const totalCalories = Object.values(updatedCalories).reduce((acc, calories) => acc + calories, 0);
        setTotalCaloriesBurned(totalCalories); // Update total calories burned
        return updatedCalories;
      });
    } catch (error) {
      console.error('Error calculating calories:', error);
    }
  };

  const handleChange = (id, field, value) => {
    const updatedExercises = exercises.map((exercise) =>
      exercise.id === id ? { ...exercise, [field]: value } : exercise
    );
    setExercises(updatedExercises);
  };

  return (
    <div className="bg-gradient-to-r from-blue-500 via-teal-400 to-purple-600 min-h-screen py-12">
      <div className="max-w-6xl mx-auto text-center text-white">
        <h2 className="text-4xl font-extrabold mb-8">My Exercises</h2>
        {exercises.length === 0 ? (
          <p className="text-xl font-bold text-gray-300 mb-8">Select a few exercises to add</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-4 sm:px-6">
            {exercises.map((exercise) => (
              <div key={exercise.id} className="flex justify-center">
                <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 w-full max-w-lg relative z-10">
                  <img
                    src={exercise.gifUrl}
                    alt={exercise.name}
                    className="w-full h-48 object-cover rounded-t-xl"
                  />
                  <div className="p-4">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{exercise.name}</h3>
                    <p className="text-sm text-gray-600 capitalize">{exercise.bodyPart}</p>
                    <div className="mb-4">
                      <input
                        type="number"
                        className="border-2 rounded p-2 mb-2 w-full text-black"
                        placeholder="Duration (min)"
                        value={exercise.duration || ''}
                        onChange={(e) => handleChange(exercise.id, 'duration', e.target.value)}
                      />
                      <input
                        type="number"
                        className="border-2 rounded p-2 mb-2 w-full text-black"
                        placeholder="Weight (kg)"
                        value={exercise.weight || ''}
                        onChange={(e) => handleChange(exercise.id, 'weight', e.target.value)}
                      />
                      <input
                        type="number"
                        className="border-2 rounded p-2 mb-2 w-full text-black"
                        placeholder="Reps"
                        value={exercise.reps || ''}
                        onChange={(e) => handleChange(exercise.id, 'reps', e.target.value)}
                      />
                    </div>

                    <button
                      onClick={() => handleRemoveFromMyExercises(exercise)}
                      className="mt-4 px-6 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors duration-300"
                    >
                      Remove
                    </button>

                    <button
                      onClick={() => handleCalculateCalories(exercise)}
                      className="mt-4 px-6 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors duration-300"
                    >
                      Calculate Calories
                    </button>

                    {caloriesBurned[exercise.id] && (
                      <div className="mt-4 text-lg">
                        <span className="inline-flex items-center bg-green-100 text-green-700 rounded-full px-4 py-2 font-medium">
                          🔥 Calories Burned: {caloriesBurned[exercise.id]} kcal
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {/* Display Total Calories Burned */}
        {totalCaloriesBurned > 0 && (
          <div className="mt-8 text-lg text-white font-semibold">
            <span className="inline-flex items-center bg-purple-700 text-white rounded-full px-4 py-2">
              Total Calories Burned: {totalCaloriesBurned} kcal
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyExercises;
