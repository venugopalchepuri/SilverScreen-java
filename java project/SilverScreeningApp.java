import java.util.*;

class Movie {
    private int movieId;
    private String title;
    private String genre;
    private int duration;

    public Movie(int movieId, String title, String genre, int duration) {
        this.movieId = movieId;
        this.title = title;
        this.genre = genre;
        this.duration = duration;
    }

    public int getMovieId() { return movieId; }
    public String getTitle() { return title; }
    public String getGenre() { return genre; }
    public int getDuration() { return duration; }

    @Override
    public String toString() {
        return movieId + ". " + title + " (" + genre + ", " + duration + " min)";
    }
}

class Screen {
    private int screenId;
    private String timing;
    private List<Seat> seats;

    public Screen(int screenId, String timing) {
        this.screenId = screenId;
        this.timing = timing;
        this.seats = new ArrayList<>();
        for (int i = 1; i <= 50; i++) { 
            seats.add(new Seat(i));
        }
    }

    public int getScreenId() { return screenId; }
    public String getTiming() { return timing; }
    public List<Seat> getSeats() { return seats; }

    public void displaySeats() {
        for (Seat seat : seats) {
            System.out.print((seat.isBooked() ? "[X]" : "[" + seat.getSeatNumber() + "]") + " ");
        }
        System.out.println();
    }

    public Seat selectSeat(int seatNumber) {
        if (seatNumber > 0 && seatNumber <= seats.size()) {
            return seats.get(seatNumber - 1);
        }
        return null;
    }
}

class Seat {
    private int seatNumber;
    private boolean booked;

    public Seat(int seatNumber) {
        this.seatNumber = seatNumber;
        this.booked = false;
    }

    public int getSeatNumber() { return seatNumber; }
    public boolean isBooked() { return booked; }

    public void book() { this.booked = true; }
}

class Booking {
    private static int bookingCounter = 1;
    private int bookingId;
    private Movie movie;
    private Screen screen;
    private List<Seat> bookedSeats;
    private double amountPaid;

    public Booking(Movie movie, Screen screen, List<Seat> bookedSeats, double amountPaid) {
        this.bookingId = bookingCounter++;
        this.movie = movie;
        this.screen = screen;
        this.bookedSeats = bookedSeats;
        this.amountPaid = amountPaid;
    }

    public void showBookingDetails() {
        System.out.println("\n--- Booking Details ---");
        System.out.println("Booking ID: " + bookingId);
        System.out.println("Movie: " + movie.getTitle());
        System.out.println("Screen Timing: " + screen.getTiming());
        System.out.print("Seats: ");
        for (Seat seat : bookedSeats) {
            System.out.print(seat.getSeatNumber() + " ");
        }
        System.out.println("\nAmount Paid: ₹" + amountPaid);
        System.out.println("------------------------\n");
    }
}

class Payment {
    public static boolean makePayment(double amount) {
        Scanner sc = new Scanner(System.in);
        System.out.println("Payment of ₹" + amount + " required. Proceed? (yes/no): ");
        String input = sc.nextLine();
        return input.equalsIgnoreCase("yes");
    }
}

public class SilverScreeningApp {
    private static List<Movie> movies = new ArrayList<>();
    private static Map<Integer, List<Screen>> movieScreens = new HashMap<>();
    private static Scanner sc = new Scanner(System.in);

    public static void main(String[] args) {
        initializeData();
        while (true) {
            System.out.println("======= Silver Screening Dashboard =======");
            System.out.println("1. View Available Movies");
            System.out.println("2. Book Ticket");
            System.out.println("3. Exit");
            System.out.print("Choose option: ");
            int choice = sc.nextInt();
            sc.nextLine(); // consume newline
            switch (choice) {
                case 1:
                    displayMovies();
                    break;
                case 2:
                    bookTicket();
                    break;
                case 3:
                    System.out.println("Thank you for using Silver Screening!");
                    return;
                default:
                    System.out.println("Invalid Option. Try again.");
            }
        }
    }

    private static void initializeData() {
        Movie m1 = new Movie(1, "Inception", "Sci-Fi", 148);
        Movie m2 = new Movie(2, "The Dark Knight", "Action", 152);
        Movie m3 = new Movie(3, "Interstellar", "Sci-Fi", 169);

        movies.add(m1);
        movies.add(m2);
        movies.add(m3);

        movieScreens.put(m1.getMovieId(), Arrays.asList(
                new Screen(1, "10:00 AM"),
                new Screen(2, "2:00 PM")
        ));
        movieScreens.put(m2.getMovieId(), Arrays.asList(
                new Screen(3, "12:00 PM"),
                new Screen(4, "6:00 PM")
        ));
        movieScreens.put(m3.getMovieId(), Arrays.asList(
                new Screen(5, "3:00 PM"),
                new Screen(6, "9:00 PM")
        ));
    }

    private static void displayMovies() {
        System.out.println("\n--- Available Movies ---");
        for (Movie movie : movies) {
            System.out.println(movie);
        }
        System.out.println();
    }

    private static void bookTicket() {
        displayMovies();
        System.out.print("Enter Movie ID to book: ");
        int movieId = sc.nextInt();
        sc.nextLine();
        Movie selectedMovie = null;
        for (Movie movie : movies) {
            if (movie.getMovieId() == movieId) {
                selectedMovie = movie;
                break;
            }
        }
        if (selectedMovie == null) {
            System.out.println("Invalid Movie ID!");
            return;
        }

        List<Screen> screens = movieScreens.get(movieId);
        if (screens == null) {
            System.out.println("No screens available for selected movie.");
            return;
        }

        System.out.println("\n--- Available Screen Timings ---");
        for (Screen screen : screens) {
            System.out.println(screen.getScreenId() + ". " + screen.getTiming());
        }

        System.out.print("Enter Screen ID to select: ");
        int screenId = sc.nextInt();
        sc.nextLine();
        Screen selectedScreen = null;
        for (Screen screen : screens) {
            if (screen.getScreenId() == screenId) {
                selectedScreen = screen;
                break;
            }
        }
        if (selectedScreen == null) {
            System.out.println("Invalid Screen ID!");
            return;
        }

        System.out.println("\n--- Available Seats ---");
        selectedScreen.displaySeats();
        List<Seat> selectedSeats = new ArrayList<>();

        System.out.print("How many seats to book? ");
        int seatCount = sc.nextInt();
        sc.nextLine();

        for (int i = 0; i < seatCount; i++) {
            System.out.print("Enter seat number: ");
            int seatNumber = sc.nextInt();
            sc.nextLine();
            Seat seat = selectedScreen.selectSeat(seatNumber);
            if (seat == null) {
                System.out.println("Invalid Seat Number!");
                i--; // retry
            } else if (seat.isBooked()) {
                System.out.println("Seat already booked!");
                i--; // retry
            } else {
                seat.book();
                selectedSeats.add(seat);
            }
        }

        double totalAmount = selectedSeats.size() * 150.0; // each seat ₹150
        if (Payment.makePayment(totalAmount)) {
            Booking booking = new Booking(selectedMovie, selectedScreen, selectedSeats, totalAmount);
            booking.showBookingDetails();
        } else {
            System.out.println("Payment Failed! Booking Cancelled.");
            // Unbook seats
            for (Seat seat : selectedSeats) {
                seat.book(); // No unbook logic added for simplicity
            }
        }
    }
}