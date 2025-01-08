import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { DndContext, useDraggable, useDroppable, closestCenter } from "@dnd-kit/core"; // Import necessary DnD hooks
import img1 from "../assets/image1.jpg";
import img2 from "../assets/image2.jpg";
import img3 from "../assets/image3.jpg";
import img4 from "../assets/image4.jpg";
import img5 from "../assets/image5.jpg";

const images = [
  { id: "1", src: img1 },
  { id: "2", src: img2 },
  { id: "3", src: img3 },
  { id: "4", src: img4 },
  { id: "5", src: img5 },
];

const LandingPage = () => {
  const [imageList, setImageList] = useState(images);

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over) {
      console.log("Dropped outside any valid target");
      return;
    }

    const activeIndex = imageList.findIndex((item) => item.id === active.id);
    const overIndex = imageList.findIndex((item) => item.id === over.id);

    // Only swap if the active item is dropped on a different item
    if (activeIndex !== overIndex) {
      const updatedList = [...imageList];
      updatedList.splice(activeIndex, 1);
      updatedList.splice(overIndex, 0, imageList[activeIndex]);
      setImageList(updatedList);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="w-full bg-gradient-to-r from-purple-600 to-blue-500 text-white p-6 mb-0 absolute top-0 left-0 z-10">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold">FitQuest</h1>
          <div>
            <Link to="/select-body-part" className="text-lg font-semibold hover:text-teal-300 transition duration-300">
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow bg-black pt-10 pb-10 text-white ">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="flex flex-col items-center"
        >
          <h2 className="text-3xl font-bold text-center mb-4">
            Welcome to the FitQuest! Your Personal Fitness Guide
          </h2>
          <p className="text-lg text-center mb-6">
            Explore and track your exercises for a better workout routine.
          </p>

          <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCenter}>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
              {imageList.map((image) => (
                <DraggableImage key={image.id} id={image.id} src={image.src} />
              ))}
            </div>
          </DndContext>

          <div className="flex justify-center">
            <Link
              to="/select-body-part"
              className="bg-teal-500 text-white px-6 py-3 rounded-lg text-xl font-semibold hover:bg-teal-600 transition duration-300"
            >
              Get Started
            </Link>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

const DraggableImage = ({ id, src }) => {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: id,
  });

  const { setNodeRef: setDroppableRef } = useDroppable({
    id: id,
  });

  // Define styles for when the image is being dragged
  const imageStyle = isDragging
    ? {
        transform: "scale(1.2)", // Enlarge the image during dragging
        zIndex: 999, // Bring it to the top layer
      }
    : {};

  return (
    <div
      ref={(node) => {
        setNodeRef(node);
        setDroppableRef(node); // Ensure that this image can be a drop target
      }}
      {...listeners}
      {...attributes}
      className="w-full h-auto rounded-lg shadow-md transition-transform duration-300 ease-in-out"
      style={imageStyle}
    >
      <img src={src} alt={`Exercise ${id}`} className="w-full h-full object-cover" />
    </div>
  );
};

export default LandingPage;
