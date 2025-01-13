// App.jsx
import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import SelectedBodyPart from "./components/SelectedBodyPart";
import MyExercises from "./components/MyExercises";
import LandingPage from "./components/LandingPage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HealthHub from "./components/HealthHub";
import Login from "./components/Login";
import Register from "./components/Register";
import { fetchMessage } from "./api";

const App = () => {
  const [selectedBodyPart, setSelectedBodyPart] = useState("");
  const [difficulty, setDifficulty] = useState("All");
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [myExercises, setMyExercises] = useState([]);
  const [addedExercises, setAddedExercises] = useState([]);
  const [message, setMessage] = useState("");
  const [search, setSearch] = useState(""); // Search state added

  useEffect(() => {
    const savedDarkMode = localStorage.getItem("darkMode");
    if (savedDarkMode !== null) {
      setDarkMode(JSON.parse(savedDarkMode));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  useEffect(() => {
    const getData = async () => {
      const data = await fetchMessage();
      setMessage(data.message);
    };
    getData();
  }, []);

  return (
    <Router>
      <RoutesWrapper
        selectedBodyPart={selectedBodyPart}
        setSelectedBodyPart={setSelectedBodyPart}
        difficulty={difficulty}
        setDifficulty={setDifficulty}
        myExercises={myExercises}
        setMyExercises={setMyExercises}
        addedExercises={addedExercises}
        setAddedExercises={setAddedExercises}
        loading={loading}
        setLoading={setLoading}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        message={message}
        search={search} // Pass search state to RoutesWrapper
        setSearch={setSearch} // Pass setSearch to RoutesWrapper
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
  message,
  search,
  setSearch,
}) => {
  const location = useLocation();
  const isLandingPage = location.pathname === "/";

  return (
    <div
      className={`flex flex-col min-h-screen ${
        darkMode ? "bg-black text-white" : "bg-cyan-300 text-black"
      }`}
    >
      {!isLandingPage && (
        <Header darkMode={darkMode} setDarkMode={setDarkMode} />
      )}

      <main className="flex-grow pt-20">
        <div className="container mx-auto">
          {/* <p>{message}</p> */}

          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/select-body-part"
              element={
                <SelectedBodyPart
                  selectedBodyPart={selectedBodyPart}
                  setSelectedBodyPart={setSelectedBodyPart}
                  myExercises={myExercises}
                  setMyExercises={setMyExercises}
                  addedExercises={addedExercises}
                  setAddedExercises={setAddedExercises}
                  loading={loading}
                  setLoading={setLoading}
                  setSearch={setSearch} // Pass setSearch here
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
            <Route
              path="/my-exercises"
              element={
                <MyExercises
                  myExercises={myExercises}
                  setMyExercises={setMyExercises}
                />
              }
            />
            <Route path="/health-hub" element={<HealthHub />} />
          </Routes>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default App;
