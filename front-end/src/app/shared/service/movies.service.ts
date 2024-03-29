import { HttpClient, HttpErrorResponse, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, retry, tap, throwError } from 'rxjs';
import {
  ADD_FAVORITELIST,
  ADD_WATCHLIST,
  DELETE_MOVIE_ENDPOINT,
  EDIT_MOVIE_ENDPOINT,
  READ_ALL_MOVIES_ENDPOINT,
  READ_FAVORITELIST_ENDPOINT,
  READ_MOVIE_BY_GENRE_ENDPOINT,
  READ_MOVIE_BY_ID_ENDPONT,
  READ_WATCHLIST_ENDPOINT,
  SERACH_MOVIE_ENDPOINT,
  UPLOAD_MOVIE_ENDPOINT,
} from '../constant';
import { Movie } from '../movie.interface';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  constructor(private http: HttpClient) {}

  movie!: Movie;

  //search movie for ADMIN as well as USER
  searchMovie(q: string): Observable<Movie[]> {
    if (q === '') {
      return of([]);
    }
    return this.http.get<Movie[]>(SERACH_MOVIE_ENDPOINT + `${q}`).pipe(
      map((res) => res),
      tap((res) => {})
    );
  }

  
  //for ADMIN as well as USER
  listMovieByGenre(): Observable<Movie[]> {
    return this.http.get<Movie[]>(READ_MOVIE_BY_GENRE_ENDPOINT);
  }

  listMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(READ_ALL_MOVIES_ENDPOINT).pipe(
      retry(3),
      tap((movie) => movie)
    );
  }

  getMovieById(id: string): Observable<Movie> {
    return this.http.get<Movie>(READ_MOVIE_BY_ID_ENDPONT + `${id}`);
  }

  addToWatchlist(id: string): Observable<Movie> {
    // const body = { id: id };
    return this.http.post<Movie>(ADD_WATCHLIST, { id: id }).pipe(
      retry(3),
      tap((movie) => movie)
    );
  }

  addToFavoritelist(id: string): Observable<Movie> {
    // const body = { id: id };
    return this.http.post<Movie>(ADD_FAVORITELIST, { id: id }).pipe(
      retry(3),
      tap((movie) => movie)
    );
  }

  listWatchlist(): Observable<Movie[]> {
    return this.http.get<Movie[]>(READ_WATCHLIST_ENDPOINT);
  }

  listFavoritelist(): Observable<Movie[]> {
    return this.http.get<Movie[]>(READ_FAVORITELIST_ENDPOINT);
  }

  //For ADMIN

  //delete movie at ADMIN-SIDE
  deleteMovie(id: string): Observable<Movie> {
    return this.http.delete<Movie>(DELETE_MOVIE_ENDPOINT + `${id}`);
  }

  //upload movie
  uploadMovie(movie: FormData): Observable<HttpEvent<Movie>> {
    return this.http
      .post<Movie>(UPLOAD_MOVIE_ENDPOINT, movie, {
        reportProgress: true,
        observe: 'events',
      })
      .pipe(catchError(this.errorMgmt));
  }

  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    // console.log(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }

  //edit movie
  editMovie(id: string, movie: FormData): Observable<HttpEvent<Movie>> {
    return this.http
      .patch<Movie>(EDIT_MOVIE_ENDPOINT + `${id}`, movie, {
        reportProgress: true,
        observe: 'events',
      })
      .pipe(catchError(this.errorMgmt));
  }
}
