import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  constructor(public router: Router, public SnackBar: MatSnackBar) {}

  ngOnInit(): void {}

  logoutUser(): void {
    localStorage.clear();
    this.router.navigate(['welcome']);
    this.SnackBar.open('You have been logged out', 'OK', { duration: 2000 });
  }
}
