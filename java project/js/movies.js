document.addEventListener('DOMContentLoaded', function() {
    // Movie data
    const movies = [
        {
            id: 1,
            title: 'Salaar-Part 1',
            genre: 'Action, Thriller',
            duration: '3h 2m',
            rating: 8.4,
            releaseDate: '26 Apr, 2019',
            description: 'After the devastating events of Avengers: Infinity War, the universe is in ruins. With the help of remaining allies, the Avengers assemble once more in order to reverse Thanos\' actions and restore balance to the universe.',
            language: 'English',
            format: ['2D', '3D', 'IMAX'],
            isReleased: true,
            poster: 'https://img.vwassets.com/luxecinemas.nz/papamoa/1703049741402_Poster.jpg'
        },
        {
            id: 2,
            title: 'Dune: Part Two',
            genre: 'Sci-Fi, Adventure',
            duration: '2h 46m',
            rating: 8.6,
            releaseDate: '1 Mar, 2024',
            description: 'Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family. Facing a choice between the love of his life and the fate of the universe, he must prevent a terrible future only he can foresee.',
            language: 'English',
            format: ['2D', '3D', 'IMAX'],
            isReleased: true,
            poster: 'https://i0.wp.com/thecontributor.org/wp-content/uploads/2024/03/Dune-Part2.jpg?fit=1170%2C1707&ssl=1'
        },
        {
            id: 3,
            title: 'The Batman',
            genre: 'Action, Crime',
            duration: '2h 56m',
            rating: 7.8,
            releaseDate: '4 Mar, 2022',
            description: 'When the Riddler, a sadistic serial killer, begins murdering key political figures in Gotham, Batman is forced to investigate the city\'s hidden corruption and question his family\'s involvement.',
            language: 'English',
            format: ['2D', 'IMAX'],
            isReleased: true,
            poster: 'https://rukminim2.flixcart.com/image/850/1000/l0bbonk0/poster/l/b/4/medium-the-batman-2022-movie-poster-18-x-12-inch-300-gsm-m0057-original-imagc3z7xygjupqv.jpeg?q=90&crop=false'
        },
        {
            id: 4,
            title: 'HIT-The Third Case',
            genre: 'Action, Thriller',
            duration: '2h 28m',
            rating: 8.8,
            releaseDate: '01-05-2025',
            description: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.',
            language: 'Telugu',
            format: ['2D'],
            isReleased: true,
            poster: 'https://m.media-amazon.com/images/M/MV5BOGJlMTM2OWUtYTQwNy00YmM3LTlkOTctMDBjY2ExN2JjY2UzXkEyXkFqcGc@._V1_.jpg'
        },
        {
            id: 5,
            title: 'Interstellar',
            genre: 'Sci-Fi, Drama',
            duration: '2h 49m',
            rating: 8.6,
            releaseDate: '7 Nov, 2014',
            description: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.',
            language: 'English',
            format: ['2D', 'IMAX'],
            isReleased: true,
            poster: 'https://images-cdn.ubuy.co.in/6352289f38bb253c44612d53-interstellar-movie-poster-24-x-36-inches.jpg'
        },
        {
            id: 6,
            title: 'Pushpa: The Rule',
            genre: 'Action, Drama',
            duration: '2h 27m',
            rating: 5.6,
            releaseDate: '10 Jun, 2022',
            description: 'Four years after the destruction of Isla Nublar, dinosaurs now live and hunt alongside humans all over the world. This fragile balance will reshape the future and determine, once and for all, whether human beings are to remain the apex predators on a planet they now share with history\'s most fearsome creatures.',
            language: 'Telugu',
            format: ['2D', '3D'],
            isReleased: true,
            poster:'https://cdn.bollywoodbubble.com/wp-content/uploads/2024/10/Allu-Arjun-starrer-Pushpa-2-poster.jpg'
        },
        // Coming Soon Movies
        {
            id: 101,
            title: 'Gladiator II',
            genre: 'Action, Drama',
            duration: '2h 30m',
            rating: 0,
            releaseDate: '22 Nov, 2024',
            description: 'A sequel to the 2000 film Gladiator, following the story of Lucius, the son of Lucilla, as he navigates the world of ancient Rome.',
            language: 'English',
            format: ['2D', '3D', 'IMAX'],
            isReleased: false,
            poster: 'https://i.pinimg.com/736x/bc/af/43/bcaf4391b6cfc77a74ede9536e411c36.jpg'
        },
        {
            id: 102,
            title: 'Original Gangster',
            genre: 'Action, Thriller',
            duration: '2h 35m',
            rating: 0,
            releaseDate: '23 May, 2025',
            description: 'Ethan Hunt returns for another impossible mission in this eighth installment of the action franchise.',
            language: 'Telugu',
            format: ['2D', 'IMAX'],
            isReleased: false,
            poster: 'https://www.cinejosh.com/newsimg/newsmainimg/og_b_0812240748.jpg'
        },
        {
            id: 103,
            title: 'Hari Hara Veera Mallu',
            genre: 'Action, Comedy',
            duration: '2h 25m',
            rating: 0,
            releaseDate: 'Missing Since 2022',
            description: 'A prequel to Mad Max: Fury Road, following a young Furiosa before she became the imperator who teams up with Max.',
            language: 'English',
            format: ['2D', '3D', 'IMAX'],
            isReleased: false,
            poster: 'https://pbs.twimg.com/media/GMizbDfaMAEplXp.jpg:large'
        }
    ];
    
    // Populate movie grids
    const nowShowingGrid = document.querySelector('.now-showing-section .movie-grid');
    const comingSoonGrid = document.querySelector('.coming-soon-section .movie-grid');
    
    if (nowShowingGrid && comingSoonGrid) {
        // Filter and populate movies
        const nowShowing = movies.filter(movie => movie.isReleased);
        const comingSoon = movies.filter(movie => !movie.isReleased);
        
        nowShowing.forEach(movie => {
            const movieCard = createMovieCard(movie, true);
            nowShowingGrid.appendChild(movieCard);
        });
        
        comingSoon.forEach(movie => {
            const movieCard = createMovieCard(movie, false);
            comingSoonGrid.appendChild(movieCard);
        });
    }
    
    // Create movie card element
    function createMovieCard(movie, isReleased) {
        const movieCard = document.createElement('div');
        movieCard.className = 'movie-card';
        
        // Create badges HTML
        const badgesHTML = movie.format.map(format => 
            `<div class="movie-badge">${format}</div>`
        ).join('');
        
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
                        <span>${isReleased ? movie.rating : 'N/A'}</span>
                    </div>
                </div>
                <div class="movie-badges">
                    ${badgesHTML}
                </div>
                <div class="movie-description">${movie.description}</div>
                <a href="${isReleased ? 'booking.html?movie=' + movie.id : '#'}" class="btn btn-primary movie-book-btn">
                    ${isReleased ? 'Book Now' : 'Coming Soon'}
                </a>
            </div>
        `;
        
        // Add click event to navigate to booking page for released movies
        if (isReleased) {
            movieCard.addEventListener('click', function(e) {
                // Only navigate if the button wasn't clicked
                if (!e.target.classList.contains('movie-book-btn')) {
                    window.location.href = `booking.html?movie=${movie.id}`;
                }
            });
        }
        
        return movieCard;
    }
    
    // Filter functionality
    const genreFilter = document.getElementById('genre');
    const languageFilter = document.getElementById('language');
    const formatFilter = document.getElementById('format');
    const sortByFilter = document.getElementById('sortBy');
    
    // Initialize filters
    if (genreFilter && languageFilter && formatFilter && sortByFilter) {
        const filters = [genreFilter, languageFilter, formatFilter, sortByFilter];
        
        filters.forEach(filter => {
            filter.addEventListener('change', updateMovies);
        });
    }
    
    function updateMovies() {
        // Get filter values
        const genre = genreFilter.value;
        const language = languageFilter.value;
        const format = formatFilter.value;
        const sortBy = sortByFilter.value;
        
        // Clear existing movies
        nowShowingGrid.innerHTML = '';
        comingSoonGrid.innerHTML = '';
        
        // Filter and sort movies
        let filteredNowShowing = movies.filter(movie => movie.isReleased);
        let filteredComingSoon = movies.filter(movie => !movie.isReleased);
        
        // Apply genre filter
        if (genre !== 'all') {
            filteredNowShowing = filteredNowShowing.filter(movie => 
                movie.genre.toLowerCase().includes(genre.toLowerCase())
            );
            
            filteredComingSoon = filteredComingSoon.filter(movie => 
                movie.genre.toLowerCase().includes(genre.toLowerCase())
            );
        }
        
        // Apply language filter
        if (language !== 'all') {
            filteredNowShowing = filteredNowShowing.filter(movie => 
                movie.language.toLowerCase() === language.toLowerCase()
            );
            
            filteredComingSoon = filteredComingSoon.filter(movie => 
                movie.language.toLowerCase() === language.toLowerCase()
            );
        }
        
        // Apply format filter
        if (format !== 'all') {
            filteredNowShowing = filteredNowShowing.filter(movie => 
                movie.format.some(fmt => fmt.toLowerCase() === format.toLowerCase())
            );
            
            filteredComingSoon = filteredComingSoon.filter(movie => 
                movie.format.some(fmt => fmt.toLowerCase() === format.toLowerCase())
            );
        }
        
        // Apply sorting
        function sortMovies(movies, criterion) {
            return [...movies].sort((a, b) => {
                switch (criterion) {
                    case 'name':
                        return a.title.localeCompare(b.title);
                    case 'rating':
                        return b.rating - a.rating;
                    case 'release':
                        // Convert dates to timestamps for comparison
                        const dateA = new Date(a.releaseDate.split(' ')[0] + ' ' + a.releaseDate.split(' ')[1].replace(',', '') + ' ' + a.releaseDate.split(' ')[2]);
                        const dateB = new Date(b.releaseDate.split(' ')[0] + ' ' + b.releaseDate.split(' ')[1].replace(',', '') + ' ' + b.releaseDate.split(' ')[2]);
                        return dateB - dateA;
                    case 'popularity':
                    default:
                        // Use rating as a proxy for popularity
                        return b.rating - a.rating;
                }
            });
        }
        
        filteredNowShowing = sortMovies(filteredNowShowing, sortBy);
        filteredComingSoon = sortMovies(filteredComingSoon, sortBy);
        
        // Repopulate movie grids
        filteredNowShowing.forEach(movie => {
            const movieCard = createMovieCard(movie, true);
            nowShowingGrid.appendChild(movieCard);
        });
        
        filteredComingSoon.forEach(movie => {
            const movieCard = createMovieCard(movie, false);
            comingSoonGrid.appendChild(movieCard);
        });
        
        // Display message if no movies found
        if (filteredNowShowing.length === 0) {
            nowShowingGrid.innerHTML = '<p class="no-results">No movies found matching your filters.</p>';
        }
        
        if (filteredComingSoon.length === 0) {
            comingSoonGrid.innerHTML = '<p class="no-results">No upcoming movies found matching your filters.</p>';
        }
    }
    
    // View toggle (grid/list)
    const viewButtons = document.querySelectorAll('.view-btn');
    if (viewButtons.length > 0) {
        viewButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                viewButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                // Get view type
                const viewType = this.dataset.view;
                
                // Update movie grids
                if (viewType === 'list') {
                    nowShowingGrid.classList.add('list-view');
                    comingSoonGrid.classList.add('list-view');
                } else {
                    nowShowingGrid.classList.remove('list-view');
                    comingSoonGrid.classList.remove('list-view');
                }
            });
        });
    }
});