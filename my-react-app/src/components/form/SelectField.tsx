import {ChangeEvent} from "react"
import {ProductCategoriesInterface} from "../../data/mockData.ts"
import styles from "../../pages/Products.module.scss"

interface SelectFieldPropsInterface {
  id: string,
  value: string,
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void
  options: ProductCategoriesInterface[],
  required?: boolean,
}

const SelectField = ({id, value, onChange, options, required = true}: SelectFieldPropsInterface) => {
  return (
    <div className={styles.form__group}>
      <select
        className="form-control"
        id={id}
        value={value}
        onChange={onChange}
        required={required}
      >

        {options.map((option: ProductCategoriesInterface) => (
          <option key={option.value} value={option.value}>
            {option.text}
          </option>
        ))}
      </select>
    </div>
  )
}

export default SelectField