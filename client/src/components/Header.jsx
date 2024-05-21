import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <div>
      <header className="bg-gray-900 p-4 text-white">
        <Link to={'/landing'} className="text-white no-underline">
          <h1 className='text-4xl ml-10'>
            Joumla <span className="text-sm font-semibold"></span>
          </h1>
        </Link>
      </header>
    </div>
  );
}

export default Header;
