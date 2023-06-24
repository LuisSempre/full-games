import axios from 'axios';
import { Game } from './types';

const API_URL = 'https://games-test-api-81e9fb0d564a.herokuapp.com/api/data';

export const fetchGames = async (emailAddress: string): Promise<Game[]> => {
  try {
    const response = await axios.get<Game[]>(API_URL, {
      headers: {
        'dev-email-address': emailAddress,
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};
