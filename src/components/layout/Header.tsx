import Logo from '../../assets/logo.svg';
import './Header.scss';

export default function Header() {
  return (
    <header className="header">
      <a href="https://vitejs.dev" target="_blank">
        <img src={Logo} className="logo" alt="Vite logo" />
      </a>
    </header>
  );
}
