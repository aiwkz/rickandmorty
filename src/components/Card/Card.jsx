import './Card.css';

const Card = ({ cardType, onCardClick, isSingleCard, id, name, status, species, image, origin, location, type, dimension, episode, air_date }) => {
  const extractEpisodeNumbers = (episodeArray) => {
    if (!episodeArray || !Array.isArray(episodeArray)) {
      return [];
    }

    return episodeArray.map((episodeUrl) => episodeUrl.split('/').pop()).join(', ');
  };

  const Character = () => (
    <div className={`${isSingleCard ? 'single-card' : 'card-container'}`} onClick={() => !isSingleCard && onCardClick(id)}>
      <h1>{name}</h1>
      <div className='img-data-container'>
        <img alt={name} src={image} />
        {
          !isSingleCard && (
            <div className='character-data-container'>
              <h3>Status: <span className={status === 'Alive' ? 'green-text' : 'red-text'}>{status}</span></h3>
              <h3>Species: {species}</h3>
            </div>
          )
        }
        {
          isSingleCard && (
            <div className='character-data-container'>
              <h3>Status: <span className={status === 'Alive' ? 'green-text' : 'red-text'}>{status}</span>
              </h3>
              <h3>Species: {species}</h3>
              <h3>Origin: <span className={origin?.name !== 'unknown' ? 'blue-text' : 'red-text'}>{origin?.name}</span></h3>
              <h3>Last known location: <span className='blue-text'>{location?.name}</span></h3>
              <h3>Appears in Episodes: <span className='blue-text'>{extractEpisodeNumbers(episode)}</span></h3>
            </div>
          )
        }
      </div>
    </div>
  );

  const Location = () => (
    <div className='card-container'>
      <h1>{name}</h1>
      <h3>Type: <span className='blue-text'>{type}</span></h3>
      <h3>Dimention: <span className={dimension !== 'unknown' ? 'blue-text' : 'red-text'}>{dimension}</span></h3>
    </div>
  );

  const Episode = () => (
    <div className='card-container'>
      <h1>{name}</h1>
      <h3>Episode: <span className='blue-text'>{episode}</span></h3>
      <h3>Air date: <span className='blue-text'>{air_date}</span></h3>
    </div>
  );

  const getCardType = () => {
    switch (cardType) {
      case 'character':
        return <Character />
      case 'location':
        return <Location />
      case 'episode':
        return <Episode />
      default:
        return <Character />
    }
  }

  return (
    <>
      {getCardType()}
    </>
  );
};

export default Card;
