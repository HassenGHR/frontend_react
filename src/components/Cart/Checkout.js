import React, { useRef, useState } from "react";
import classes from "./Checkout.module.css";

const isEmpty = (value) => value.trim() === "";

const Checkout = (props) => {

  const [formInputsValidity, setFormInputsValidity] = useState({
    name: true,
    street: true,
    city: true,
    phone: true,
  });

  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const cityInputRef = useRef();
  const phoneInputRef = useRef();
  const [selectedCity, setSelectedCity] = useState("");

  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPhone = phoneInputRef.current.value;

    setFormInputsValidity({
      name: !isEmpty(enteredName),
      street: !isEmpty(enteredStreet),
      city: !isEmpty(selectedCity),
      phone: !isEmpty(enteredPhone),
    });

    const formIsValid =
      !isEmpty(enteredName) &&
      !isEmpty(enteredStreet) &&
      !isEmpty(selectedCity) &&
      !isEmpty(enteredPhone);

    if (!formIsValid) {
      return;
    }
    props.onConfirm({
      name: enteredName,
      address: enteredStreet,
      city: selectedCity,
      phone: enteredPhone,
    });
  };

  const nameControlClasses = `${classes.control} ${
    formInputsValidity.name ? "" : classes.invalid
  }`;
  const streetControlClasses = `${classes.control} ${
    formInputsValidity.street ? "" : classes.invalid
  }`;
  
  const cityControlClasses = `${classes.control} ${
    formInputsValidity.city ? "" : classes.invalid
  }`;
  const phoneControlClasses = `${classes.control} ${
    formInputsValidity.phone ? "" : classes.invalid
  }`;

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameControlClasses}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameInputRef} />
        {!formInputsValidity.name && <p>Please enter a valid name!</p>}
      </div>
      <div className={streetControlClasses}>
        <label htmlFor="street">ِAddress</label>
        <input type="text" id="street" ref={streetInputRef} />
        {!formInputsValidity.street && <p>Please enter a valid Address!</p>}
      </div>
      
     
      <div className={phoneControlClasses}>
        <label htmlFor="phone">Your Phone</label>
        <input type="number" id="phone" ref={phoneInputRef} />
        {!formInputsValidity.phone && <p>Please enter a valid phone number!</p>}
      </div>
      <div className={cityControlClasses}>
        <label htmlFor="city">City</label>
        <select id="city" ref={cityInputRef} onChange={(event) => setSelectedCity(event.target.value)}>
          <option value="" disabled selected>
            Select a city
          </option>
          {props.selectedCommunes.map((commune) => (
            <option key={commune.nom} value={commune.nom}>
              {commune.nom}
            </option>
          ))}
        </select>
        {!formInputsValidity.city && <p>Please select a valid city!</p>}
      </div>

      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
