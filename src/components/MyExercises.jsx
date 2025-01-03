import React from 'react';
import { motion } from 'framer-motion';

const MyExercises = ({ myExercises, handleRemoveFromMyExercises, addedExercise }) => {
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold">My Exercises</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-6">
        {myExercises.map((exercise) => (
          <motion.div
            key={exercise.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            exit={{ opacity: 0 }}
          >
            <div className="bg-white rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300">
              <img src={exercise.gifUrl} alt={exercise.name} className="rounded-t-lg" />
              <div className="p-4">
                <h3 className="text-lg font-bold">{exercise.name}</h3>
                <p className="text-sm text-gray-500 capitalize">{exercise.bodyPart}</p>
                {/* Remove Button */}
                <button
                  onClick={() => handleRemoveFromMyExercises(exercise)}
                  className="mt-2 px-4 py-2 bg-red-500 text-white rounded-full"
                >
                  Remove
                </button>
              </div>
            </div>
          </motion.div>
        ))}
        {addedExercise && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="absolute bottom-8 right-8 p-4 bg-green-500 text-white rounded-full"
          >
            <p>Exercise added: {addedExercise.name}</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default MyExercises;
