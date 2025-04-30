document.addEventListener('DOMContentLoaded', function() {
    // Movie data
    const movies = [
        {
            id: 1,
            title: 'Salaar: Part 1',
            genre: 'Action, Thriller',
            duration: '3h 2m',
            rating: 8.4,
            releaseDate: '26 Apr, 2019',
            poster: 'https://img.vwassets.com/luxecinemas.nz/papamoa/1703049741402_Poster.jpg'
        },
        {
            id: 2,
            title: 'Dune: Part Two',
            genre: 'Sci-Fi, Adventure',
            duration: '2h 46m',
            rating: 8.6,
            releaseDate: '1 Mar, 2024',
            poster: 'https://m.media-amazon.com/images/M/MV5BNTc0YmQxMjEtODI5MC00NjFiLTlkMWUtOGQ5NjFmYWUyZGJhXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg'
        },
        {
            id: 3,
            title: 'HIT-Third Case',
            genre: 'Action, Crime',
            duration: '2h 56m',
            rating: 7.8,
            releaseDate: '4 Mar, 2022',
            poster: 'https://m.media-amazon.com/images/M/MV5BOGJlMTM2OWUtYTQwNy00YmM3LTlkOTctMDBjY2ExN2JjY2UzXkEyXkFqcGc@._V1_.jpg'
        },
        {
            id: 4,
            title: 'Pushpa: The Rule',
            genre: 'Action, Drama',
            duration: '2h 28m',
            rating: 8.8,
            releaseDate: '16 Jul, 2010',
            poster: 'https://cdn.bollywoodbubble.com/wp-content/uploads/2024/10/Allu-Arjun-starrer-Pushpa-2-poster.jpg'
        }
    ];
    
    // Populate movie grid
    const movieGrid = document.querySelector('.movie-grid');
    if (movieGrid) {
        movies.forEach(movie => {
            const movieCard = createMovieCard(movie);
            movieGrid.appendChild(movieCard);
        });
    }
    
    // Create movie card element
    function createMovieCard(movie) {
        const movieCard = document.createElement('div');
        movieCard.className = 'movie-card';
        movieCard.innerHTML = `
            <div class="movie-poster">
                <img src="${movie.poster}" alt="${movie.title}">
            </div>
            <div class="movie-info">
                <h3 class="movie-title">${movie.title}</h3>
                <div class="movie-meta">
                    <div class="movie-genre">${movie.genre}</div>
                    <div class="movie-rating">
                        <i class="fas fa-star"></i>
                        <span>${movie.rating}</span>
                    </div>
                </div>
                <a href="pages/user/booking.html?movie=${movie.id}" class="btn btn-primary movie-book-btn">Book Now</a>
            </div>
        `;
        
        // Add click event to navigate to movie details page
        movieCard.addEventListener('click', function(e) {
            // Only navigate if the button wasn't clicked
            if (!e.target.classList.contains('movie-book-btn')) {
                window.location.href = `pages/user/booking.html?movie=${movie.id}`;
            }
        });
        
        return movieCard;
    }

    // Hero section parallax effect
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', function() {
            const scrollPosition = window.scrollY;
            hero.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
        });
    }
});