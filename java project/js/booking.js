document.addEventListener('DOMContentLoaded', function() {
    // Movie data (would normally come from an API/database)
    const movieData = {
        title: 'Dune: Part Two',
        genre: 'Sci-Fi, Adventure',
        duration: '2h 46m',
        rating: 'PG-13',
        poster: 'https://m.media-amazon.com/images/M/MV5BNTc0YmQxMjEtODI5MC00NjFiLTlkMWUtOGQ5NjFmYWUyZGJhXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg'
    };

    // Initialize variables to track selections
    let selectedDate = null;
    let selectedTheatre = null;
    let selectedShowtime = null;
    let selectedSeats = [];

    // Seat prices
    const REGULAR_SEAT_PRICE = 250;
    const PREMIUM_SEAT_PRICE = 350;

    function initializeDateSelector() {
        const datesContainer = document.querySelector('.dates');
        const today = new Date();
        
        // Generate next 7 days
        for (let i = 0; i < 7; i++) {
            const date = new Date(today);
            date.setDate(today.getDate() + i);
            
            const dateItem = document.createElement('div');
            dateItem.className = 'date-item';
            dateItem.innerHTML = `
                <div class="day">${date.toLocaleDateString('en-US', { weekday: 'short' })}</div>
                <div class="date">${date.getDate()}</div>
                <div class="month">${date.toLocaleDateString('en-US', { month: 'short' })}</div>
            `;
            
            dateItem.addEventListener('click', () => {
                document.querySelectorAll('.date-item').forEach(item => item.classList.remove('active'));
                dateItem.classList.add('active');
                selectedDate = date;
                updateNavigationButtons();
            });
            
            datesContainer.appendChild(dateItem);
        }
    }

    function initializeTheatreSelector() {
        const theatresContainer = document.querySelector('.theatres');
        const theatres = [
            { id: 1, name: 'SILVER SCREEN Alpha', location: 'Sector 18, Greater Noida' },
            { id: 2, name: 'SILVER SCREEN Beta', location: 'Knowledge Park, Greater Noida' },
            { id: 3, name: 'SILVER SCREEN Premium', location: 'Pari Chowk, Greater Noida' }
        ];
        
        theatres.forEach(theatre => {
            const theatreItem = document.createElement('div');
            theatreItem.className = 'theatre-item';
            theatreItem.innerHTML = `
                <h4>${theatre.name}</h4>
                <p>${theatre.location}</p>
            `;
            
            theatreItem.addEventListener('click', () => {
                document.querySelectorAll('.theatre-item').forEach(item => item.classList.remove('active'));
                theatreItem.classList.add('active');
                selectedTheatre = theatre;
                updateNavigationButtons();
            });
            
            theatresContainer.appendChild(theatreItem);
        });
    }

    function initializeShowtimeSelector() {
        const showtimesContainer = document.querySelector('.showtimes');
        const showtimes = ['10:00 AM', '1:00 PM', '4:00 PM', '7:00 PM', '10:00 PM'];
        
        showtimes.forEach(time => {
            const showtimeItem = document.createElement('div');
            showtimeItem.className = 'showtime-item';
            showtimeItem.textContent = time;
            
            showtimeItem.addEventListener('click', () => {
                document.querySelectorAll('.showtime-item').forEach(item => item.classList.remove('active'));
                showtimeItem.classList.add('active');
                selectedShowtime = time;
                updateNavigationButtons();
            });
            
            showtimesContainer.appendChild(showtimeItem);
        });
    }

    function initializeSeatMap() {
        const seatMap = document.querySelector('.seat-map');
        const rows = 8;
        const seatsPerRow = 12;
        const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        
        // Create seat layout
        for (let i = 0; i < rows; i++) {
            const seatRow = document.createElement('div');
            seatRow.className = 'seat-row';
            
            // Add row label
            const rowLabel = document.createElement('div');
            rowLabel.className = 'row-label';
            rowLabel.textContent = alphabet[i];
            seatRow.appendChild(rowLabel);
            
            for (let j = 0; j < seatsPerRow; j++) {
                // Add aisle space in the middle
                if (j === seatsPerRow / 2) {
                    const aisle = document.createElement('div');
                    aisle.className = 'seat aisle';
                    seatRow.appendChild(aisle);
                }
                
                const seat = document.createElement('div');
                seat.className = 'seat';
                
                // Make last two rows premium
                if (i >= rows - 2) {
                    seat.classList.add('premium');
                }
                
                // Randomly mark some seats as reserved
                if (Math.random() < 0.2) {
                    seat.classList.add('reserved');
                } else {
                    seat.addEventListener('click', () => {
                        if (!seat.classList.contains('reserved')) {
                            seat.classList.toggle('selected');
                            updateSelectedSeats();
                        }
                    });
                }
                
                seatRow.appendChild(seat);
            }
            
            seatMap.appendChild(seatRow);
        }
    }

    function updateSelectedSeats() {
        const selectedSeatsElements = document.querySelectorAll('.seat.selected');
        selectedSeats = Array.from(selectedSeatsElements)
            .filter(seat => {
                const seatRow = seat.closest('.seat-row');
                return seatRow && seatRow.querySelector('.row-label');
            })
            .map(seat => {
                const seatRow = seat.closest('.seat-row');
                const rowLabel = seatRow?.querySelector('.row-label')?.textContent || '';
                const seatIndex = Array.from(seatRow.children).indexOf(seat) - 1;
                return `${rowLabel}${seatIndex}`;
            });
        
        const regularSeats = Array.from(selectedSeatsElements)
            .filter(seat => !seat.classList.contains('premium')).length;
        const premiumSeats = Array.from(selectedSeatsElements)
            .filter(seat => seat.classList.contains('premium')).length;
        
        document.getElementById('regular-seats').textContent = regularSeats;
        document.getElementById('premium-seats').textContent = premiumSeats;
        document.getElementById('total-seats').textContent = selectedSeats.length;
        document.getElementById('seat-numbers').textContent = selectedSeats.join(', ') || '-';
        
        const totalAmount = (regularSeats * REGULAR_SEAT_PRICE) + (premiumSeats * PREMIUM_SEAT_PRICE);
        document.getElementById('total-amount').textContent = `₹${totalAmount}`;
        
        // Update payment summary
        document.getElementById('summary-movie').textContent = movieData.title;
        document.getElementById('summary-theatre').textContent = selectedTheatre ? selectedTheatre.name : '-';
        document.getElementById('summary-datetime').textContent = selectedDate && selectedShowtime ? 
            `${selectedDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} at ${selectedShowtime}` : '-';
        document.getElementById('summary-seats').textContent = selectedSeats.join(', ') || '-';
        document.getElementById('summary-amount').textContent = `₹${totalAmount}`;
        
        // Enable/disable continue button based on selection
        const nextButton = document.querySelector('#step2 .next-step');
        if (nextButton) {
            nextButton.disabled = selectedSeats.length === 0;
        }
    }

    // Initialize payment method switching
    const paymentMethods = document.querySelectorAll('input[name="payment-method"]');
    const paymentForms = document.querySelectorAll('.payment-form');
    
    paymentMethods.forEach(method => {
        method.addEventListener('change', () => {
            paymentForms.forEach(form => form.style.display = 'none');
            document.querySelector(`.${method.id}-form`).style.display = 'block';
        });
    });

    // Handle payment submission
    document.querySelector('#step3 .next-step').addEventListener('click', () => {
        // Simulate payment processing
        const loadingOverlay = document.createElement('div');
        loadingOverlay.className = 'loading-overlay';
        loadingOverlay.innerHTML = `
            <div class="loading-spinner"></div>
            <p>Processing payment...</p>
        `;
        document.body.appendChild(loadingOverlay);

        setTimeout(() => {
            loadingOverlay.remove();
            // Generate random booking ID
            const bookingId = 'BK' + Math.random().toString(36).substr(2, 8).toUpperCase();
            document.getElementById('booking-id').textContent = bookingId;
            
            // Update ticket details
            document.getElementById('ticket-movie-title').textContent = movieData.title;
            document.getElementById('ticket-movie-rating').textContent = movieData.rating;
            document.getElementById('ticket-movie-duration').textContent = movieData.duration;
            document.getElementById('ticket-datetime').textContent = `${selectedDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} at ${selectedShowtime}`;
            document.getElementById('ticket-theatre').textContent = selectedTheatre.name;
            document.getElementById('ticket-seats').textContent = selectedSeats.join(', ');
            
            // Show confirmation step
            document.getElementById('step3').style.display = 'none';
            document.getElementById('step4').style.display = 'block';
            
            // Update booking steps
            const steps = document.querySelectorAll('.booking-steps .step');
            steps[2].classList.remove('active');
            steps[2].classList.add('completed');
            steps[3].classList.add('active');
        }, 2000);
    });

    let currentSelectionStep = 1;
    const totalSelectionSteps = 3;

    function showSelectionStep(step) {
        document.querySelectorAll('.selection-step').forEach(el => el.classList.remove('active'));
        document.querySelector(`.selection-step[data-step="${step}"]`).classList.add('active');
        
        updateNavigationButtons();
        updateBookingProgress();
    }

    function updateNavigationButtons() {
        const prevBtn = document.querySelector('.selection-prev');
        const nextBtn = document.querySelector('.selection-next');
        
        if (prevBtn && nextBtn) {
            prevBtn.disabled = currentSelectionStep === 1;
            
            if (currentSelectionStep === 1) {
                nextBtn.disabled = !selectedDate;
            } else if (currentSelectionStep === 2) {
                nextBtn.disabled = !selectedTheatre;
            } else if (currentSelectionStep === 3) {
                nextBtn.disabled = !selectedShowtime;
            }
            
            nextBtn.textContent = currentSelectionStep === totalSelectionSteps ? 'Continue to Seats' : 'Next';
        }
    }

    function updateBookingProgress() {
        const steps = document.querySelectorAll('.booking-steps .step');
        steps.forEach((step, index) => {
            if (index + 1 < currentSelectionStep) {
                step.classList.add('completed');
                step.classList.remove('active');
            } else if (index + 1 === currentSelectionStep) {
                step.classList.add('active');
                step.classList.remove('completed');
            } else {
                step.classList.remove('active', 'completed');
            }
        });
    }

    // Initialize navigation buttons
    document.querySelector('.selection-prev').addEventListener('click', () => {
        if (currentSelectionStep > 1) {
            currentSelectionStep--;
            showSelectionStep(currentSelectionStep);
        }
    });

    document.querySelector('.selection-next').addEventListener('click', () => {
        if (currentSelectionStep < totalSelectionSteps) {
            currentSelectionStep++;
            showSelectionStep(currentSelectionStep);
        } else if (currentSelectionStep === totalSelectionSteps && selectedShowtime) {
            document.getElementById('step1').style.display = 'none';
            document.getElementById('step2').style.display = 'block';
            
            const steps = document.querySelectorAll('.booking-steps .step');
            steps[0].classList.remove('active');
            steps[0].classList.add('completed');
            steps[1].classList.add('active');
            
            initializeSeatMap();
        }
    });

    // Handle step navigation
    document.querySelector('#step2 .prev-step')?.addEventListener('click', () => {
        document.getElementById('step2').style.display = 'none';
        document.getElementById('step1').style.display = 'block';
        
        const steps = document.querySelectorAll('.booking-steps .step');
        steps[1].classList.remove('active');
        steps[0].classList.remove('completed');
        steps[0].classList.add('active');
    });

    document.querySelector('#step2 .next-step')?.addEventListener('click', () => {
        if (selectedSeats.length > 0) {
            document.getElementById('step2').style.display = 'none';
            document.getElementById('step3').style.display = 'block';
            
            const steps = document.querySelectorAll('.booking-steps .step');
            steps[1].classList.remove('active');
            steps[1].classList.add('completed');
            steps[2].classList.add('active');
        }
    });

    document.querySelector('#step3 .prev-step')?.addEventListener('click', () => {
        document.getElementById('step3').style.display = 'none';
        document.getElementById('step2').style.display = 'block';
        
        const steps = document.querySelectorAll('.booking-steps .step');
        steps[2].classList.remove('active');
        steps[1].classList.remove('completed');
        steps[1].classList.add('active');
    });

    // Initialize movie details
    document.getElementById('movie-poster-img').src = movieData.poster;
    document.getElementById('movie-title').textContent = movieData.title;
    document.getElementById('movie-genre').textContent = movieData.genre;
    document.getElementById('movie-duration').textContent = movieData.duration;
    document.getElementById('movie-rating').textContent = movieData.rating;

    // Initialize the booking process
    initializeDateSelector();
    initializeTheatreSelector();
    initializeShowtimeSelector();
    showSelectionStep(1);
});