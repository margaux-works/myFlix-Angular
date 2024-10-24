import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FetchApiDataService } from '../fetch-api-data.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss'],
})
export class MovieDetailsComponent implements OnInit {
  movie: any = {};

  constructor(
    private route: ActivatedRoute,
    private fetchApiData: FetchApiDataService
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
}
