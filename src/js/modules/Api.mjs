const API_KEY =
  import.meta?.env?.VITE_API_KEY ||
  "602e96a6dc6deb30409a56c78bd975b7"; // fallback key if .env not loaded

const BASE_URL = "https://api.themoviedb.org/3";

export default class ApiService {
  async getPopularMovies(page = 1) {
    return this.fetchData(
      `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`
    );
  }

  async searchMovies(query, page = 1) {
    return this.fetchData(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${encodeURIComponent(
        query
      )}&page=${page}`
    );
  }

  async fetchGenres() {
    return this.fetchData(
      `${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=en-US`
    ).then((data) => data.genres);
  }

  async fetchData(url) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("API fetch error:", error);
      throw error;
    }
  }
}