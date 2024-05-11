import { useState } from 'react';

import Logo from '../../assets/img/logo.svg';

import { PAGES_URLS } from '../../constants';

import './Header.css';

const Header = ({ onPageChange }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(PAGES_URLS.CHARACTERS);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const changePage = (page) => {
    setCurrentPage(page);
    onPageChange(page);
    setMenuOpen(false);
  };

  const onLogoClick = () => {
    setCurrentPage(PAGES_URLS.CHARACTERS)
    onPageChange(PAGES_URLS.CHARACTERS)
  }

  return (
    <div className='header-container'>
      <img alt='Logo' src={Logo} className='logo' onClick={onLogoClick} />
      <nav className={`menu ${menuOpen ? 'open' : ''}`}>
        <button className='menu-toggle' onClick={toggleMenu}>
          ☰
        </button>

        <button
          className={currentPage === PAGES_URLS.CHARACTERS ? 'active' : ''}
          onClick={() => changePage(PAGES_URLS.CHARACTERS)}
        >
          Characters
        </button>

        <button
          className={currentPage === PAGES_URLS.LOCATIONS ? 'active' : ''}
          onClick={() => changePage(PAGES_URLS.LOCATIONS)}
        >
          Locations
        </button>

        <button
          className={currentPage === PAGES_URLS.EPISODES ? 'active' : ''}
          onClick={() => changePage(PAGES_URLS.EPISODES)}
        >
          Episodes
        </button>
      </nav>
    </div>
  );
};

export default Header;
