'use client'

import axios from "axios";
import { useEffect, useState } from "react";
import { fetchGames } from "@/api";
import Loader from "./Loader";
import Pagination from "./Pagination.";
import { Game } from "@/types";
import { User, onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase/auth";

interface CustomUser extends User {
  user: string;
}

const Games: React.FC = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [games, setGames] = useState<Game[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [gamesPerPage] = useState(12);
  const [showFavorites, setShowFavorites] = useState(false);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [authUser, setAuthUser] = useState<CustomUser | null>(null);

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser({ ...user, user: "" });
      } else {
        setAuthUser(null);
      }
    });

    return () => {
      listen();
    };
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    const fetchData = async () => {
      try {
        timer = setTimeout(() => {
          setErrorMessage(
            "O servidor demorou para responder. Tente novamente mais tarde."
          );
          setLoading(false);
        }, 5000);

        const games = await fetchGames("luisantoniolucass@gmail.com");

        clearTimeout(timer);
        setGames(games.map((game) => ({ ...game, rating: 0 })));
        setLoading(false);
      } catch (error) {
        clearTimeout(timer);

        if (axios.isAxiosError(error)) {
          const status = error.response?.status;
          if (status && [500, 502, 503, 504, 507, 508, 509].includes(status)) {
            setErrorMessage(
              "O servidor falhou em responder. Por favor, tente recarregar a página."
            );
          } else {
            setErrorMessage(
              "O servidor não conseguiu responder agora. Por favor, tente mais tarde."
            );
          }
        } else {
          setErrorMessage(
            "Ocorreu um erro ao buscar os jogos. Por favor, tente novamente."
          );
        }

        setLoading(false);
      }
    };

    fetchData();

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const toggleSortOrder = () => {
    setSortOrder((prevOrder) => (prevOrder === "desc" ? "asc" : "desc"));
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleGenreChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedGenre(event.target.value);
  };

  const handleShowFavorites = () => {
    setShowFavorites((prevShowFavorites) => !prevShowFavorites);
  };

  const handleFavoriteToggle = (gameId: string) => {
    if (authUser) {
      // User is authenticated, perform the toggle
      setGames((prevGames) =>
        prevGames.map((game) => {
          if (game.id === gameId) {
            return {
              ...game,
              favorite: !game.favorite,
            };
          }
          return game;
        })
      );
    } else {
      // User is not authenticated, prompt them to sign in
      alert("Faça login para alternar entre os favoritos.");
    }
  };

  const handleRatingChange = (gameId: string, rating: number) => {
    if (authUser) {
      // User is authenticated, set the rating
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
    } else {
      // User is not authenticated, prompt them to sign in
      alert("Faça login para definir classificações.");
    }
  };
  const indexOfLastGame = currentPage * gamesPerPage;
  const indexOfFirstGame = indexOfLastGame - gamesPerPage;

  const filteredGames = games.filter((game) => {
    const matchesSearchTerm = game.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesGenre = selectedGenre === "" || game.genre === selectedGenre;
    const matchesFavorites = !showFavorites || game.favorite;
    return matchesSearchTerm && matchesGenre && matchesFavorites;
  });

  const sortedGames = [...filteredGames].sort((a, b) => {
    if (a.rating > b.rating) return sortOrder === "asc" ? 1 : -1;
    if (a.rating < b.rating) return sortOrder === "asc" ? -1 : 1;
    return 0;
  });

  const currentGames = sortedGames.slice(indexOfFirstGame, indexOfLastGame);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen w-full">
        <Loader />
      </div>
    );
  }

  const genres = Array.from(new Set(games.map((game) => game.genre)));

  return (
    <div>
      <div className="max-w-7xl mx-auto w-full h-full space-y-8 p-8">
        <div className="text-center text-red-500">
          {errorMessage && <p>{errorMessage}</p>}
        </div>
        <div className="justify-center items-center grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <input
              className="block w-full rounded-lg p-2 hover:border-gray-500 shadow-lg hover:shadow-gray-500 border text-gray-500 font-roboto"
              type="text"
              placeholder="Pesquisar por título"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
          <div>
            <select
              value={selectedGenre}
              onChange={handleGenreChange}
              className="block w-full rounded-lg p-3 hover:border-gray-500 shadow-lg hover:shadow-gray-500 border text-gray-500 font-roboto"
            >
              <option value="">Todos os gêneros</option>
              {genres.map((genre) => (
                <option value={genre} key={genre}>
                  {genre}
                </option>
              ))}
            </select>
          </div>
          <div>
            <button
              onClick={handleShowFavorites}
              className={`block w-full rounded-lg p-2 hover:border-gray-500 shadow-lg hover:shadow-gray-500 border text-gray-500 font-roboto ${
                showFavorites ? "" : ""
              }`}
            >
              Favoritos
            </button>
          </div>
          <div>
            <button
              onClick={toggleSortOrder}
              className={`block w-full rounded-lg p-2 hover:border-gray-500 shadow-lg hover:shadow-gray-500 border text-gray-500 font-roboto`}
            >
              Ordenar por Avaliação {sortOrder === "desc" ? "▼" : "▲"}
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 grid-cols-1 xl:grid-cols-3 gap-16 font-roboto">
          {currentGames.map((game) => (
            <div
              key={game.id}
              className="mx-auto max-w-80 shadow-lg border p-2 rounded-md hover:border-gray-500 hover:shadow-gray-500"
            >
              <h2 className="font-semibold text-xl text-gray-500 p-2">
                {game.title}
              </h2>
              <div className="flex items-center space-x-2 p-2">
                <button
                  className={`text-xl text-gray-500 font-roboto ${
                    game.favorite ? "fill-red-500 heartbeat" : ""
                  }`}
                  onClick={() => handleFavoriteToggle(game.id)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="w-6 h-6"
                  >
                    <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                  </svg>
                </button>
                {[1, 2, 3, 4].map((star) => (
                  <button
                    key={star}
                    className={`text-xl text-gray-500 font-roboto ${
                      game.rating >= star ? "fill-yellow-500" : ""
                    }`}
                    onClick={() => handleRatingChange(game.id, star)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      className="w-6 h-6"
                    >
                      <path d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" />
                    </svg>
                  </button>
                ))}
              </div>
              <img
                src={game.thumbnail}
                alt={game.title}
                className="w-62 rounded-lg"
              />
            </div>
          ))}
        </div>
        <div className="justify-center items-center my-8 md:flex hidden">
          <Pagination
            currentPage={currentPage}
            itemsPerPage={gamesPerPage}
            totalItems={filteredGames.length}
            paginate={paginate}
          />
        </div>
      </div>
    </div>
  );
};

export default Games;
