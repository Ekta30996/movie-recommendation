import { HttpClient, HttpErrorResponse, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Thumb } from '../thumb.interface';
import { UPLOAD_THUMB_ENDPOINT } from '../constant';

@Injectable({
  providedIn: 'root'
})
export class ThumbService {

  constructor(private http: HttpClient) { }

  uploadThumb(id:string,thumb:FormData): Observable<HttpEvent<Thumb>>{
    return this.http.post<Thumb>(UPLOAD_THUMB_ENDPOINT + `${id}` , thumb, {
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
}

