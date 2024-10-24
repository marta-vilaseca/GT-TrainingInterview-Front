import Logo from '../../assets/Logotipo_PildorasUX.svg';
import './Header.scss';

export default function Header() {
  return (
    <header className="header">
      <a href="https://pildorasux.com/" target="_blank">
        <img src={Logo} className="logo" alt="PildorasUX logo" />
      </a>
    </header>
  );
}
