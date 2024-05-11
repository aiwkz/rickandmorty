import { useState, useEffect } from 'react';

import Header from './components/Header/Header';
import CardsList from './components/CardsList/CardsList';
import Hero from './components/Hero/Hero';

import { PAGES_URLS } from './constants';

import './App.css';

const App = () => {
  const [currentPage, setCurrentPage] = useState(PAGES_URLS.CHARACTERS);

  const onPageChange = (newPage) => {
    const currentParam = newPage.split('/')[4];

    const newPath = currentParam && `/${currentParam}`;

    setCurrentPage(newPage);

    newPath && window.history.pushState({}, '', newPath);
  };

  const handlePopState = () => {
    const [newPath] = window.location.pathname.split('/').slice(1, 3);

    setCurrentPage(newPath || PAGES_URLS.CHARACTERS);
  };

  useEffect(() => {
    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  return (
    <div className='app-container'>
      <Header onPageChange={onPageChange} />
      <Hero />
      <CardsList contentUrl={currentPage} />
    </div>
  );
};

export default App;
