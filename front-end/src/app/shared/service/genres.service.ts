import { HttpClient, HttpErrorResponse, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, Subject, tap, throwError } from 'rxjs';
import {
  ADD_GENRE_ENDPOINT,
  DELETE_GENRE_ENDPOINT,
  EDIT_GENRE_ENDPOINT,
  READ_ALL_GENRE_ENDPOINT,
  READ_GENRE_BY_ID_ENDPONT,
  UPLOAD_GENRE_ENDPOINT,
} from '../constant';
import { Genre } from '../genre.interface';

@Injectable({
  providedIn: 'root',
})
export class GenresService {
  constructor(private http: HttpClient) {}

  uploadGenre(genre: FormData): Observable<HttpEvent<Genre>> {
    return this.http
      .post<Genre>(UPLOAD_GENRE_ENDPOINT, genre, {
        reportProgress: true,
        observe: 'events',
      })
      .pipe(catchError(this.errorMgmt));
  }

  editGenre(id: string, genre: FormData): Observable<HttpEvent<Genre>> {
    return this.http
      .patch<Genre>(EDIT_GENRE_ENDPOINT + `${id}`, genre, {
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
      console.log(error);
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

  loadGenre(): Observable<Genre[]> {
    return this.http.get<Genre[]>(READ_ALL_GENRE_ENDPOINT).pipe(
      retry(3),
      tap((res) => res)
    );
  }

  deleteGenre(id: string): Observable<Genre> {
    return this.http.delete<Genre>(DELETE_GENRE_ENDPOINT + `${id}`);
  }

  getGenreById(id: string): Observable<Genre> {
    return this.http.get<Genre>(READ_GENRE_BY_ID_ENDPONT + `${id}`);
  }

  addGenre(id: string): Observable<Genre[]> {
    const body = { id: id };
    return this.http.post<Genre[]>(ADD_GENRE_ENDPOINT, body);
  }
}
