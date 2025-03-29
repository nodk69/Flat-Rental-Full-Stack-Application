import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Contact = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
        <p className="text-gray-700">
          Have questions? Reach out to us at <strong>support@rentease.com</strong> or call us at
          <strong> +1 (123) 456-7890</strong>.
        </p>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;