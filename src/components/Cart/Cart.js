import React, { useContext, useEffect, useState } from "react";

import Modal from "../../components/UI/Modal";
import CartItem from "./CartItem";
import classes from "./Cart.module.css";
import CartContext from "../../store/cart-context";
import Checkout from "./Checkout";
const Cart = (props) => {
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const [trackingNum, setTrackingNum] = useState("");
  const [hasError, setHasError] = useState(false);
  const [updatedProducts, setUpdatedProducts] = useState(null);
  const cartCtx = useContext(CartContext);
  const [isLoaded, setIsLoaded] = useState(false);
  const [addedDelivery, setAddedDelivery] = useState({
    deliveryAmount: 0,
    willayaCode: "",
    allowance: "",
  });
  const [itemsAmount, setItemsAmount] = useState(cartCtx.items.length);
  const [globalAmountToPay, setGlobalAmountToPay] = useState("");

  const handleAddedDeliveryForm = (deliveryInfo) => {
    setAddedDelivery({
      deliveryAmount: deliveryInfo.deliveryAmount,
      willayaCode: deliveryInfo.willayaCode,
      allowance: deliveryInfo.allowance,
    });
  };
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem(item);
  };
  useEffect(() => {
    setItemsAmount(cartCtx.items.length);
  }, [cartCtx.items.length]);

  useEffect(() => {
    const totalAmountWithDelivery =
      parseInt(cartCtx.totalAmount) + parseInt(addedDelivery.deliveryAmount);
    const newGlobalAmountToPay = `${
      totalAmountWithDelivery === 0 && itemsAmount === 0
        ? "0"
        : totalAmountWithDelivery
    } Da`;
    if (newGlobalAmountToPay !== "NaN Da"){
      setGlobalAmountToPay(newGlobalAmountToPay);
    }
    
  }, [cartCtx.totalAmount, addedDelivery, itemsAmount]);
  const amountToSend = globalAmountToPay.replace(/da/gi, "");

  const orderHandler = () => {
    setIsCheckout(true);
  };
  function capitalizeFirstLetter(city) {
    return city.charAt(0).toUpperCase() + city.slice(1);
  }
  const itemNames = cartCtx.items.map((item) => item.name);
  const concatenatedItemNames = itemNames.join(", ");
  const itemsId = cartCtx.items.map((item) => item.id);
  const amount = cartCtx.items.map((item) => item.amount);
  const itemsIndex = itemsId.reduce((index, itemId, currentIndex) => {
    index[itemId] = amount[currentIndex];
    return index;
  }, {});

  const submitOrderHandler = async (userData) => {
    const { name, address, city, phone } = userData;
    const commune = capitalizeFirstLetter(city);
    setIsSubmitting(true);

    const apiUrl = `${process.env.REACT_APP_API_URL}/api/v1/create/order?api_token=${process.env.REACT_APP_API_TOKEN}`;

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        reference: "EC2909",
        nom_client: name,
        telephone: phone,
        telephone_2: "",
        adresse: address,
        code_postal: "",
        commune: commune,
        code_wilaya: addedDelivery.willayaCode.toString(),
        montant: amountToSend,
        remarque: "",
        produit: concatenatedItemNames,
        boutique: "16. Dz shop",
        type: "1",
        stop_desk: parseInt(addedDelivery.allowance),
      }),
    };
    
    try {
      const response = await fetch(apiUrl, requestOptions);
      const data = await response.json();
   
      // Handle the response data here
      if (data.success) {
        const trackingNumber = data.tracking;
        setTrackingNum(trackingNumber);
        // Handle success scenario
        setIsSubmitting(false);
        setDidSubmit(true);
        setHasError(false);

        const updateProductsAndSendToServer = () => {
          // Fetch data from the API endpoint
          fetch(`${process.env.REACT_APP_SERVER_URL}/api/data`)
            .then((res) => {
              if (!res.ok) {
                throw new Error("Network response was not ok");
              }
              return res.json();
            })
            .then((data) => {
              // Apply the logic to update products based on itemsIndex
              const updatedData = data.products.map((product) => {
                // Check if the product ID is in the purchased items index
                if (itemsIndex.hasOwnProperty(product.id)) {
                  // Reduce the quantity of the purchased product
                  const updatedQuantity =
                    product.quantity - itemsIndex[product.id];
                  const updatedProduct = {
                    ...product,
                    quantity: updatedQuantity >= 0 ? updatedQuantity : 0,
                  };
                  return updatedProduct;
                }
                return product;
              });

              // Set the updated products state and indicate loading is complete
              setUpdatedProducts(updatedData);
              setIsLoaded(true);

              // Send the updated data to the server
              fetch(`${process.env.REACT_APP_SERVER_URL}/api/update-data`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedData),
              })
                .then((response) => {
                  if (!response.ok) {
                    throw new Error("Network response was not ok");
                  }
                  return response.json();
                })
                
                .catch((error) => {
                  console.error("Error updating data:", error);
                  // Handle error if needed
                });
            })
            .catch((error) => {
              console.error("Error fetching data:", error);
            });
        };

        // Call the function to update products and send data to the server
        updateProductsAndSendToServer();

        // Assuming mergedData contains the updated product information
        // Call the function with the merged data

        cartCtx.clearCart();
      } else {
        setIsSubmitting(false);
        setDidSubmit(true);
        setHasError(true);
      }
    } catch (error) {
      // Handle network or other errors
      console.error("Error:", error);
      setIsSubmitting(false);
      setDidSubmit(true);
      setHasError(true);
    }
  }; // Empty dependency array ensures the effect runs once after the initial render

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          availableQuantity={item.productQuantity}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
          onAddedDelivery={handleAddedDeliveryForm}
        />
      ))}
    </ul>
  );

  const modalActions = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onClose}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );

  const cartModalContent = (
    <React.Fragment>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{globalAmountToPay}</span>
      </div>
      {isCheckout && (
        <Checkout onConfirm={submitOrderHandler} onCancel={props.onClose} />
      )}
      {!isCheckout && modalActions}
    </React.Fragment>
  );

  const isSubmittingModalContent = <p>Sending order data...</p>;

  const didSubmitModalContent = (
    <React.Fragment>
      <p>{`Successfully sent the order! Tracking Number: ${trackingNum}`} </p>
      <div className={classes.actions}>
        <button className={classes.button} onClick={props.onClose}>
          Close
        </button>
      </div>
    </React.Fragment>
  );
  const didNotSubmitModalContent = (
    <React.Fragment>
      <p>
        Failed to send the order. Please check your information and try again.{" "}
      </p>
      <div className={classes.actions}>
        <button className={classes.button} onClick={props.onClose}>
          Close
        </button>
      </div>
    </React.Fragment>
  );

  return (
    <Modal onClose={props.onClose}>
      {!isSubmitting && !didSubmit && cartModalContent}
      {isSubmitting && isSubmittingModalContent}
      {didSubmit && !hasError && didSubmitModalContent}
      {didSubmit && hasError && didNotSubmitModalContent}
    </Modal>
  );
};

export default Cart;
