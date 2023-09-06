import React from 'react';
import {  useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom

function Home() {
  const navigate = useNavigate(); // Initialize the navigate function

  const handleLogoClick = () => {
    // Navigate to the /capture route when the logo is clicked
    navigate('/capture');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-800">
      <div className="text-center">
        <h1 className="text-3xl font-semibold mb-4">Welcome to Web Cam App</h1>
        <div className="bg-white p-8 rounded-lg shadow-md">
          {/* Wrap the SVG and text in an anchor tag */}
          <a onClick={handleLogoClick} className="cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="w-24 h-24" // Set width and height here
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z"
              />
            </svg>
            <p className="text-gray-600">Capture your pic</p>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Home;
