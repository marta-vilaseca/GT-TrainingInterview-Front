import { PropsWithChildren } from 'react';
import Footer from './Footer';
import Header from './Header';
import FooterChat from './FooterChat';
import { useLocation } from 'react-router-dom';
import './Layout.scss';

export interface Props {
  title?: string;
  page: string;
  extraClassName?: string | string[]; // Accept a string or an array of strings if extra classes are needed
}

export default function Layout(props: PropsWithChildren<Props>) {
  // Join extraClassName if it's an array, or use it directly if it's a string
  const extraClasses = Array.isArray(props.extraClassName)
    ? props.extraClassName.join(' ')
    : props.extraClassName || ''; // and fall back to an empty string if undefined

  const location = useLocation();

  const renderFooter = () => {
    if (location.pathname === '/chat') {
      return <FooterChat />;
    }
    return <Footer />;
  };

  return (
    <div className={`wrapper ${props.page} ${extraClasses}`}>
      <Header />
      <main className="main">
        {props.title && <h2 className="visibleTitle">{props.title}</h2>}
        {props.children}
      </main>
      {renderFooter()}
    </div>
  );
}
