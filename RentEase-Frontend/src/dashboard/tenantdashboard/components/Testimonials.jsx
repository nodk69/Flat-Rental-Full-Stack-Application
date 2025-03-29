import React from "react";

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Alice Johnson",
      review:
        "This rental app made finding a new home so easy! The listings are accurate, and the booking process was seamless.",
      image: "https://randomuser.me/api/portraits/women/1.jpg",
    },
    {
      id: 2,
      name: "Michael Smith",
      review:
        "Great experience! The app helped me find a cozy apartment in my budget. Highly recommended!",
      image: "https://randomuser.me/api/portraits/men/2.jpg",
    },
    {
      id: 3,
      name: "Sophia Martinez",
      review:
        "I love how user-friendly this app is. The filters helped me find the perfect place quickly.",
      image: "https://randomuser.me/api/portraits/women/3.jpg",
    },
    {
      id: 4,
      name: "David Brown",
      review:
        "I was able to rent an amazing place within days. The customer support is also very responsive.",
      image: "https://randomuser.me/api/portraits/men/4.jpg",
    },
    {
      id: 5,
      name: "Emily Wilson",
      review:
        "The best rental app I’ve used! Everything was smooth, from searching to signing the lease.",
      image: "https://randomuser.me/api/portraits/women/5.jpg",
    },
  ];

  return (
    <section className="bg-gradient-to-b from-gray-100 to-white py-16">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-12">
          What Our Users Say?
        </h2>

        {/* Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 ease-in-out transform hover:-translate-y-1"
            >
              {/* User Image and Name */}
              <div className="flex items-center mb-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full border-4 border-blue-500 object-cover mr-4"
                />
                <div>
                  <h3 className="text-xl font-bold text-gray-800">
                    {testimonial.name}
                  </h3>
                  <p className="text-sm text-gray-500">Happy Customer</p>
                </div>
              </div>

              {/* Review */}
              <p className="text-gray-700 leading-relaxed">
                "{testimonial.review}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;