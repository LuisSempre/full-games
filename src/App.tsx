import axios from 'axios';
import { useEffect, useState } from 'react';
import Loader from './components/Loader';
import Pagination from './components/Pagination.';

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

const App: React.FC = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [games, setGames] = useState<Array<Game>>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [gamesPerPage] = useState(10); // Number of games to display per page

  useEffect(() => {
    let timer: number;

    const fetchGames = async () => {
      try {
        timer = setTimeout(() => {
          setErrorMessage('O servidor demorou para responder. Tente novamente mais tarde.');
          setLoading(false);
        }, 5000);

        const response = await axios.get<Game[]>(
          'https://games-test-api-81e9fb0d564a.herokuapp.com/api/data',
          {
            headers: {
              'dev-email-address': 'luisantoniolucass@gmail.com',
            },
          }
        );

        clearTimeout(timer);
        setGames(response.data);
        setLoading(false);
      } catch (error: any) {
        clearTimeout(timer);

        if (
          error.response &&
          [500, 502, 503, 504, 507, 508, 509].includes(error.response.status)
        ) {
          setErrorMessage('O servidor falhou em responder. Por favor, tente recarregar a página.');
        } else {
          setErrorMessage('O servidor não conseguiu responder agora. Por favor, tente mais tarde.');
        }
        setLoading(false);
      }
    };

    fetchGames();

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleGenreChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedGenre(event.target.value);
  };


  const indexOfLastGame = currentPage * gamesPerPage;
  const indexOfFirstGame = indexOfLastGame - gamesPerPage;
  const filteredGames = games
    .filter((game) => game.title.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter((game) => !selectedGenre || game.genre === selectedGenre);
  const currentGames = filteredGames.slice(indexOfFirstGame, indexOfLastGame);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  if (loading) {
    return (
      <div className='flex justify-center items-center h-screen w-full'>
        <Loader />
      </div>
    );
  }

  const genres = Array.from(new Set(games.map((game) => game.genre)));

  return (
    <div className='max-w-7xl mx-auto w-full h-full p-8'>
      <div className='flex justify-center items-center flex-col w-full h-full space-y-4'>
        <div>{errorMessage && <p>{errorMessage}</p>}</div>
        <div>
          <input
            className='border rounded-lg p-2'
            type='text'
            placeholder='Pesquisar por título'
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        <div>
          <select value={selectedGenre} onChange={handleGenreChange} className='border rounded-lg p-2'>
            <option value=''>Todos os gêneros</option>
            {genres.map((genre) => (
              <option value={genre} key={genre}>
                {genre}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className='grid lg:grid-cols-2 grid-cols-1 lg:p-8 p-8 xl:grid-cols-3 gap-8'>
        {currentGames.map((game) => (
          <div key={game.id}>
            <h2 className='font-semibold text-xl'>{game.title}</h2>
            <img src={game.thumbnail} alt={game.title} className='w-62 rounded-lg' />
          </div>
        ))}
      </div>
      <div className='flex justify-center items-center mt-4'>
        <Pagination
          currentPage={currentPage}
          itemsPerPage={gamesPerPage}
          totalItems={filteredGames.length}
          paginate={paginate}
        />
      </div>
    </div>
  );
};



export default App;
