import React from "react";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">Welcome to the School System</h1>
      <p className="text-lg text-gray-700 mb-8">
        This is a simple school management system built with React.
      </p>
      <a
        href="/teacher"
        className="px-6 py-2 bg-blue-700 text-white rounded hover:bg-blue-800 transition"
      >
        Go to Teacher Page
      </a>
    </div>
  );
};

export default Home;
