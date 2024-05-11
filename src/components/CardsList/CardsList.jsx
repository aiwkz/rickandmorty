import { useState, useEffect } from 'react';

import Spinner from '../Spinner/Spinner';
import Card from '../Card/Card';
import NextAndPrevButtons from '../NextAndPrevButtons/NextAndPrevButtons';

import './CardsList.css';

const CardsList = ({ contentUrl }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [url, setUrl] = useState(contentUrl);
  const [data, setData] = useState({ info: {}, results: [] });
  const [type, setType] = useState('');
  const [isSingleCard, setIsSingleCard] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to fetch data. Please try again.');
    }

    setIsLoading(false);
  };

  useEffect(() => {
    contentUrl.includes('character') && setType('character');
    contentUrl.includes('location') && setType('location');
    contentUrl.includes('episode') && setType('episode');

    setIsSingleCard(false);
    setUrl(contentUrl);
    setData({ info: {}, results: [] });
  }, [contentUrl]);

  useEffect(() => {
    fetchData();
  }, [url]);

  const onFilter = (filter) => {
    filter === 'All characters'
      ? setUrl('https://rickandmortyapi.com/api/character')
      : setUrl(`https://rickandmortyapi.com/api/character/?species=${filter}`);
  };

  const onCardClick = (id) => {
    setUrl(`https://rickandmortyapi.com/api/character/${id}`);
    setIsSingleCard(true);
  };

  const onBackClick = () => {
    setIsSingleCard(false);
    setUrl('https://rickandmortyapi.com/api/character');
    setData({ info: {}, results: [] });
  };

  return (
    <>
      <div className='card-list-container'>
        {
          !isSingleCard && (
            <NextAndPrevButtons
              info={data.info}
              type={type}
              onFilter={onFilter}
              onNextPage={() => data.info.next && setUrl(data.info.next)}
              onPrevPage={() => data.info.prev && setUrl(data.info.prev)}
            />
          )
        }

        {isLoading && <Spinner />}

        {error && <p className='red-text'>{error}</p>}

        {!isLoading && !error && (!isSingleCard
          ? <>
            {data?.results?.map((item) => (
              <Card
                key={item.id}
                cardType={type}
                onCardClick={onCardClick}
                isSingleCard={isSingleCard}
                {...item}
              />
            ))}
          </>
          : (
            <div className='single-card-container'>
              <button onClick={() => onBackClick()}>{'< Go back'}</button>
              <Card
                key={data.id}
                cardType={type}
                onCardClick={onCardClick}
                isSingleCard={isSingleCard}
                {...data}
              />
            </div>
          )
        )}

        {
          !isSingleCard && (
            <NextAndPrevButtons
              info={data.info}
              type={type}
              bottomButtons
              onNextPage={() => data.info.next && setUrl(data.info.next)}
              onPrevPage={() => data.info.prev && setUrl(data.info.prev)}
            />
          )
        }
      </div>
    </>
  );
};

export default CardsList;
