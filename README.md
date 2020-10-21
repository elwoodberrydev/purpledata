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

1. [References](https://github.com/typicode/json-server)

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
