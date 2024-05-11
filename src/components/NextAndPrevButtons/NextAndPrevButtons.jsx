import { useEffect, useState } from 'react';

import './NextAndPrevButtons.css';

const NextAndPrevButtons = ({ info, type, onNextPage, onPrevPage, onFilter, bottomButtons }) => {
  const [selectedSpecies, setSelectedSpecies] = useState(null);
  const [filtersOpen, setFiltersOpen] = useState(false);

  useEffect(() => {
    setSelectedSpecies('All characters');
  }, []);

  const species = [
    'Human',
    'Humanoid',
    'Alien',
    'Animal',
    'Robot',
    'Mythological Creature',
    'Cronenberg',
    'Disease',
    'Unknown',
    'All characters'
  ];

  const getCurrentPageNumber = (nextPageUrl) => {
    if (typeof nextPageUrl !== 'string' || !nextPageUrl.trim()) {
      return;
    }

    const pageParamMatch = nextPageUrl.match(/page=(\d+)/);

    if (!pageParamMatch || pageParamMatch.length < 2) {
      console.error('Page parameter not found in nextPageUrl');
      return;
    }

    const nextPageNumber = parseInt(pageParamMatch[1]);

    if (isNaN(nextPageNumber)) {
      console.error('Invalid page number in nextPageUrl');
      return;
    }

    return nextPageNumber - 1;
  };

  const currentPageNumber = getCurrentPageNumber(info.next);

  const toggleFilters = () => {
    setFiltersOpen(!filtersOpen);
  };

  const handleChange = (newSelectedSpecies) => {
    setSelectedSpecies(newSelectedSpecies);
    onFilter(newSelectedSpecies);
  }

  return (
    <div className='filters-buttons-container'>
      {
        !bottomButtons && (
          <div className='count-page-container'>
            <span className='info'>
              Total items: <span className='blue-text'>{info.count}</span>
            </span>

            <span className='info'>
              Current page: <span className='blue-text'>{!currentPageNumber ? info.pages : currentPageNumber}</span>
            </span>

            <span className='info'>
              Total pages: <span className='blue-text'>{info.pages}</span>
            </span>
          </div>
        )
      }

      <div className='buttons-container'>
        <button onClick={() => onPrevPage()} disabled={!info.prev}>{'<- Prev page'}</button>
        <button onClick={() => onNextPage()} disabled={!info.next}>{'Next page ->'}</button>
      </div>

      {type === 'character' && !bottomButtons && (
        <div className={`title-filters-container ${filtersOpen ? 'open' : ''}`}>
          <button className='filters-toggle' onClick={toggleFilters}>
            <span>{`${filtersOpen ? '>' : '<'} Filters`}</span>
          </button>
          <h3>Character filters</h3>
          <div className='filters-container'>
            {species.map((species) => (
              <label key={species} className='filter'>
                <input
                  type='radio'
                  id={species}
                  name='filter'
                  value={species}
                  checked={selectedSpecies === species}
                  onChange={() => handleChange(species)}
                />
                {species}
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default NextAndPrevButtons;
