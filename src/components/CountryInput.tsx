import { ChangeEvent, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import styles from "./CountryInput.module.css";

function filterOptions(inputValue: string, options: string[]) {
  return options.filter((country) =>
    country.toLowerCase().includes(inputValue.toLowerCase()),
  );
}

interface CountryFieldProps {
  onChange?: (country: string) => void;
}

export default function CountryInput({ onChange }: CountryFieldProps) {
  const [value, setValue] = useState<string>("");
  const [options, setOptions] = useState<string[]>([]);
  const countries = useSelector(
    (state: RootState) => state.countries.countries,
  );

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    const inputValue = e.target.value;
    const filteredOptions = filterOptions(inputValue, countries);
    setValue(inputValue);
    setOptions(filteredOptions);
    if (onChange) {
      onChange(inputValue);
    }
  }

  function handleSelectOption(selection: string) {
    setValue(selection);
    setOptions([]);
    if (onChange) {
      onChange(selection);
    }
  }

  return (
    <div className={styles.inputWrapper}>
      <input
        id="country"
        name="country"
        type="text"
        value={value}
        onChange={handleInputChange}
      />
      <Options options={options} onSelect={handleSelectOption} />
    </div>
  );
}

interface OptionsProps {
  options: string[];
  onSelect: (selection: string) => void;
}

function Options({ options, onSelect }: OptionsProps) {
  return (
    options.length > 0 && (
      <ul className={styles.options}>
        {options.map((option) => (
          <OptionItem key={option} value={option} onSelect={onSelect} />
        ))}
      </ul>
    )
  );
}

interface OptionItemProps {
  value: string;
  onSelect: (selection: string) => void;
}

function OptionItem({ value, onSelect }: OptionItemProps) {
  return (
    <li className={styles.optionItem} onClick={() => onSelect(value)}>
      {value}
    </li>
  );
}
