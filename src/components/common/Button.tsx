import { FormButtonProps } from '../../types/IFormElements';
import './FormElements.scss';

export default function Button({
  onClick,
  disabled,
  id,
  children,
}: FormButtonProps) {
  return (
    <button id={id} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}
