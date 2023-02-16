import React, { useState, useEffect } from 'react';

interface ValidationType {
    minLength: number;
    maxLength: number;
    valueInitial: string;
}

const useValidationInput = ({
    minLength,
    maxLength,
    valueInitial,
}: ValidationType) => {
    const [error, setError] = useState<boolean>();
    const [min, setMin] = useState<number>(minLength);
    const [max, setMax] = useState<number>(maxLength);
    const [value, setValueForValid] = useState(valueInitial);

    // const minLengthValidation = (value: string): void => {
    //     if (value.length < min) {
    //         setError(true);
    //     }
    // }

    // const maxLengthValidation = (value: string): void => {
    //     if (value.length > max) {
    //         setError(true);
    //     }
    // }

    useEffect(() => {
        // if (min) {
        //     if (value.length < min) {
        //         console.log(222);
        //         setError(() => true);
        //     }
        // }

        if (max) {
            if (value.length > max) {
                console.log(111);
                setError(() => true);
            }
        }

        setError(false);
    }, [min, max, value]);

    const test = () => error;

    return { test, setMin, setMax, setValueForValid };
};

export default useValidationInput;
