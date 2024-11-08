import { FormButtonProps } from '../../types/IFormElements';
import './FormElements.scss';

export default function Button({
  onClick,
  disabled,
  id,
  children,
  classname,
  type,
}: FormButtonProps) {
  return (
    <button id={id} onClick={onClick} disabled={disabled} className={classname} type={type}>
      {children}
    </button>
  );
}
