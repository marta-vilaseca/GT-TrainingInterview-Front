import './Footer.scss';

export default function Footer() {
  return (
    <footer className="footer">
      <nav className="nav-footer nav-footer-general">
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
      <nav className="nav-footer nav-footer-chat">
        <ul>
          <li>
            <a href="/">Volver a Home</a>
          </li>
        </ul>
      </nav>
    </footer>
  );
}
