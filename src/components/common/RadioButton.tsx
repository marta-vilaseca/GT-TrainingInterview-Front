import { RadioButtonProps } from '../../types/IFormElements';
import './FormElements.scss';

export default function RadioButton({
  id,
  labelText,
  name,
  value,
  checked,
  onChange,
}: RadioButtonProps) {
  return (
    <div>
      <input
        type="radio"
        id={id}
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
      />
      <label htmlFor={id}>{labelText}</label>
    </div>
  );
}
