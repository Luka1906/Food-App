import React from "react";
import classes from "./Checkout.module.css";
import useForm from "../../hooks/use-form";

const Checkout = (props) => {
  // Name Input

  const {
    value: enteredName,
    isValid: nameIsValid,
    hasError: nameHasError,
    valueInputHandler: nameInputHandler,
    inputBlurHandler: nameBlurHandler,
    reset: nameReset,
  } = useForm((value) => value.trim() !== "");

  //   Street Input

  const {
    value: enteredStreet,
    isValid: streetIsValid,
    hasError: streetHasError,
    valueInputHandler: streetInputHandler,
    inputBlurHandler: streetBlurHandler,
    reset: streetReset,
  } = useForm((value) => value.trim() !== "");

  const {
    value: enteredPostal,
    isValid: postalIsValid,
    hasError: postalHasError,
    valueInputHandler: postalInputHandler,
    inputBlurHandler: postalBlurHandler,
    reset: postalReset,
  } = useForm((value) => value.trim().length === 5);

  const {
    value: enteredCity,
    isValid: cityIsValid,
    hasError: cityHasError,
    valueInputHandler: cityInputHandler,
    inputBlurHandler: cityBlurHandler,
    reset: citylReset,
  } = useForm((value) => value.trim() !== "");

  const submitHandler = (event) => {
    event.preventDefault();
    if (!nameIsValid && !streetIsValid && !postalIsValid && !cityIsValid) {
      return;
    }
    nameReset();
    streetReset();
    postalReset();
    citylReset();

    props.onConfirm({
      name:enteredName,
      street: enteredStreet,
      postal: enteredPostal,
      city: enteredCity
  
    });
  };

  let formIsValid = false;

  if (nameIsValid && streetIsValid && postalIsValid && cityIsValid) {
    formIsValid = true;
  }

  

  //   Classes
  const nameControlClasses = `${classes.control} ${
    nameHasError ? classes.invalid : ""
  }`;
  const streetControlClasses = `${classes.control} ${
    streetHasError ? classes.invalid : ""
  }`;
  const postalControlClasses = `${classes.control} ${
    postalHasError ? classes.invalid : ""
  }`;

  const cityControlClasses = `${classes.control} ${
    cityHasError ? classes.invalid : ""
  }`;

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={nameControlClasses}>
        <label htmlFor="name">Your name</label>
        <input
          value={enteredName}
          type="text"
          id="name"
          onChange={nameInputHandler}
          onBlur={nameBlurHandler}
        ></input>
        {nameHasError && <p>Name is not valid!</p>}
      </div>

      <div className={streetControlClasses}>
        <label htmlFor="street">Street</label>
        <input
          type="text"
          id="street"
          value={enteredStreet}
          onChange={streetInputHandler}
          onBlur={streetBlurHandler}
        ></input>
        {streetHasError && <p>Street is not valid!</p>}
      </div>

      <div className={postalControlClasses}>
        <label htmlFor="postal">Postal Code</label>
        <input
          type="text"
          id="postal"
          value={enteredPostal}
          onChange={postalInputHandler}
          onBlur={postalBlurHandler}
        ></input>
        {postalHasError && (
          <p>Postal code is not valid(must be 5 characters long!)</p>
        )}
      </div>

      <div className={cityControlClasses}>
        <label htmlFor="city">City</label>
        <input
          type="text"
          id="city"
          value={enteredCity}
          onChange={cityInputHandler}
          onBlur={cityBlurHandler}
        ></input>
        {postalHasError && <p>City is not valid!</p>}
      </div>

      <div className={classes.actions}>
        <button onClick={props.onCancel} type="button">
          Cancel
        </button>
        <button disabled={!formIsValid} className={classes.submit}>
          Confirm
        </button>
      </div>
    </form>
  );
};

export default Checkout;
