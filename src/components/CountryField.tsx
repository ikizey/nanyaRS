import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { UseFormRegisterReturn } from "react-hook-form";
import styles from "./CountryField.module.css";

interface CountryFieldProps {
  inputProps?: UseFormRegisterReturn;
  setFormValue?: (country: string) => void;
}

export default function CountryField({
  inputProps,
  setFormValue,
}: CountryFieldProps) {
  const [value, setValue] = useState<string>("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const countries = useSelector(
    (state: RootState) => state.countries.countries,
  );

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const inputValue = e.target.value;

    setValue(inputValue);

    if (inputValue.length > 0) {
      const filteredSuggestions = countries
        .filter((country) =>
          country.toLowerCase().includes(inputValue.toLowerCase()),
        )
        .slice(0, 10);
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  }

  function handleSelectSuggestion(country: string) {
    setValue(country);
    setSuggestions([]);
    if (setFormValue) {
      setFormValue(country);
    }
  }

  return (
    <div className={styles.container}>
      <label htmlFor="country">Country:</label>
      <div className={styles.inputWrapper}>
        <input
          id="country"
          name="country"
          type="text"
          {...inputProps}
          value={value}
          onChange={handleInputChange}
        />
        {suggestions.length > 0 && (
          <ul className={styles.suggestions}>
            {suggestions.map((country, index) => (
              <li
                key={index}
                className={styles.suggestionItem}
                onClick={() => handleSelectSuggestion(country)}
              >
                {country}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
