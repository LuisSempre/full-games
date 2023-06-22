import axios from 'axios';
import { useEffect, useState } from 'react';
import Loader from './components/Loader';

interface Game {
  id: string;
  title: string;
  thumbnail: string;
  short_description: string;
  game_url: string;
  genre: string;
  platform: string;
  publisher: string;
  developer: string;
  release_date: Date;
  freetogame_profile_url: string;
}

const App = () => {
  const [loading, setLoading] = useState(true);
  const [games, setGames] = useState<Array<Game>>([]);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await axios.get<Game[]>(
          'https://games-test-api-81e9fb0d564a.herokuapp.com/api/data',
          {
            headers: {
              'dev-email-address': 'luisantoniolucass@gmail.com',
            },
          }
        );
        setGames(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  if (loading) {
    return (
      <div className='flex justify-center items-center h-screen w-full'>
        <Loader />
      </div>
    )
  }

  return (
    <div className='grid grid-cols-3 p-8'>
      {games.map((game) => (
        <div key={game.id} >
          <h2>{game.title}</h2>
          <img src={game.thumbnail} alt={game.title} />
        </div>
      ))}
    </div>
  );
};

export default App;
