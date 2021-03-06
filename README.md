![Project By Elwood Berry](https://elwoodberry.dev/wp-content/uploads/2020/10/elwoodberry_logo.png)

# Purple Data Project
Test driven developed (tdd) Angular project.

### Table Of Contents
1. [Prerequisites](https://github.com/elwoodberrydev/purpledata#prerequisites)
1. [Getting Started](https://github.com/elwoodberrydev/purpledata#getting-started)
1. [Simulating The Server](https://github.com/elwoodberrydev/purpledata#simulating-the-server)
1. [HttpClient](https://github.com/elwoodberrydev/purpledata#httpclient)
1. [Components](https://github.com/elwoodberrydev/purpledata#components)
1. [Routing](https://github.com/elwoodberrydev/purpledata#routing)
1. [Angular Material](https://github.com/elwoodberrydev/purpledata#angular-material)
1. [Services](https://github.com/elwoodberrydev/purpledata#services)
1. [Error Handling](https://github.com/elwoodberrydev/purpledata#error-handling)
1. [Retrying Failed HTTP Requests](https://github.com/elwoodberrydev/purpledata#retrying-failed-http-requests)
1. [Unsubscribing](https://github.com/elwoodberrydev/purpledata#unsubscribing-from-httpclient)
1. [Query Parameters](https://github.com/elwoodberrydev/purpledata#query-parameters)
1. [Full HttpResponse](https://github.com/elwoodberrydev/purpledata#full-httpresponse)

1. [References](https://github.com/elwoodberrydev/purpledata#references)

---

### Prerequisites
1. Object Oriented concepts such as TypeScript classes and decorators.
2. Node v13.11.0
3. NPM 6.14.8
3. Angular CLI v10.1.7

---

### Getting Started

**Create The Project** - Create a new Angular project using Angular routing and SCSS.
```
$ ng new purple-data
```

**Serve The Project** - With the new project created, let's serve it up.
```
$ ng serve -o
```
---

### Simulating The Server

**Set Up Fake JSON REST API** - From within the project folder ('_project/purple-data')
```
$ npm install -save json-server
```

**Create a server folder** - From within the project create a folder for the server.
```
$ mkdir server
```
```
$ cd server
```
**Create JSON file** - From within the 'server' folder create 'database.json'.
```
$ touch database.json
```

**Install FakerJS** - From within the 'server' folder install FakerJS.
```
$ npm install faker -save
```

**Create Generate.js** - From within the 'server' folder create generate.js.
```
$ touch generate.js
```
```javascript
/*
GENERATE.JS
*/

var faker = require('faker'); // imported faker
var database = { products: [] }; // defined an object with one empty array for products

// Loop - for loop to create 300 fake entries using faker methods like faker.commerce.productName() for generating product names.
for ( var i = 1; i <= 300; i++ ){
  database.products.push( {
    id:i,
    name: faker.commerce.productName(),
    description: faker.lorem.sentences(),
    price: faker.commerce.price(),
    imageUrl: "https://source.unsplash.com/1600x900/?product",
    quantity: faker.random.number()
  });
}

// Log - converted the database object to a string and log it to standard output.
console.log( JSON.stringify( database ) );
```


**Update package.json** - Add the generate and server scripts to the package.json file
```JSON
"scripts": {
  "ng": "ng",
  "start": "ng serve",
  "build": "ng build",
  "test": "ng test",
  "lint": "ng lint",
  "e2e": "ng e2e",
  "generate": "node ./server/generate.js > ./server/database.json",
  "server": "json-server --watch /Users/steve/Documents/_elwoodberry.dev/_repos/purpledata/_project/purple-data/server/database.json"
}
```

**Generate Products** - Run the generate script
```
$ npm run generate
```

**Run the server** - Run the REST API
```
$ npm run server
```
---

### HttpClient

**Import HttpClientModule** - Import HttpClient into App Module
```javascript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import{HttpClientModule}from'@angular/common/http';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```
---

### Components

**Home** - Create the home component.
```javascript
$ ng generate component home
```

**About** - Create the about component.
```javascript
$ ng generate component about
```
---

### Routing

**Update Routing** - Add new components to the App Routing.
```javascript
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import{HomeComponent}from'./home/home.component';
import{AboutComponent}from'./about/about.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
```
---

### Angular Material

**Add** - Add Angular Material to the project.
 - Indigo/Pink
 - Global Angular Material typography
 - Browser animations
```
$ ng add @angular/material
```

**Update Style** - Add the following to the root stylesheet
```css
@import "~@angular/material/prebuilt-themes/indigo-pink.css";
```

**Components** - Add Angular Material components to App Module
```javascript
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
```

**Imports** - Add the Angual Material components to the imports array in the App Module.
```javascript
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatProgressSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

**HTML** - Update the app component HTML
```HTML
<mat-toolbar color="primary">
  <h1>Purple Data Project</h1>
  <button mat-button routerLink="/">Home</button>
  <button mat-button routerLink="/about">About</button>
</mat-toolbar>

<router-outlet></router-outlet>
```

---

### Services

**Create Service** -
```
$ ng generate service data
```

**Define Data Service** -
```javascript
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
```

**Update Component** - Update the 'Home' component
```javascript
import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public products=[]; //

  constructor( private dataService:DataService ) { }

  ngOnInit(){
    this.dataService.sendGetRequest().subscribe( ( data:any[] ) => {

      console.log( data );

      this.products = data;

    })
  }

}
```

**HTML** - Update the 'Home' HTML
```HTML
<div style = "padding:13px;">

  <mat-spinner *ngIf = "products.length === 0"></mat-spinner>

  <mat-card *ngFor = "let product of products" style = "margin-top:10px;">

    <mat-card-header>
      <mat-card-title>{{product.name}}</mat-card-title>
      <mat-card-subtitle>{{product.price}} $/ {{product.quantity}}</mat-card-subtitle>
    </mat-card-header>

    <mat-card-content>
      <p>{{product.description}}</p>
      <img style = "height:100%; width: 100%;" src = "{{ product.imageUrl }}" />
    </mat-card-content>

    <mat-card-actions>
      <button mat-button>Buy product</button>
    </mat-card-actions>

  </mat-card>

</div>
```
---

### Error Handling

**Update Imports** - Update the data service imports
```javascript
import { Injectable } from '@angular/core';
import { HttpClient,HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { retry,catchError } from 'rxjs/operators';
```

**Handle Errors** - Check if an error is an instance of ErrorEvent to get the type of the error.
 - See [HttpInterceptor](https://angular.io/api/common/http/HttpInterceptor) for global error handling.
```javascript

// ... Constructor code

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

// ... Send GET Request code

```
---

### Retrying Failed HTTP Requests
The RxJS library provides several retry operators.

**retry()** - Allows you to automatically re-subscribe to an RxJS Observable a specified number of times.
```javascript
public sendGetRequest(){
  return this.httpClient.get(this.REST_API_SERVER).pipe(retry(3), catchError(this.handleError));
}
```
---

### Unsubscribing from HttpClient
**Home Component** -
```javascript
import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  public products = []; //
  public destroy$: Subject<boolean> = new Subject<boolean>();

  constructor( private dataService:DataService ) { }

  ngOnInit(){
    this.dataService.sendGetRequest().pipe( takeUntil( this.destroy$ ) ).subscribe( ( data:any[] ) => {
      console.log( data );
      this.products = data;
    })
  }

  //
  ngOnDestroy() {
    this.destroy$.next(true);
    // Unsubscribe from the subject
    this.destroy$.unsubscribe();
  }

}
```
---

### Query Parameters
Adding the logic for implementing pagination in our example application.

**Update Imports** -
```javascript
import { HttpClient, HttpErrorResponse, HttpParams } from "@angular/common/http";
```

**Update Send GET** -
```javascript
public sendGetRequest(){
  const options = { params: new HttpParams( { fromString: "_- page=1&_limit=20"} ) };
  return this.httpClient.get( this.REST_API_SERVER, options ).pipe( retry(3), catchError( this.handleError ) );
}
```

---

### Full HttpResponse

**Update Imports** - Add the 'tap()'
```javascript
import { retry, catchError, tap } from 'rxjs/operators';
```

**New Variables** -
```javascript
public first: string = "";
public prev: string = "";
public next: string = "";
public last: string = "";
```

**parseLinkHeader** - Parse the Link header and populate the previous variables accordingly
```javascript
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
```

**Update sendGetRequest()** -
```javascript
public sendGetRequest(){
  // Add safe, URL encoded _page and _limit parameters
  return this.httpClient.get(
    this.REST_API_SERVER, {
      params: new HttpParams( {
        fromString: "_page=1&_limit=20"
      }),observe: "response"
    }).pipe( retry(3), catchError( this.handleError ), tap( res => {
      console.log( res.headers.get('Link') );
      this.parseLinkHeader(res.headers.get('Link'));
      }));
}
```

**Update Home Component** -
```javascript
ngOnInit() {
  this.dataService.sendGetRequest().pipe(takeUntil(this.destroy$)).subscribe( ( res: HttpResponse<any> ) => {
    console.log(res);
    this.products = res.body;
  })
}
```

**Update Data Service** - takes the URL to which we need to send an HTTP GET request.
```javascript
public sendGetRequestToUrl( url: string ){
  return this.httpClient.get(
    url,
    { observe: "response" } ).pipe( retry(3),
    catchError( this.handleError ),
    tap( res => {
      console.log( res.headers.get('Link') );
      this.parseLinkHeader( res.headers.get('Link') );
    }));
}
```

**Update Home Component** - First Page
```javascript
public firstPage() {
  this.products = [];
  this.dataService.sendGetRequestToUrl(
    this.dataService.first)
    .pipe(takeUntil(this.destroy$))
    .subscribe( ( res:HttpResponse<any> ) => {
      console.log(res);
      this.products = res.body;
    })
}
```

**Update Home Component** - Previous Page
```javascript
public previousPage() {
  if(this.dataService.prev!==undefined&&this.dataService.prev!==''){
    this.products = [];
    this.dataService.sendGetRequestToUrl(this.dataService.prev)
      .pipe(takeUntil(this.destroy$))
      .subscribe( ( res:HttpResponse<any> ) => {
        console.log(res);
        this.products = res.body;
      })
  }
}
```


**Update Home Component** - Next Page
```javascript
public nextPage() {
  if (this.dataService.next !== undefined && this.dataService.next !== '') {
    this.products = [];
    this.dataService.sendGetRequestToUrl(this.dataService.next)
      .pipe(takeUntil(this.destroy$))
      .subscribe( ( res:HttpResponse<any> ) => {
        console.log(res);
        this.products = res.body;
      })
  }
}
```

**Update Home Component** - Last Page
```javascript
public lastPage() {
  this.products = [];
  this.dataService.sendGetRequestToUrl(this.dataService.last)
  .pipe(takeUntil(this.destroy$))
  .subscribe( ( res:HttpResponse<any> ) => {
    console.log(res);
    this.products = res.body;
  })
}
```


**Update Home HTML** -
```HTML
<div style = "padding:13px;">

  <mat-spinner *ngIf = "products.length === 0"></mat-spinner>

  <mat-card *ngFor = "let product of products" style = "margin-top:10px;">

    <mat-card-header>
      <mat-card-title>#{{product.id}} {{product.name}}</mat-card-title>
      <mat-card-subtitle>{{product.price}} $/ {{product.quantity}}</mat-card-subtitle>
    </mat-card-header>

    <mat-card-content>
      <p>{{product.description}}</p>
      <img style = "height:100%; width: 100%;" src = "{{ product.imageUrl }}" />
    </mat-card-content>

    <mat-card-actions>
      <button mat-button>Buy product</button>
    </mat-card-actions>

  </mat-card>

</div>
<div>
  <button (click) ="firstPage()" mat-button> First</button>
  <button (click) ="previousPage()" mat-button> Previous</button>
  <button (click) ="nextPage()" mat-button> Next</button>
  <button (click) ="lastPage()" mat-button> Last</button>
</div>
```

---

### Typed HTTP Response

**New Interface** - Generate a new interface
```
$ ng generate interface product
```

**Update New Interface** - Update the type expectations of the interface.
```javascript
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  imageUrl: string;
}
```

**Update Data Service** - Update the HttpClient.get() type parameter
```javascript
import { Product } from './product';

...

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

...

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

```

**Update Home Component** -
```javascript
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Product } from '../product';

...

export class HomeComponent implements OnInit, OnDestroy {
  products:Product[] = [];

  ...

}

...

ngOnInit() {
  this.dataService.sendGetRequest()
  .pipe( takeUntil( this.destroy$ ) )
  .subscribe( (res:HttpResponse<Product[]> ) => {
    console.log(res);
    this.products = res.body;
  })
}

```

---

### References
1. [JSON Server](https://github.com/typicode/json-server)
1. [TypeScript](https://www.typescriptlang.org/)
1. [NodeJS](https://nodejs.org/en/)
1. [NPM](https://www.npmjs.com/)
1. [Angular CLI](https://cli.angular.io/)
1. [SASS](https://sass-lang.com/documentation/syntax#scss)
1. [faker.js](https://github.com/marak/Faker.js/) - Generate massive amounts of fake data.
1. [JSON Server](https://www.npmjs.com/package/json-server)
1. [Angular Material](https://material.angular.io/)
