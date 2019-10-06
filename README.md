# Node-JWT-Impl

Simple application to demonstrate authentication using JWT in Node

## Information
Models are kept at [Models](NodeJwtServer/model) 
Validator (@hapi/joi) is used for validating incoming request data, kept at [Validator](master/NodeJwtServer/routes/validation.js) 
Auth route is kept at [AuthRoute](NodeJwtServer/routes/auth.js), it has 2 parts 
  * Register a user [Code Link](NodeJwtServer/routes/auth.js#L8), this will create a user in Mongo DB, password is encrypted using (bcrypt) library
  * Login a user [Code Link](NodeJwtServer/routes/auth.js#L44), this will authenticate the user and will issue a JWT token and keep it in the response header **'auth-token'** 

- VerifyToken helper function acting as a middleware is kept at [VerifyToken](master/NodeJwtServer/routes/verifyToken.js)
- Main application [Link](master/NodeJwtServer/index.js)

## Libraries used
**@hapi/joi:** Used for input validation using schema <br>
**bcryptjs:** Used for generating hash of password provided by user <br>
**dotenv:** Used for keeping config <br>
**express:** Used for main app development <br>
**jsonwebtoken:** Used for JWT token generation and verification using secret <br>
**mongoose:** Used for connecting and communication with Mongo DB <br>
