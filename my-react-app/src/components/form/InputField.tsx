import { ChangeEvent, forwardRef } from 'react';
import styles from './Form.module.scss';

interface InputFieldPropsInterface {
  id: string;
  type?: string;
  value?: string;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  placeholder: string;
  required?: boolean;
  textarea?: boolean;
  className?: string; // Добавлен новый пропс
}

const InputField = forwardRef<HTMLInputElement, InputFieldPropsInterface>(
  ({ id, value, type, onChange, placeholder, required = true, textarea = false, className = '' }, ref) => {
    return (
      <div className={styles.form__items}>
        {textarea ? (
          <textarea
            className={`${styles.form__control} ${className}`} // Применение классов
            id={id}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required={required}
            autoComplete="off"
          />
        ) : (
          <input
            ref={ref}
            className={`${styles.form__control} ${className}`} // Применение классов
            id={id}
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required={required}
            autoComplete="off"
          />
        )}
      </div>
    );
  }
);

export default InputField;
