const addMovieModal = document.getElementById('add-modal');
const startAddMovieButton = document.querySelector('header button');
const backdrop = document.getElementById('backdrop');
const cencelAddMovieButton = document.querySelector('.btn--passive');
const confirmAddMovieButton = cencelAddMovieButton.nextElementSibling;
const userInputs = addMovieModal.querySelectorAll('input');
const entryTextSection = document.getElementById('entry-text');
const deleteMovieModal = document.getElementById('delete-modal');

const movies = [];

const updateUI = () => {
    if (movies.length === 0)
    {
        entryTextSection.style.display = 'block';
    }
    else
    {
        entryTextSection.style.display = 'none';
    }
};

const closeMovieModal = () => {
    addMovieModal.classList.remove('visible');
};

const deleteMovie = (id) => {
    let movieIndex = 0;
    for (const element of movies)
    {
        if (element.id === id)
        {   
            break ;
        }
        movieIndex++;
    }
    movies.splice(movieIndex, 1);
    console.log(id);
    const listRoot = document.getElementById('movie-list');
    listRoot.children[movieIndex].remove();
};

const cancelMovieDeletion = () => {
    deleteMovieModal.classList.remove('visible');
}

const closeMovieDeletionModal = () => {
    toggleBackdrop();
    deleteMovieModal.classList.remove('visible');
}

const deleteMovieHandler = (id) => {
    deleteMovieModal.classList.add('visible');
    const cancelDeletionButton = deleteMovieModal.querySelector('.btn--passive');
    const confirmDeletionButton = deleteMovieModal.querySelector('.btn--danger');
    
    toggleBackdrop();
    cancelDeletionButton.addEventListener('click', closeMovieDeletionModal);
    confirmDeletionButton.addEventListener('click', deleteMovie.bind(null, id));
};

const renderNewMovieElement = (id, title, imageURL, rating) => {
    const newMovieElement = document.createElement('li');
    newMovieElement.className = 'movie-element';
    newMovieElement.innerHTML = `
        <div class="movie-element__image">
            <img src="${imageURL}" alt="${title}">
        </div>
        <div class="movie-element__info">
            <h2>${title}</h2>
            <p>${rating}/5 stars</p>
        </div>
    `;
    newMovieElement.addEventListener('click', deleteMovieHandler.bind(null, id));
    const listRoot = document.getElementById('movie-list');
    listRoot.appendChild(newMovieElement);
};

const toggleBackdrop = () => {
    backdrop.classList.toggle('visible');
};

const showMovieModal = () => {
    addMovieModal.classList.add('visible');
    toggleBackdrop();
}

const backdropClickHandler = () => {
    toggleBackdrop();
    closeMovieModal();
    cancelMovieDeletion();
}

const cencelAddMovieHandler = () => {
    closeMovieModal();
    clearMovieInputs();
}

const addMovieHandler = () => {
    const titleValue = userInputs[0].value;
    const imageURLValue = userInputs[1].value;
    const ratingValue = userInputs[2].value;

    if (titleValue.trim() === '' || imageURLValue.trim() === '' || ratingValue.trim() === '' || parseInt(ratingValue) < 1 || parseInt(ratingValue) > 5)
    {   
        alert('Please enter valid values (rating between 1 and 5).');
        return ;
    }

    const newMovie = {
        id: movies.length === 0 ? 0 : movies[movies.length - 1].id + 1, 
        title: titleValue,
        image: imageURLValue,
        rating: ratingValue
    };

    movies.push(newMovie);
    console.log(movies);
    closeMovieModal();
    toggleBackdrop();
    clearMovieInputs();
    renderNewMovieElement(newMovie.id, newMovie.title, newMovie.image, newMovie.rating);
    updateUI();
}

const clearMovieInputs = () => {
    for (const element of userInputs)
    {
        element.value = '';
    }
}

startAddMovieButton.addEventListener('click',showMovieModal);
backdrop.addEventListener('click',backdropClickHandler);
cencelAddMovieButton.addEventListener('click',cencelAddMovieHandler);
confirmAddMovieButton.addEventListener('click', addMovieHandler);