import React from "react";

const Header = () => {
  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center ">
      <h1 className="text-xl tracking-tighter">SCHOOL SYSTEM</h1>
      <nav>
        <ul className="flex space-x-4">
          <li>
            <a href="/" className="hover:text-gray-300">
              Home
            </a>
          </li>
          <li>
            <a href="/teacher" className="hover:text-gray-300">
              Teacher
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
