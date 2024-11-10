import { FormButtonProps } from '../../types/IFormElements';
import './FormElements.scss';

export default function Button({
  onClick,
  disabled,
  id,
  children,
  className,
}: FormButtonProps) {
  return (
    <button id={id} onClick={onClick} disabled={disabled} className={className}>
      {children}
    </button>
  );
}
