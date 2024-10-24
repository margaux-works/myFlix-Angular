import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

//Declaring the api url that will provide data for the client app
const apiUrl = 'https://movies-app2024-74d588eb4f3d.herokuapp.com/';

@Injectable({
  providedIn: 'root',
})
export class FetchApiDataService {
  // Inject the HttpClient module to the constructor params
  // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {}

  // Helper method to get headers with Authorization token
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: 'Bearer ' + token,
    });
  }

  // user registration endpoint
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .post(apiUrl + 'users', userDetails)
      .pipe(catchError(this.handleError));
  }
  // user login
  public userLogin(userDetails: any): Observable<any> {
    return this.http
      .post(apiUrl + 'login', userDetails)
      .pipe(catchError(this.handleError));
  }

  // get all movies
  public getAllMovies(): Observable<any> {
    return this.http
      .get(apiUrl + 'movies', {
        headers: this.getHeaders(),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // get a single movie by title
  public getMovieByTitle(Title: string): Observable<any> {
    return this.http
      .get(apiUrl + `movies/${Title}`, {
        headers: this.getHeaders(),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // get director by name
  public getDirector(Name: string): Observable<any> {
    return this.http
      .get(apiUrl + `directors/${Name}`, { headers: this.getHeaders() })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // get genre by name
  public getGenre(Name: string): Observable<any> {
    return this.http
      .get(apiUrl + `genres/${Name}`, { headers: this.getHeaders() })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // get user by username
  public getUser(Username: string): Observable<any> {
    return this.http
      .get(apiUrl + `users/${Username}`, { headers: this.getHeaders() })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // get user favorite movies
  public getFavoriteMovies(Username: string): Observable<any> {
    return this.http
      .get(apiUrl + `users/${Username}/movies`, { headers: this.getHeaders() })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // add movie to user's favorites
  public addMovieToFavorites(
    Username: string,
    MovieID: string
  ): Observable<any> {
    return this.http
      .post(
        apiUrl + `users/${Username}/movies/${MovieID}`,
        {},
        { headers: this.getHeaders() }
      )
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // edit user details
  public editUser(Username: string, userDetails: any): Observable<any> {
    return this.http
      .put(apiUrl + `users/${Username}`, userDetails, {
        headers: this.getHeaders(),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // delete a user
  public deleteUser(Username: string): Observable<any> {
    return this.http
      .delete(apiUrl + `users/${Username}`, { headers: this.getHeaders() })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // Delete a movie from favorite movies
  public removeFavoriteMovie(
    Username: string,
    MovieID: string
  ): Observable<any> {
    return this.http
      .delete(apiUrl + `users/${Username}/movies/${MovieID}`, {
        headers: this.getHeaders(),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  //Error handling
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` +
          `Error body is: ${JSON.stringify(error.error)}`
      );
    }
    return throwError('Something bad happened; please try again later.');
  }

  // Extract response data
  private extractResponseData(res: any): any {
    return res || {};
  }
}
