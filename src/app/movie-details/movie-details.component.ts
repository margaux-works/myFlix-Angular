import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { DirectorDetailsComponent } from '../director-details/director-details.component';
import { GenreDetailsComponent } from '../genre-details/genre-details.component';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss'],
})
export class MovieDetailsComponent implements OnInit {
  movie: any = {};

  constructor(
    private route: ActivatedRoute,
    private fetchApiData: FetchApiDataService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    const Title = this.route.snapshot.paramMap.get('Title');
    if (Title) {
      this.fetchApiData.getMovieByTitle(Title).subscribe((resp: any) => {
        this.movie = resp;
        console.log(this.movie);
      });
    }
  }

  // function to open director dialog
  openDirectorDialog(): void {
    this.dialog.open(DirectorDetailsComponent, {
      width: '400px',
      data: this.movie.Director, // Pass director data to the dialog
    });
  }

  // function to open genre dialog
  openGenreDialog(): void {
    this.dialog.open(GenreDetailsComponent, {
      width: '400px',
      data: this.movie.Genre, // Pass genre data to the dialog
    });
  }
}
