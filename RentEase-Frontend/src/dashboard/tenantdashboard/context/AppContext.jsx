import { createContext, useState } from 'react';

// Create the context
export const AppContext = createContext();


// Define the array of featured properties (separate from useState)
export const AppProvider = ({ children }) => {
const featuredPropertiesData = [
  {
    id: 1,
    image_url: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80.jpg",
    price: "₹250,000",
    description: "A beautiful 3-bedroom suburban home with a spacious backyard."
  },
  {
    id: 2,
    image_url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80.jpg",
    price: "₹320,000",
    description: "Modern 2-story house with 4 bedrooms and a swimming pool."
  },
  {
    id: 3,
    image_url: "https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80.jpg",
    price: "₹180,000",
    description: "A cozy 2-bedroom apartment in the city center with great amenities."
  },
  {
    id: 4,
    image_url: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80.jpg",
    price: "₹500,000",
    description: "Luxury villa with 5 bedrooms, a private garden, and a stunning view."
  },
  {
    id: 5,
    image_url: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80.jpg",
    price: "₹1,200,000",
    description: "A commercial building with office spaces and parking facilities."
  },
  {
    id: 6,
    image_url: "https://images.unsplash.com/photo-1605146769289-440113cc3d00?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80.jpg",
    price: "₹210,000",
    description: "Modern 3-bedroom flat with a balcony and city skyline view."
  },
  {
    id: 7,
    image_url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80.jpg",
    price: "₹750,000",
    description: "Elegant mansion with high-end interiors and a private driveway."
  },
  {
    id: 8,
    image_url: "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80.jpg",
    price: "₹175,000",
    description: "Charming countryside cottage with 2 bedrooms and a fireplace."
  },
  {
    id: 9,
    image_url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80.jpg",
    price: "₹600,000",
    description: "Luxury penthouse with panoramic city views and a private terrace."
  },
  {
    id: 10,
    image_url: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80.jpg",
    price: "₹280,000",
    description: "Spacious duplex with a modern kitchen and an open living area."
  }
];

const [featuredProperties, setFeaturedProperties] = useState(featuredPropertiesData);
const [filteredFlats, setFilteredFlats] = useState([]); // Add filteredFlats state

return (
  <AppContext.Provider value={{ featuredProperties, filteredFlats, setFilteredFlats }}>
    {children}
  </AppContext.Provider>
);
};