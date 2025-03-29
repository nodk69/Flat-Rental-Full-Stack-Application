import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const About = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">About Us</h1>
        <p className="text-gray-700">
          We are a leading property rental platform dedicated to helping you find your dream home or
          list your property with ease. Our mission is to simplify the rental process for everyone.
        </p>
      </main>
      <Footer />
    </div>
  );
};

export default About;