import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from "@angular/common/http";
import { throwError } from 'rxjs';
import { retry, catchError, tap } from 'rxjs/operators';
import { Product } from './product';

@Injectable({
  providedIn: 'root'
})

export class DataService {

  private REST_API_SERVER = "http://localhost:3000/products"; // Holds the address of our REST API server

  public first: string = "";
  public prev: string = "";
  public next: string = "";
  public last: string = "";

  constructor( private httpClient: HttpClient ){}

  //
  parseLinkHeader( header ) {
    //
    if (header.length == 0) {
      return ;
    }

    //
    let parts = header.split(',');
    var links = {};

    //
    parts.forEach( p => {
      let section = p.split(';');
      var url = section[0].replace(/<(.*)>/, '$1').trim();
      var name = section[1].replace(/rel="(.*)"/, '$1').trim();
      links[name] = url;
    });

    //
    this.first = links["first"];
    this.last = links["last"];
    this.prev = links["prev"];
    this.next = links["next"];

  }




  // HANDLE ERROR
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
  // Add safe, URL encoded_page parameter
  // public sendGetRequest(){
  //   const options = { params: new HttpParams( { fromString: "_- page=1&_limit=20"} ) };
  //   return this.httpClient.get( this.REST_API_SERVER, options ).pipe( retry(3), catchError( this.handleError ) );
  // }
  // Add safe, URL encoded _page and _limit parameters
  public sendGetRequest(){
    return this.httpClient.get<Product[]>(
      this.REST_API_SERVER, {
        params:new HttpParams ( {
          fromString: "_page=1&_limit=20"
        }), observe:"response"
      }).pipe(retry(3), catchError ( this.handleError ), tap( res => {
        console.log( res.headers.get('Link') );
        this.parseLinkHeader( res.headers.get('Link'));
    }));
  }

  public sendGetRequestToUrl( url: string ){
    return this.httpClient.get<Product[]>(
      url,
      { observe: "response" } ).pipe( retry(3),
      catchError( this.handleError ),
      tap( res => {
      console.log( res.headers.get('Link') );
      this.parseLinkHeader( res.headers.get('Link') );
    }));
  }


}
