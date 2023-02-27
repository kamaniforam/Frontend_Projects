const API_URl = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=f31cb7c6fd38a8c0b45fe92b1b2c5de4&page=1'
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=f31cb7c6fd38a8c0b45fe92b1b2c5de4&query="'

const form = document.getElementById('form');
const search = document.getElementById('search');
const main = document.getElementById('main');
// Get inital movies

//fetch the movies
getMovies(API_URl);

async function getMovies(url) {
    const response = await fetch(url);
    const data = await response.json();
    showMovies(data.results);
}

function showMovies(movies) {
   
    main.innerHTML = '';
    movies.forEach((movie) => {
        const { title, poster_path, vote_average, overview } = movie;
        const movieElements = document.createElement('div');
        movieElements.classList.add('movie');
        movieElements.innerHTML = `  
            <img src="${IMG_PATH + poster_path}" alt="${title}" />
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getClassByRate(vote_average)}">${vote_average}</span>
            </div>
            <div class="overview">
                <h3>OverView</h3>
                ${overview}
            </div>
        `
        main.appendChild(movieElements);
    });
}

function getClassByRate(vote) {
    if (vote >= 8) {
        return 'green';
    } else if (vote >= 5) {
        return 'orange';
    } else {
        return 'red';
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const searchTerm = search.value;
    if (searchTerm && searchTerm !== '') {
        getMovies(SEARCH_API + searchTerm);
        search.value = '';
    } else {
        window.location.reload();
    }
})