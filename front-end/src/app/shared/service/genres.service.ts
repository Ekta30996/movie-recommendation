import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, Subject, tap, throwError } from 'rxjs';
import { DELETE_GENRE_ENDPOINT, READ_ALL_GENRE_ENDPOINT, READ_GENRE_BY_ID_ENDPONT, UPLOAD_GENRE_ENDPOINT } from '../constant';
import { Genre } from '../genre.interface';

@Injectable({
  providedIn: 'root'
})
export class GenresService {

  constructor(private http:HttpClient) { }
 
  uploadGenre(genre:FormData): Observable<any>{
    return this.http.post<any>(UPLOAD_GENRE_ENDPOINT , genre , {
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
    console.log(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }

  

  loadGenre():Observable<Genre[]>{
    return this.http.get<Genre[]>(READ_ALL_GENRE_ENDPOINT)
    .pipe(
      retry(3),
      tap((res)=>res))
  }

  deleteGenre(id:string):Observable<Genre>{
    return this.http.delete<Genre>(DELETE_GENRE_ENDPOINT+`${id}`)
  }

  getGenreById(id:string):Observable<Genre>{
    return this.http.get<Genre>(READ_GENRE_BY_ID_ENDPONT+`${id}`)
  }
}
