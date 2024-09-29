import { ChangeEvent } from 'react';
import { ProductCategoriesInterface } from "../../data/mockData.ts";
import styles from "./Form.module.scss";

interface SelectFieldPropsInterface {
  id: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  options: ProductCategoriesInterface[];
  required?: boolean;
  className?: string; // Добавлен новый пропс
}

const SelectField = ({ id, value, onChange, options, required = true, className = '' }: SelectFieldPropsInterface) => {
  return (
    <div>
      <select
        className={`${styles.form__control} ${className}`} // Применение классов
        id={id}
        value={value}
        onChange={onChange}
        required={required}
      >
        {options.map((option: ProductCategoriesInterface) => (
          <option className={styles.form__option} key={option.value} value={option.value}>
            {option.text}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SelectField;
