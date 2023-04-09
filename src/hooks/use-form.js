import { useState } from "react";

const useForm = (validatedValue) => {
    const [enteredValue, setEnteredValue] = useState("");
    const [isTouched, setIsTouched] = useState(false);

    const valueIsValid = validatedValue(enteredValue);
    const hasError = !valueIsValid && isTouched;

    const valueInputHandler = event => {
        setEnteredValue(event.target.value)
    };

    const inputBlurHandler = event => {
        setIsTouched(true)
    };

    const reset = () => {
        setEnteredValue("")
        setIsTouched(false)
    };

    return {
        value: enteredValue,
        isValid: valueIsValid,
        hasError: hasError,
        valueInputHandler,
        inputBlurHandler,
        reset
    }




}

export default useForm