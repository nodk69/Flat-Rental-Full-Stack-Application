import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const FAQ = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">FAQs</h1>
        <div className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold">How do I list my property?</h2>
            <p className="text-gray-700">
              Simply sign up, go to your dashboard, and click on "List Property". Fill in the
              details, and your property will be live in minutes!
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold">Is there a fee for using RentEase?</h2>
            <p className="text-gray-700">
              Listing properties is free. We charge a small commission only when a property is
              successfully rented.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FAQ;