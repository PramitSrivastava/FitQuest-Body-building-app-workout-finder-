import React from 'react';
import { motion } from 'framer-motion';

const ExercisesList = ({ exercises, onAddToMyExercises, addedExercises }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-6">
      {exercises.map((exercise) => (
        <motion.div
          key={exercise.id}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div
            className={`bg-white rounded-lg shadow-md transform hover:scale-105 transition-all duration-300 ${
              addedExercises.includes(exercise) ? 'border-4 border-green-500' : ''
            }`}
          >
            <img src={exercise.gifUrl} alt={exercise.name} className="rounded-t-lg" />
            <div className="p-4">
              <h3 className="text-lg font-bold">{exercise.name}</h3>
              <p className="text-sm text-gray-500 capitalize">{exercise.bodyPart}</p>
              <button
                onClick={() => onAddToMyExercises(exercise)}
                className={`mt-2 px-4 py-2 rounded-full ${
                  addedExercises.includes(exercise) ? 'bg-gray-400' : 'bg-blue-500'
                } text-white`}
                disabled={addedExercises.includes(exercise)}
              >
                {addedExercises.includes(exercise) ? 'Added' : 'Add to My Exercises'}
              </button>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default ExercisesList;
