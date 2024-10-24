import { FormSelectProps } from '../../types/IFormElements';
import './FormElements.scss';

export default function FormSelect({
  id,
  labelText,
  name,
  value,
  onChange,
  options,
  required = false,
}: FormSelectProps) {
  return (
    <>
      <label>{labelText}</label>
      <select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
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
