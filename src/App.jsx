import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import SelectedBodyPart from './components/SelectedBodyPart';
import MyExercises from './components/MyExercises';
import LandingPage from './components/LandingPage';
import Header from './components/Header';
import Footer from './components/Footer';

const App = () => {
  const [selectedBodyPart, setSelectedBodyPart] = useState('');
  const [difficulty, setDifficulty] = useState('All'); // Add difficulty state
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(true); // Set dark mode to true by default
  const [myExercises, setMyExercises] = useState([]);
  const [addedExercises, setAddedExercises] = useState([]);

  // When the app starts, check localStorage for saved darkMode preference
  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode !== null) {
      setDarkMode(JSON.parse(savedDarkMode)); // Use the saved value if it exists
    }
  }, []);

  // Persist darkMode state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  return (
    <Router>
      <RoutesWrapper
        selectedBodyPart={selectedBodyPart}
        setSelectedBodyPart={setSelectedBodyPart}
        difficulty={difficulty} // Pass difficulty state
        setDifficulty={setDifficulty} // Pass setDifficulty function
        myExercises={myExercises}
        setMyExercises={setMyExercises}
        addedExercises={addedExercises}
        setAddedExercises={setAddedExercises}
        loading={loading}
        setLoading={setLoading}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />
    </Router>
  );
};

const RoutesWrapper = ({
  selectedBodyPart,
  setSelectedBodyPart,
  difficulty,
  setDifficulty,
  myExercises,
  setMyExercises,
  addedExercises,
  setAddedExercises,
  loading,
  setLoading,
  darkMode,
  setDarkMode,
}) => {
  const location = useLocation();
  const isLandingPage = location.pathname === '/';

  return (
    <div className={`flex flex-col min-h-screen ${darkMode ? 'bg-black text-black' : 'bg-cyan-300 text-black'}`}>
      {/* Conditionally render the Header */}
      {!isLandingPage && <Header darkMode={darkMode} setDarkMode={setDarkMode} />}

      {/* Main content with flex-grow to push the footer to the bottom */}
      <main className="flex-grow pt-20">
        <div className="container mx-auto">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route
              path="/select-body-part"
              element={
                <SelectedBodyPart
                  selectedBodyPart={selectedBodyPart}
                  setSelectedBodyPart={setSelectedBodyPart}
                  difficulty={difficulty} // Pass difficulty state to SelectedBodyPart
                  setDifficulty={setDifficulty} // Pass setDifficulty function
                  myExercises={myExercises}
                  setMyExercises={setMyExercises}
                  addedExercises={addedExercises}
                  setAddedExercises={setAddedExercises}
                  loading={loading}
                  setLoading={setLoading}
                />
              }
            />
            <Route
              path="/my-exercises"
              element={
                <MyExercises
                  myExercises={myExercises}
                  handleRemoveFromMyExercises={(exercise) => {
                    setMyExercises((prevExercises) =>
                      prevExercises.filter((item) => item.id !== exercise.id)
                    );
                    setAddedExercises((prevAdded) =>
                      prevAdded.filter((item) => item.id !== exercise.id)
                    );
                  }}
                />
              }
            />
          </Routes>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default App;
