import { Link } from 'react-router-dom';
import {motion} from 'motion/react';

const Hero = () => {

  return (
    <section
      className="bg-[url('https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80')] 
      bg-cover bg-center h-[600px] flex items-center justify-center text-white relative overflow-hidden"
    >
      {/* Overlay for Better Contrast */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      <div className="relative z-10 text-center px-4">
        <motion.h1 
        initial={{
          opacity:0,
          scale:0.5
        }}
        animate={{
          opacity:1,
          scale:1
        }}
        transition={{
          duration:1,
          delay:0.5
        }}
        className="text-6xl font-extrabold mb-6 drop-shadow-lg">
          Find Your Perfect Home Today
        </motion.h1>

        <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
        className="text-xl font-medium mb-8 drop-shadow-md max-w-2xl mx-auto">
          Discover your dream home with our wide range of properties tailored just for you.
        </motion.p>

        
        <Link
          to="/properties"
          className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-3 rounded-full text-lg font-semibold shadow-lg hover:from-blue-700 hover:to-indigo-700 transition duration-300 ease-in-out transform hover:scale-105"
        >
          Explore Properties
        </Link>
      </div>

      {/* Floating Animation Elements */}
      <div className="absolute top-1/4 left-1/4 w-16 h-16 bg-white bg-opacity-20 rounded-full animate-bounce-slow"></div>
      <div className="absolute bottom-1/4 right-1/4 w-12 h-12 bg-white bg-opacity-20 rounded-full animate-float"></div>
    </section>
  );
};

export default Hero;