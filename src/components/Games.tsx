import axios from 'axios';
import { useEffect, useState } from 'react';
import { fetchGames } from '../api';
import Loader from './Loader';
import Pagination from './Pagination.';
import { Game } from '../types';

const Games: React.FC = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [games, setGames] = useState<Game[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [gamesPerPage] = useState(12);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    const fetchData = async () => {
      try {
        timer = setTimeout(() => {
          setErrorMessage('O servidor demorou para responder. Tente novamente mais tarde.');
          setLoading(false);
        }, 5000);

        const games = await fetchGames('luisantoniolucass@gmail.com');

        clearTimeout(timer);
        setGames(games.map((game) => ({ ...game, rating: 0 })));
        setLoading(false);
      } catch (error) {
        clearTimeout(timer);

        if (axios.isAxiosError(error)) {
          const status = error.response?.status;
          if (status && [500, 502, 503, 504, 507, 508, 509].includes(status)) {
            setErrorMessage('O servidor falhou em responder. Por favor, tente recarregar a página.');
          } else {
            setErrorMessage('O servidor não conseguiu responder agora. Por favor, tente mais tarde.');
          }
        } else {
          setErrorMessage('Ocorreu um erro ao buscar os jogos. Por favor, tente novamente.');
        }

        setLoading(false);
      }
    };

    fetchData();

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

  const handleFavoriteToggle = (gameId: string) => {
    setGames((prevGames) =>
      prevGames.map((game) => {
        if (game.id === gameId) {
          return {
            ...game,
            favorite: !game.favorite, // Inverte o valor do estado de favorito
          };
        }
        return game;
      })
    );
  };

  const handleRatingChange = (gameId: string, rating: number) => {
    setGames((prevGames) =>
      prevGames.map((game) => {
        if (game.id === gameId) {
          return {
            ...game,
            rating,
          };
        }
        return game;
      })
    );
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
    <>
      <div className='bg-gradient-to-bl from-slate-700 via-slate-800 to-slate-950'>
        <div className='max-w-7xl mx-auto w-full h-full space-y-8 p-8'>
          <div className='text-center text-red-500'>{errorMessage && <p>{errorMessage}</p>}</div>
          <div className='justify-center items-center grid grid-cols-1 md:grid-cols-2 gap-8'>
            <div>
              <input
                className='block w-full bg-slate-700 rounded-lg p-2 hover:border-gray-500 shadow-lg hover:shadow-gray-500 border text-gray-500 font-roboto'
                type='text'
                placeholder='Pesquisar por título'
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
            <div>
              <select
                value={selectedGenre}
                onChange={handleGenreChange}
                className='block w-full bg-slate-700 rounded-lg p-3 hover:border-gray-500 shadow-lg hover:shadow-gray-500 border text-gray-500 font-roboto'
              >
                <option value=''>Todos os gêneros</option>
                {genres.map((genre) => (
                  <option value={genre} key={genre}>
                    {genre}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className='grid lg:grid-cols-2 grid-cols-1 xl:grid-cols-3 gap-16 font-roboto'>
            {currentGames.map((game) => (
              <div key={game.id}>
                <h2 className="font-semibold text-xl text-gray-500 p-2">{game.title}</h2>
                <div className="flex items-center space-x-2 p-2">
                  <button
                    className={`text-xl text-gray-500 font-roboto ${game.favorite ? "text-red-500 heartbeat" : ""}`}
                    onClick={() => handleFavoriteToggle(game.id)}
                  >
                    ♡
                  </button>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      className={`text-xl text-gray-500 font-roboto ${game.rating >= star ? "text-yellow-500" : ""}`}
                      onClick={() => handleRatingChange(game.id, star)}
                    >
                      ★
                    </button>
                  ))}
                </div>
                <img
                  src={game.thumbnail}
                  alt={game.title}
                  className='w-62 rounded-lg hover:border-gray-500 shadow-lg hover:shadow-gray-500 border'
                />

              </div>
            ))}
          </div>
          <div className='justify-center items-center my-8 md:flex hidden'>
            <Pagination
              currentPage={currentPage}
              itemsPerPage={gamesPerPage}
              totalItems={filteredGames.length}
              paginate={paginate}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Games;