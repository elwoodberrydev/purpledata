import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class DataService {

  private REST_API_SERVER = "http://localhost:3000/products"; // Holds the address of our REST API server

  constructor( private httpClient: HttpClient ){}

  // Sends a GET request to the REST API endpoint to retrieve JSON data
  // Invokes the get() method of HttpClient to send GET requests to the REST API server.
  public sendGetRequest(){
    return this.httpClient.get(this.REST_API_SERVER);
  }

}
