import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry, Subject, tap } from 'rxjs';
import { DELETE_GENRE_ENDPOINT, READ_ALL_GENRE_ENDPOINT, READ_GENRE_BY_ID_ENDPONT, UPLOAD_GENRE_ENDPOINT } from '../constant';
import { Genre } from '../genre.interface';

@Injectable({
  providedIn: 'root'
})
export class GenresService {

  constructor(private http:HttpClient) { }
 
  uploadGenre(genre:FormData): Observable<Genre>{
    return this.http.post<Genre>(UPLOAD_GENRE_ENDPOINT,genre)
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
