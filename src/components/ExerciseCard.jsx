import React from 'react';

const ExerciseCard = ({ exercise }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300">
      <img
        src={exercise.gifUrl}
        alt={exercise.name}
        className="rounded-lg w-full mb-4"
      />
      <h3 className="text-lg font-semibold text-gray-800">{exercise.name}</h3>
      <p className="text-sm text-gray-600">Target: {exercise.target}</p>
    </div>
  );
};

export default ExerciseCard;
