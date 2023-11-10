import React, { useContext, useEffect, useRef, useState } from "react";
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
  const [cities, setCities] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_URL}/api/cities`)
      .then((res) => res.json())
      .then((result) => {
        setCities(result);
      });
  }, []);
  const communeNamesArray = cities.map((item) => {
    const key = item.commune_name_ascii.toLowerCase();
    const value = item.commune_name.toLowerCase();
    return {
      [key]: value,
    };
  });

  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredCity = cityInputRef.current.value;
    const enteredPhone = phoneInputRef.current.value;

    const enteredCityLowerCase = enteredCity.toLowerCase();

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredStreetIsValid = !isEmpty(enteredStreet);
    const enteredCityIsValid =
      !isEmpty(enteredCity) &&
      communeNamesArray.some((item) => {
        const key = Object.keys(item)[0];
        const value = item[key];
        return key === enteredCityLowerCase || value === enteredCityLowerCase;
      });
    const enteredPhoneIsValid = !isEmpty(enteredPhone);
    let selectedCommune = "";

    if (enteredCityIsValid) {
      const enteredCityLowerCase = enteredCity.toLowerCase();

      const match = communeNamesArray.find((item) => {
        const key = Object.keys(item)[0];
        const value = item[key];
        return value === enteredCityLowerCase;
      });
      

      if (match) {
        selectedCommune = Object.keys(match)[0];
      }else{
        selectedCommune = enteredCityLowerCase
      }
    }
  

    setFormInputsValidity({
      name: enteredNameIsValid,
      street: enteredStreetIsValid,
      city: enteredCityIsValid,
      phone: enteredPhoneIsValid,
    });

    const formIsValid =
      enteredNameIsValid &&
      enteredStreetIsValid &&
      enteredCityIsValid &&
      enteredPhoneIsValid;

    if (!formIsValid) {
      return;
    }
    props.onConfirm({
      name: enteredName,
      address: enteredStreet,
      city: selectedCommune,
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
      
      <div className={cityControlClasses}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityInputRef} />
        {!formInputsValidity.city && <p>Please enter a valid city!</p>}
      </div>
      <div className={phoneControlClasses}>
        <label htmlFor="phone">Your Phone</label>
        <input type="number" id="phone" ref={phoneInputRef} />
        {!formInputsValidity.phone && <p>Please enter a valid phone number!</p>}
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
