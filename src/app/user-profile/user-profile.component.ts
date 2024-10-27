import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  userData: any = {};
  favoriteMovies: any[] = [];

  constructor(
    private fetchApiData: FetchApiDataService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getUser(); // Fetch user details when component is initialized
  }

  // Fetch user data from API
  getUser(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}'); // Retrieve the whole user object from localStorage
    if (user.Username) {
      this.fetchApiData.getUser(user.Username).subscribe((response: any) => {
        this.userData = {
          Username: response.Username,
          Password: '',
          Email: response.Email,
          Birthday: response.Birthday ? response.Birthday.split('T')[0] : '',
          FavoriteMovies: response.FavoriteMovies || [],
        };
        this.getFavoriteMovies();
        console.log('Prefilled user data', this.userData);
      });
    }
  }

  // Edit user details
  editUser(): void {
    this.fetchApiData.editUser(this.userData.Username, this.userData).subscribe(
      (response: any) => {
        console.log('User updated successfully:', response);
        this.snackBar.open('User updated successfully', 'OK', {
          duration: 2000,
        });
        // Optionally, update localStorage with new user data (if necessary)
        localStorage.setItem('user', response.Username);
        this.getFavoriteMovies();
      },
      (error) => {
        console.error('Error updating user:', error);
        this.snackBar.open('Error updating user', 'OK', {
          duration: 2000,
        });
      }
    );
  }

  getFavoriteMovies(): void {
    if (!this.userData.FavoriteMovies) {
      console.warn('No favorite movies found.');
      this.favoriteMovies = [];
      return;
    }

    this.fetchApiData.getAllMovies().subscribe(
      (res: any) => {
        this.favoriteMovies = res.filter((movie: any) =>
          this.userData.FavoriteMovies.includes(movie._id)
        );
      },
      (err: any) => {
        console.error('Error fetching favorite movies:', err);
      }
    );
  }

  removeFromFavorite(movieId: string): void {
    this.fetchApiData
      .removeFavoriteMovie(this.userData.Username, movieId)
      .subscribe(
        (res: any) => {
          // Update the userData's FavoriteMovies with the response
          this.userData.FavoriteMovies = res.FavoriteMovies;

          // Remove the deleted movie from favoriteMovies array to update the view
          this.favoriteMovies = this.favoriteMovies.filter(
            (movie) => movie._id !== movieId // Ensure we're comparing with the correct ID property
          );

          // Update localStorage after removal
          localStorage.setItem('user', JSON.stringify(this.userData));
          this.snackBar.open('Movie removed from favorites', 'OK', {
            duration: 2000,
          });
        },
        (err: any) => {
          console.error('Error removing favorite movie:', err);
        }
      );
  }
}
