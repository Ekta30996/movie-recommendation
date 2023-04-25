import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, retry, tap } from 'rxjs';
import { ADD_FAVORITELIST, ADD_WATCHLIST, DELETE_MOVIE_ENDPOINT, READ_ALL_MOVIES_ENDPOINT, READ_FAVORITELIST_ENDPOINT, READ_MOVIE_BY_GENRE_ENDPOINT, READ_MOVIE_BY_ID_ENDPONT, READ_WATCHLIST_ENDPOINT, UPLOAD_MOVIE_ENDPOINT } from '../constant';
import { Movie } from '../movie.interface';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(private http: HttpClient) {}

  movie!:Movie
  passMovieData = new BehaviorSubject<Movie>(this.movie)
  currentMovie = this.passMovieData.asObservable()

  listMovieByGenre():Observable<Movie[]>{
    return this.http.get<Movie[]>(READ_MOVIE_BY_GENRE_ENDPOINT)
  }

  listMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(READ_ALL_MOVIES_ENDPOINT).pipe(retry(3),tap((res) => res));
  }

  getMovieById(id:string):Observable<Movie>{
    return this.http.get<Movie>(READ_MOVIE_BY_ID_ENDPONT+`${id}`)
  }

  passMovieObject(movie:Movie){
    this.passMovieData.next(movie)
  }

  addToWatchlist(id:string):Observable<Movie>{
    const body = {id:id}
    return this.http.post<Movie>(ADD_WATCHLIST,body)
  }

  addToFavoritelist(id:string):Observable<Movie>{
    const body = {id:id}
    return this.http.post<Movie>(ADD_FAVORITELIST,body)
  }

  listWatchlist():Observable<Movie[]>{
    return this.http.get<Movie[]>(READ_WATCHLIST_ENDPOINT)
  }

  listFavoritelist():Observable<Movie[]>{
    return this.http.get<Movie[]>(READ_FAVORITELIST_ENDPOINT)
  }



  //delete movie at ADMIN-SIDE
  deleteMovie(id:string):Observable<Movie>{
    return this.http.delete<Movie>(DELETE_MOVIE_ENDPOINT+`/${id}`)
  }

  //upload movie
  uploadMovie(movie:FormData):Observable<Movie>{
    return this.http.post<Movie>(UPLOAD_MOVIE_ENDPOINT,movie)
  }
}
