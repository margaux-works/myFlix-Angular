import { Component } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent {
  movies: any[] = [];
  favoriteMovies: string[] = []; // Store movie IDs of favorites
  user: any = JSON.parse(localStorage.getItem('user') || '{}');

  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getMovies();
    this.getUserData(); // Fetch user data which includes favorite movies
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  // Fetch the user data and set favorite movies
  getUserData(): void {
    this.fetchApiData.getUser(this.user.Username).subscribe((resp: any) => {
      this.user = resp; // Update user object with fetched data
      this.favoriteMovies = this.user.FavoriteMovies || []; // Initialize favoriteMovies from user data
      console.log('User favorite movies:', this.favoriteMovies);
    });
  }

  // Check if a movie is in the user's favorite movies list
  isFavorite(movieId: string): boolean {
    return this.favoriteMovies.includes(movieId);
  }

  // Add or remove a movie from the user's favorite movies
  toggleFavorite(movieId: string): void {
    if (this.isFavorite(movieId)) {
      // Remove the movie from favorites using the API call
      this.fetchApiData
        .removeFavoriteMovie(this.user.Username, movieId)
        .subscribe(
          () => {
            this.favoriteMovies = this.favoriteMovies.filter(
              (id: string) => id !== movieId
            );
            this.snackBar.open('Movie removed from favorites', 'OK', {
              duration: 2000,
            });
            // Update local storage to sync with backend
            this.user.FavoriteMovies = this.favoriteMovies;
            localStorage.setItem('user', JSON.stringify(this.user));
          },
          (error) => {
            console.error('Error removing favorite movie:', error);
            this.snackBar.open('Failed to remove favorite', 'OK', {
              duration: 2000,
            });
          }
        );
    } else {
      // Add the movie to favorites using the API call
      this.fetchApiData
        .addMovieToFavorites(this.user.Username, movieId)
        .subscribe(
          () => {
            this.favoriteMovies.push(movieId);
            this.snackBar.open('Movie added to favorites', 'OK', {
              duration: 2000,
            });
            // Update local storage to sync with backend
            this.user.FavoriteMovies = this.favoriteMovies;
            localStorage.setItem('user', JSON.stringify(this.user));
          },
          (error) => {
            console.error('Error adding favorite movie:', error);
            this.snackBar.open('Failed to add favorite', 'OK', {
              duration: 2000,
            });
          }
        );
    }
  }
}
