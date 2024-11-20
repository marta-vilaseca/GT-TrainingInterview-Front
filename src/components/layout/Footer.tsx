import './Footer.scss';
import Dora from '../../assets/Logotipo_PildorasUX.svg';

export default function Footer() {
  return (
    <footer className="footer">
      <nav className="nav-footer nav-footer-general">
        <img src={Dora} alt="Logo Pildoras UX" className="footer__logo" />
        <ul>
          <li>
            <a href="#">Aviso Legal</a>
          </li>
          <li>
            <a href="#">Política de Cookies</a>
          </li>
          <li>
            <a href="#">Política de Privacidad</a>
          </li>
        </ul>
      </nav>
    </footer>
  );
}
