import { Component, OnInit, Input } from '@angular/core';

//  import to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';

// import brings in the API calls
import { FetchApiDataService } from '../fetch-api-data.service';

// import  used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss'],
})
export class UserLoginFormComponent implements OnInit {
  @Input() userData = { Username: '', Password: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  // This is the function responsible for sending the form inputs to the backend
  loginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe(
      (response) => {
        // Logic for a successful user login
        localStorage.setItem('user', JSON.stringify(response.user)); // Store user information in local storage
        localStorage.setItem('token', response.token); // Store token in local storage
        // Log the values to check if they were set correctly
        console.log(
          'User saved in localStorage:',
          JSON.parse(localStorage.getItem('user') || '{}')
        );
        console.log(
          'Token saved in localStorage:',
          localStorage.getItem('token')
        );

        this.dialogRef.close(); // This will close the modal on success!
        console.log(response);
        this.snackBar.open(response, 'user logged in sucessfully', {
          duration: 2000,
        });
      },
      (response) => {
        this.snackBar.open(response, 'OK', {
          duration: 2000,
        });
      }
    );
  }
}
