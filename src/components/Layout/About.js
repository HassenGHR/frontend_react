import React from "react";

const About = () => {
  return (
    <div className="container mx-auto my-8 p-8 bg-white shadow-lg rounded-lg">
      <div className="flex flex-col md:flex-row items-center border border-gray-300 rounded p-4">
        <div className="w-full md:w-1/2 pr-8">
          <h1 className="text-3xl font-semibold mb-6 p-3">About Us</h1>
          <div className="text-lg mb-4">
            <p>
              Welcome to AutoNav, your trusted source for high-quality auto parts and accessories. We are dedicated to providing our customers with top-notch products to enhance the performance and appearance of their vehicles.
            </p>
            <p>
              At AutoNav, we specialize in offering a wide range of auto parts, from vehicle trackers to exterior accessories. Our team of experts carefully selects each product to ensure durability, reliability, and exceptional performance.
            </p>
            <p>
              Customer satisfaction is our priority, and we strive to deliver outstanding service along with our premium products. Whether you are a car enthusiast, a mechanic, or a vehicle owner, you can rely on us to provide you with the parts you need to keep your vehicle in top condition.
            </p>
            <p>
              Thank you for choosing AutoNav for your auto parts needs. We look forward to serving you and contributing to your automotive journey.
            </p>
          </div>
        </div>
        <div className="w-full md:w-1/2">
          <img
            className="hover:grow hover:shadow-lg mb-6 max-w-full border border-gray-300 rounded"
            src='https://webdesign.maximus.com.my/wp-content/uploads/2017/06/e-commerce.jpg'
            alt='ecommerce'
          />
        </div>
      </div>
    </div>
  );
};

export default About;
