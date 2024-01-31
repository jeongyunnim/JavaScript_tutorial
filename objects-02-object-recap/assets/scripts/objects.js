const addMovieBtn = document.getElementById('add-movie-btn');
const searchBtn = document.getAnimations('search-btn');

const movies = [];

const renderMovies = () => {
  const movieList = document.getElementById('movie-list');

  if (movies.length === 0)
  {
    movieList.classList.remove('visible');
  }
  else
  {
    movieList.classList.add('visible');
  }
  movieList.innerHTML = '';

  movies.forEach((movie) => {
    const movieElement = document.createElement('li');
    let text = movie.info.title + ' - ';
    for (const key in movie.info)
    {
      if (key !== 'title')
      {
        text = text + `${key}: ${movie.info[key]}`;
      }
    }
    movieElement.textContent = text;
    movieList.append(movieElement);
  });
}

const addMovieHandler = () => {
  const title = document.getElementById('title').value;
  const extraName = document.getElementById('extra-name').value;
  const extraValue = document.getElementById('extra-value').value;

  if (title.trim() === '' || extraName === '' || extraValue === '')
  {
    return ;
  }
  
  const newMovie = {
    info: {
      title,
      [extraName]: extraValue
    },
    id: Math.random()
  };

  movies.push(newMovie);
  renderMovies();
}

addMovieBtn.addEventListener('click', addMovieHandler);