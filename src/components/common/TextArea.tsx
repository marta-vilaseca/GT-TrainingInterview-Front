import { IFormTextareaProps } from '../../types/IFormElements';
import './FormElements.scss';

export function FormTextarea({
  labelText,
  placeholder,
  id,
  name,
  value,
  onChange,
  required,
}: IFormTextareaProps) {
  return (
    <div>
      {labelText && <label htmlFor={id}>{labelText}</label>}
      <textarea
        id={id}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
      />
    </div>
  );
}
