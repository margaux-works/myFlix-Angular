import { Component, Input } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent {
  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

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
      this.userData = {
        Username: user.Username,
        Password: '',
        Email: user.Email,
        Birthday: user.Birthday ? user.Birthday.split('T')[0] : '', // Extract date only
      };
      console.log('Prefilled user data', this.userData);
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
        // Similarly, update other fields in localStorage if needed
      },
      (error) => {
        console.error('Error updating user:', error);
        this.snackBar.open('Error updating user', 'OK', {
          duration: 2000,
        });
      }
    );
  }
}
