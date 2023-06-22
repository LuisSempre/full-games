import axios from 'axios';
import { useEffect, useState } from 'react';
import Loader from './components/Loader';

interface Game {
  id: number;
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
  const [gameTitles, setGameTitles] = useState<string[]>([]);

  useEffect(() => {
    const fetchGameTitles = async () => {
      try {
        const response = await axios.get<Game[]>(
          'https://games-test-api-81e9fb0d564a.herokuapp.com/api/data',
          {
            headers: {
              'dev-email-address': 'luisantoniolucass@gmail.com',
            },
          }
        );
        const titles = response.data.map((game) => game.title);
        setGameTitles(titles);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchGameTitles();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen w-full">
        <Loader />
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center max-w-4xl mx-auto">
      <h1>Lista de Títulos de Jogos</h1>
      <ul className='grid grid-cols-8 gap-8'>
        {gameTitles.map((title, index) => (
          <li key={index}>{title}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
