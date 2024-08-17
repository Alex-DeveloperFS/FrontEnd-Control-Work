import {ChangeEvent, forwardRef} from "react";

interface InputFieldPropsInterface {
  id: string,
  type?: string,
  value?: string,
  onChange?: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
  placeholder: string,
  required?: boolean,
  textArea?: boolean,
}

const InputField = forwardRef<HTMLInputElement, InputFieldPropsInterface>(({id, type, value, onChange, placeholder, required = true, textArea = false}, ref) => {

    return (
      <div className="form-group">
        <label
          className="form-label"
          htmlFor="id">
          {id.charAt(0).toUpperCase() + id.slice(1)}:
        </label>

        {textArea ? (
          <textarea
            className="form-control"
            id={id}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required={required}
          />
        ) : (
          <input
            ref={ref}
            className="form-control"
            id={id}
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required={required}
          />
        )}
      </div>
    )
  }
)
export default InputField