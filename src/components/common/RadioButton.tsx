import { RadioButtonProps } from '../../types/IFormElements';
import './FormElements.scss';

export default function RadioButton({
  id,
  labelText,
  name,
  value,
  checked,
  onChange,
  disabled,
}: RadioButtonProps) {
  return (
    <div className="radio__button">
      <input
        type="radio"
        id={id}
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
      />
      <label htmlFor={id}>{labelText}</label>
    </div>
  );
}
