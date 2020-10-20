![Project By Elwood Berry](https://elwoodberry.dev/wp-content/uploads/2020/10/elwoodberry_logo.png)

# Purple Data Project
Test driven developed (tdd) Angular project.

### Prerequisites
1. Object Oriented concepts such as TypeScript classes and decorators.
2. Node v13.11.0
3. NPM 6.14.8
3. Angular CLI v10.1.7
3. SCSS

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
