import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-12">
      <div className="container mx-auto px-4">
        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Section */}
          <div>
            <h3 className="text-xl font-bold mb-4">COMPANY</h3>
            <ul className="space-y-2 text-gray-200">
              <li>
                <a href="/about-us" className="hover:text-yellow-300 transition duration-300">
                  About Us
                </a>
              </li>
              <li>
                <a href="/careers" className="hover:text-yellow-300 transition duration-300">
                  Careers
                </a>
              </li>
              <li>
                <a href="/contact-us" className="hover:text-yellow-300 transition duration-300">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="/terms" className="hover:text-yellow-300 transition duration-300">
                  Terms & Conditions
                </a>
              </li>
            </ul>
          </div>

          {/* Resources Section */}
          <div>
            <h3 className="text-xl font-bold mb-4">RESOURCES</h3>
            <ul className="space-y-2 text-gray-200">
              <li>
                <a href="#" className="hover:text-yellow-300 transition duration-300">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-yellow-300 transition duration-300">
                  Real Estate Guide
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-yellow-300 transition duration-300">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Connect Section */}
          <div>
            <h3 className="text-xl font-bold mb-4">CONNECT WITH US</h3>
            <div className="flex flex-col space-y-2 text-gray-200">
              <p>Write to us at:</p>
              <a href="mailto:connect@renteasy.com" className="hover:text-yellow-300 transition duration-300">
                connect@rentease.com
              </a>
              <p>Existing Clients:</p>
              <a href="mailto:customercare@renteasy.com" className="hover:text-yellow-300 transition duration-300">
                customercare@rentease.com
              </a>
            </div>
          </div>
        </div>

        {/* Social Media */}
        <div className="mt-8 border-t border-gray-300 pt-8 text-center">
          <h3 className="text-xl font-bold mb-4">FOLLOW US</h3>
          <div className="flex justify-center space-x-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-yellow-300 transition duration-300 ease-in-out"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"
                />
              </svg>
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-yellow-300 transition duration-300 ease-in-out"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"
                />
              </svg>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-yellow-300 transition duration-300 ease-in-out"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4z"
                />
              </svg>
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 text-center text-sm text-gray-300">
          &copy; 2025 RentEase. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;