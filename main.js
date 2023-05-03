const API_BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w780";
const API_KEY = "5cd249d4f26bf03481d34df30898c03e";

const movieListElement = document.querySelector("#movie-list");

function createCardElement(movie) {
  const releaseDate = new Date(movie.release_date).toLocaleDateString();

  return `
    <div class='card'>
      <img src='${IMAGE_BASE_URL}${movie.poster_path}'/>
      <div class='description'>
        <h2 class='title'>${movie.title}</h2>
        <h3 class='overview'>${movie.overview}</h3>
        <p class='release-date'>Data: ${releaseDate}</p>
        <p class='vote-average'>Pontuação: ${movie.vote_average}</p>
        <p class='popularity'>Popularidade: ${movie.popularity}</p>
      </div>
    </div>
  `;
}

async function fetchPopularMovies() {
  const url = new URL(`${API_BASE_URL}/movie/popular`);
  url.searchParams.set("api_key", API_KEY);
  url.searchParams.set("language", "pt-BR");
  url.searchParams.set("region", "BR");

  const response = await fetch(url);
  const { results: movies } = await response.json();

  return movies;
}

async function renderPopularMovies() {
  const movies = await fetchPopularMovies();

  const cardsHtml = movies.map((movie) => createCardElement(movie)).join("");

  movieListElement.innerHTML = cardsHtml;
}

renderPopularMovies();
