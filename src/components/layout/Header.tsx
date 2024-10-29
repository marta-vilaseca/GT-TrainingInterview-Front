import Logo from '../../assets/Logotipo_PildorasUX.svg';
import { AiOutlineSearch } from 'react-icons/ai';
import { FaCircleUser } from 'react-icons/fa6';
import './Header.scss';

export default function Header() {
  return (
    <header className="header">
      {/* <a href="https://pildorasux.com/" target="_blank"> */}
      <a href="/" target="_blank">
        <img src={Logo} className="logo" alt="PildorasUX logo" />
      </a>
      <div className="logged-in-menu">
        <span className="search">
          <AiOutlineSearch />
        </span>
        <FaCircleUser />
      </div>
    </header>
  );
}
