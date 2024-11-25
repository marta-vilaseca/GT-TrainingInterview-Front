// src/components/common/Button.tsx
import { FormButtonProps } from '../../types/IFormElements';
import './FormElements.scss';

export default function Button({
  onClick,
  disabled,
  id,
  children,
  className,
  type,
}: FormButtonProps) {
  return (
    <button
      id={id}
      onClick={onClick}
      disabled={disabled}
      className={className}
      type={type}
    >
      {children}
    </button>
  );
}
