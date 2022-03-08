import React from 'react';
import { Link } from 'react-router-dom';

interface Props {
  children: React.ReactNode | React.ReactNode[]
}


const Layout = ({children}: Props) => {
  return (
    <div className="wrapper">
      <header className="header">
        <div className="max-w-[1200px] mx-auto">
          <Link className="site_identity" to={'/'}>
            Products.
          </Link>
        </div>
      </header>
      <main className="body">
        {children}
      </main>
    </div>

  );
};

export default Layout;