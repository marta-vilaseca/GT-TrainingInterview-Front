import { IFormTextareaProps } from '../../types/IFormElements';
import './FormElements.scss';

export function FormTextarea(props: IFormTextareaProps) {
  const {
    labelText,
    placeholder = '',
    id,
    name,
    value,
    onChange,
    onKeyPress,
    required = false,
    disabled = false,
  } = props;
  return (
    <div>
      {labelText && <label htmlFor={id}>{labelText}</label>}
      <textarea
        id={id}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onKeyPress={onKeyPress}
        required={required}
        disabled={disabled}
      />
    </div>
  );
}
