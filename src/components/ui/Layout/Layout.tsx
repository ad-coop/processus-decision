import type { ReactNode } from 'react';
import { Header } from './Header';
import './Layout.css';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="layout">
      <Header />
      <div className="layout__content">{children}</div>
    </div>
  );
}
