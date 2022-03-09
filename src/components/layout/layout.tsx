import React from 'react';
import { Link } from 'react-router-dom';

interface Props {
  children: React.ReactNode | React.ReactNode[]
}


const Layout = ({children}: Props) => {
  return (
    <div className="wrapper">
      <header className="header">
        <div className="max-w-[1200px] mx-auto flex justify-between">
          <Link className="site_identity" to={'/'}>
            Products.
          </Link>

          <nav>
            <Link className="text-sm font-medium text-gray-700 hover:text-blue-700 tracking-wider hover:underline" to={'/create'}>
              Add Product
            </Link>
          </nav>
        </div>
      </header>
      <main className="body">
        {children}
      </main>
    </div>

  );
};

export default Layout;