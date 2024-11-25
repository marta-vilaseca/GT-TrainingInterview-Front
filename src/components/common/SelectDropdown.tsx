// src/components/common/SelectDropdown.tsx
import { FormSelectProps } from '../../types/IFormElements';
import './FormElements.scss';

export default function FormSelect({
  id,
  className,
  labelText,
  name,
  value,
  onChange,
  options,
  hidden = false,
  required = false,
}: FormSelectProps) {
  return (
    <>
      <label className="form__text" hidden={hidden}>
        {labelText}
      </label>
      <select
        className={className}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        hidden={hidden}
      >
        <option value="" disabled>
          Select an option
        </option>
        {options.map((optionValue) => (
          <option key={optionValue} value={optionValue}>
            {optionValue}
          </option>
        ))}
      </select>
    </>
  );
}
