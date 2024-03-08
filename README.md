### Backend repository for CloudX: AWS Practitioner for JS course 

## Task 4

* created two database tables in DynamoDB;
* wrote a script to fill tables with test examples (see `script` folder);
* integrated a database to the existing functions;
* created a new lambda function `createProduct`:
 
  POST - https://nmv70szrl7.execute-api.eu-central-1.amazonaws.com/products

# Previously created functions:
* `getProductsList`:
  
  `GET` - https://nmv70szrl7.execute-api.eu-central-1.amazonaws.com/products
* `getProductsById`:
  
  `GET` - https://nmv70szrl7.execute-api.eu-central-1.amazonaws.com/products/{productId}
  
Additional scope;
* added unit necessary unit tests;
* `POST` /products lambda functions returns error 400 status code if product data is invalid;
* all lambdas return error 500 status code on any error (DB connection, any unhandled error in code);
* all lambdas do `console.log` for each incoming requests and their arguments;
* transaction based creation of product.

* swagger
  https://nmv70szrl7.execute-api.eu-central-1.amazonaws.com/swagger

