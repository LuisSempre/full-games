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
<div className='max-w-7xl mx-auto w-full h-full'>
<div className='grid lg:grid-cols-2 grid-cols-1 lg:p-8 p-8 xl:grid-cols-3 gap-8'>
      {games.map((game) => (
        <div key={game.id} >
          <h2>{game.title}</h2>
          <img src={game.thumbnail} alt={game.title} className='w-62'/>
        </div>
      ))}
    </div>
</div>
  );
};

export default App;
