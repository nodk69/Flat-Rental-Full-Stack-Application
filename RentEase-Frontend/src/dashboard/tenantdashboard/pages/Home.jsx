import React from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import SearchBar from "../search/SearchBar"
import Testimonials from "../components/Testimonials";
import WhyChooseUs from "../components/WhyChooseUs";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Hero />
        <SearchBar/>
        <Testimonials />
        <WhyChooseUs />
      </main>
      <Footer />
    </div>
  );
};

export default Home;