

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
