import React, { useState, useEffect, useRef, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CartContext from "../store/cart-context";
import AuthContext from "../store/auth-context";
const ProductDetails = () => {
  const { productId } = useParams();

  const [product, setProduct] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [quantityOrdered, setQuantityOrdered] = useState(1);
  const [amountIsValid, setAmountIsValid] = useState(true);
  const cartCtx = useContext(CartContext);
  const {isAuthenticated} = useContext(AuthContext);
const navigate = useNavigate()
  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_URL}/api/data`)
      .then((res) => res.json())
      .then((data) => {
        const selectedProduct = data.products.find(
          (item) => item.id === parseInt(productId)
        );

        setProduct(selectedProduct);
        setIsLoaded(true);
      });
  }, [productId]);

  const submitHandler = (event) => {
    event.preventDefault();
    if (!isAuthenticated) {
      // Redirect to the login page if not authenticated
      navigate('/login');
    } else {
    const cleanedPrice = parseFloat(product.price.replace("da", ""));
    const totalQuantityInCart = cartCtx.items.reduce((total, item) => {
      if (item.id === product.id) {
        return total + item.amount;
      }
      return total;
    }, 0);

    // Check if the total quantity in the cart plus the quantity being added exceeds the available quantity
    if (totalQuantityInCart >= product.quantity) {
      setAmountIsValid(false);
      return;
    }

    cartCtx.addItem({
      id: product.id,
      name: product.name,
      amount: quantityOrdered,
      price: cleanedPrice,
      productQuantity: product.quantity,
    });
  };}

  if (!isLoaded) {
    return <div>Loading...</div>;
  }
  const handleCloseError = () => {
    setAmountIsValid(true);
  };

  return (
    <div className="flex justify-around p-8">
      <div className="flex flex-col items-center">
        <h1 className="text-3xl font-semibold mb-4">{product.name}</h1>
        <img
          className="w-64 h-64 object-cover mb-4"
          src={product.thumbnail}
          alt={product.name}
        />
      </div>
      <div className="flex flex-col items-start">
        <p className="text-xl font-medium mb-4">Category: {product.category}</p>
        <p className="text-xl font-medium mb-4">Price: {product.price}</p>
        <button
          className="bg-gray-800 hover:bg-red-800 text-white font-semibold py-2 px-4 rounded"
          onClick={submitHandler}
        >
          Add to Cart
        </button>
        {!amountIsValid && (
          <div className="bg-red-900 text-white p-4 my-4 rounded">
            <p>
              Sorry, insufficient quantity. There are only {product.quantity}{" "}
              left.
            </p>
            <button
              className="mt-2 bg-white text-red-500 hover:text-red-700 font-bold py-2 px-4 rounded"
              onClick={handleCloseError}
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
