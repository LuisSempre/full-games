import axios from 'axios';
import { useEffect, useState } from 'react';

interface Game {
  id:                     number;
  title:                  string;
  thumbnail:              string;
  short_description:      string;
  game_url:               string;
  genre:                  string;
  platform:               string;
  publisher:              string;
  developer:              string;
  release_date:           Date;
  freetogame_profile_url: string;
}

const App = () => {
  const [gameTitles, setGameTitles] = useState<string[]>([]);

  useEffect(() => {
    const fetchGameTitles = async () => {
      try {
        const response = await axios.get<Game[]>('https://games-test-api-81e9fb0d564a.herokuapp.com/api/data', {
          headers: {
            'dev-email-address': 'luisantoniolucass@gmail.com',
          },
        });
        const titles = response.data.map((game) => game.title);
        setGameTitles(titles);
      } catch (error) {
        console.error(error);
      }
    };

    fetchGameTitles();
  }, []);

  return (
    <div>
      <h1>Lista de Títulos de Jogos</h1>
      <ul>
        {gameTitles.map((title, index) => (
          <li key={index}>{title}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;

