import React, { useState, useEffect } from 'react';

const HealthHub = () => {
  const [articles, setArticles] = useState([]);

  // Fetch blog articles from a local JSON file or API
  useEffect(() => {
    fetch('/data/blogPosts.json') // Replace with your API or local JSON file
      .then((response) => response.json())
      .then((data) => setArticles(data))
      .catch((error) => console.error('Error fetching articles:', error));
  }, []);

  return (
    <div className="bg-gradient-to-r from-blue-500 via-teal-400 to-purple-600 min-h-screen py-12">
      <div className="max-w-6xl mx-auto text-center text-white">
        <h1 className="text-5xl font-extrabold mb-4">Health Hub</h1>
        <p className="text-xl mb-10">
          Explore the latest health and wellness articles from our blog.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <div
              key={article.id}
              className="bg-white shadow-lg rounded-xl p-6 hover:shadow-2xl hover:transform hover:scale-105 transition-all duration-300 ease-in-out"
            >
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-56 object-cover rounded-lg mb-6"
              />
              <h2 className="text-3xl font-semibold text-gray-800 mb-3 hover:text-teal-600 transition-colors duration-300">
                {article.title}
              </h2>
              <p className="text-gray-600 text-lg mb-4">
                {article.description.substring(0, 100)}...
              </p>
              <a
                href={article.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 font-medium hover:text-blue-800 transition-colors duration-300"
              >
                Know more
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HealthHub;
