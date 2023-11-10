import React from 'react';
import { Link } from 'react-router-dom';

const Card = ({ product }) => {
  return (
    <Link to={`/${product.id}`} className="card hover:shadow-lg transition duration-300 ease-in-out transform hover:scale-105">
      <div className="w-64 h-80 p-4 bg-white rounded-lg shadow-lg flex flex-col justify-between">
        <img className="w-full h-40 object-cover mb-2" src={product.thumbnail} alt={product.name} />
        <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
        <p className="text-gray-600">{product.price}</p>
      </div>
    </Link>
  );
};

export default Card;
