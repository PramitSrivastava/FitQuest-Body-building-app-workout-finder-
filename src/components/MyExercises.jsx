import React from 'react';
import { motion } from 'framer-motion';

const MyExercises = ({ myExercises, handleRemoveFromMyExercises, addedExercise }) => {
  return (
    <div className="bg-gradient-to-r from-blue-500 via-teal-400 to-purple-600 min-h-screen py-12">
      <div className="max-w-6xl mx-auto text-center text-white">
        <h2 className="text-4xl font-extrabold mb-8">My Exercises</h2>
        {/* Check if no exercises are selected */}
        {myExercises.length === 0 ? (
          <p className="text-xl font-bold text-gray-300 mb-8">
            Select a few exercises to add
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-4 sm:px-6">
            {myExercises.map((exercise) => (
              <motion.div
                key={exercise.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex justify-center"
              >
                <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 w-full max-w-md relative z-10">
                  <img
                    src={exercise.gifUrl}
                    alt={exercise.name}
                    className="w-full h-64 object-cover rounded-t-xl"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{exercise.name}</h3>
                    <p className="text-sm text-gray-600 capitalize">{exercise.bodyPart}</p>
                    {/* Remove Button */}
                    <button
                      onClick={() => handleRemoveFromMyExercises(exercise)}
                      className="mt-4 px-6 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors duration-300"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {addedExercise && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="absolute bottom-8 right-8 p-6 bg-green-500 text-white rounded-full shadow-lg flex items-center justify-center space-x-2"
          >
            <p className="text-lg font-semibold">Exercise added: {addedExercise.name}</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default MyExercises;
