import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Card from "../components/Card";
import Loader from "../components/Layout/Louder";

const Home = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_URL}/api/data`) // Replace this URL with your API endpoint URL
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((result) => {
        setIsLoaded(true);
        setProducts(result.products);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  return (
    <div>
      <section className="bg-white py-8">
        <div className="container mx-auto flex  pt-4 pb-12 justify-center">
          {!isLoaded ? (
            <Loader />
          ) : (
            <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-3 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 ">
              {products.map((product) => (
                <Card key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
