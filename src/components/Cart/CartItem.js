import React, { useRef, useState, useEffect, useContext } from "react";
import classes from "./CartItem.module.css";
import classes1 from "./Checkout.module.css";


const isEmpty = (value) => {
  return value === null || value === undefined || value.trim() === "";
};

const CartItem = (props) => {
  const [selectedAllowance, setSelectedAllowance] = useState("1");
  const [formIncomplete, setFormIncomplete] = useState(true);
  const [willaya, setWillaya] = useState("Adrar");
  const [willyaCode, setWillayaCode] = useState("1");
  const [deliveryAmount, setDeliveryAmount] = useState("900");

  const [formInputsValidity, setFormInputsValidity] = useState({
    willayaCode: true,
    allowance: true,
  });
  useEffect(() => {
    // Set initial values after component mounts
    setWillayaCode("1");
    setSelectedAllowance("1");
    setDeliveryAmount("900");
    setWillaya("Adrar")
  }, []);

  useEffect(() => {
    if (willyaCode !== null && willaya !== null && selectedAllowance !== null) {
      const enteredWillayaCode = parseInt(willyaCode.trim());
      const isWillayaCodeValid =
        enteredWillayaCode >= 1 && enteredWillayaCode <= 58;
      const enteredAllowanceIsValid = !isEmpty(selectedAllowance);

      setFormInputsValidity({
        willayaCode: isWillayaCodeValid,
        allowance: enteredAllowanceIsValid,
      });
      setFormIncomplete(!(isWillayaCodeValid && enteredAllowanceIsValid));
      if (
        enteredAllowanceIsValid &&
        isWillayaCodeValid &&
        selectedAllowance === "1" &&
        willaya !== null &&
        willaya !== undefined
      ) {
        setDeliveryAmount(willaya.tarif_stopdesk);
      }
      if (
        enteredAllowanceIsValid &&
        isWillayaCodeValid &&
        selectedAllowance === "0" &&
        willaya !== null &&
        willaya !== undefined
      ) {
        setDeliveryAmount(willaya.tarif);
      }
      props.onAddedDelivery({
        deliveryAmount: deliveryAmount,
        willayaCode: enteredWillayaCode,
        allowance: selectedAllowance
      });
    }
  }, [willyaCode, selectedAllowance, willaya, deliveryAmount]);

  const confirmHandler = (event) => {
    event.preventDefault();
    const enteredWillayaCode = willyaCode.trim();

    const enteredWillayaCodeIsValid = !isEmpty(enteredWillayaCode);
    const enteredAllowanceIsValid = !isEmpty(selectedAllowance);

    setFormInputsValidity({
      willayaCode: enteredWillayaCodeIsValid,
      allowance: enteredAllowanceIsValid,
    });

    setFormIncomplete(!(enteredWillayaCodeIsValid && enteredAllowanceIsValid));
  };

  const handleAddClick = () => {
    // Check if the current amount is less than the available quantity
    if (props.amount < props.availableQuantity && !formIncomplete) {
      props.onAdd();
    }
  };

  const handleRemoveClick = () => {
    if (!formIncomplete) {
      props.onRemove();
    }
  };

  const handleAllowanceChange = (event) => {
    setSelectedAllowance(event.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/api/v1/get/fees?api_token=${process.env.REACT_APP_API_TOKEN}`
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        const selectedWillaya = data.livraison.find(
          (item) => item.wilaya_id === parseInt(willyaCode)
        );
        setWillaya(selectedWillaya);
      } catch (error) {
        // Handle errors occurred during the fetch
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
      }
    };

    fetchData(); // Call the fetchData function when the component mounts
  }, [willyaCode]);

  const willayaCodeControleClasses = `${classes1.control} ${
    formInputsValidity.willayaCode ? "" : classes1.invalid
  }`;
  return (
    <form className={classes1.form} onSubmit={confirmHandler}>
      <li className={classes["cart-item"]}>
        <div>
          <h2>{props.name}</h2>
          <div className={classes.summary}>
            <span className={classes.price}>{props.price}</span>
            <span className={classes.amount}>x {props.amount}</span>
          </div>
          <div className={willayaCodeControleClasses}>
            <label htmlFor="willayaCode">Your Willaya Code</label>
            <input
              type="number"
              id="willayaCode"
              value={willyaCode}
              onChange={(event) => setWillayaCode(event.target.value)}
            />
          </div>
          {/* {formInputsValidity.willayaCode || (
            <p className={`${classes1.boldRed}`}>
              Please enter a valid Willaya Code!
            </p>
          )} */}

          <div className={classes1.radio}>
            <label>Allowance</label>
            <div className={classes1.radioOptions}>
              <input
              
                type="radio"
                id="stop_desk"
                name="allowance"
                value="1"
                checked={selectedAllowance === "1"}
                onChange={handleAllowanceChange}
              />
              <label htmlFor="stop_desk">Stop Desk</label>

              <input
                type="radio"
                id="atDore"
                name="allowance"
                value="0"
                checked={selectedAllowance === "0"}
                onChange={handleAllowanceChange}
              />
              <label htmlFor="atDore">A Domicile</label>
            </div>
          </div>
          {/* {formInputsValidity.allowance || (
            <p className={`${classes1.boldRed}`}>
              Please select an allowance option!
            </p>
          )} */}
        </div>
        <div className={classes.actions}>
          <button onClick={handleRemoveClick} disabled={formIncomplete}>
            −
          </button>
          <button onClick={handleAddClick} disabled={formIncomplete}>
            +
          </button>
        </div>
      </li>
    </form>
  );
};

export default CartItem;
