import { Injectable } from '@angular/core';
import { HttpClient,HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { retry,catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class DataService {

  private REST_API_SERVER = "http://localhost:3000/products"; // Holds the address of our REST API server

  constructor( private httpClient: HttpClient ){}

  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';

    if ( error.error instanceof ErrorEvent ) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }

    window.alert(errorMessage);
    return throwError(errorMessage);
  }

  // Sends a GET request to the REST API endpoint to retrieve JSON data
  // Invokes the get() method of HttpClient to send GET requests to the REST API server.
  // Includes retry error handler.
  public sendGetRequest(){
    return this.httpClient.get(this.REST_API_SERVER).pipe( retry(3), catchError( this.handleError ) );
  }

}
