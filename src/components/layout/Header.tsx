import LogoPildoras from '../../assets/pildorasUX-logo.svg';
import './Header.scss';

export default function Header() {
  return (
    <header className="header">
      <a className="logo" href="https://pildorasux.com/" target="_blank">
        <img src={LogoPildoras} alt="Pildoras UX" />
      </a>
    </header>
  );
}
