// src/components/layout/Layout.tsx
import { useLocation } from 'react-router-dom';
import { PropsWithChildren } from 'react';
import Header from './Header';
import Footer from './Footer';
import FooterChat from './FooterChat';
import './Layout.scss';

export interface Props {
  title?: string;
  page: string;
  extraClassName?: string | string[];
}

export default function Layout(props: PropsWithChildren<Props>) {
  const extraClasses = Array.isArray(props.extraClassName)
    ? props.extraClassName.join(' ')
    : props.extraClassName || '';

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
