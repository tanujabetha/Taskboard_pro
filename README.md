appName=TaskboardPro

npm install mongodb

steps:
install node
set up mongodb atlas
get the connection string
npm install dotenv

app.js: main code file
.env: for all the environment variables


1. Build authentication module
2. Build authController. 
Install npm install bcryptjs express-validator
3. login: Login and give json web token(JWT).
npm install jsonwebtoken


install nodemon: This is helpful if you want to run the server with the changes being made. Other wise, for each change, we need to quick the server, and restart using npm app.js. This is nodemon app.js


Tests:
 npm install --save-dev jest supertest
 --save-dev means it is only for development not for production.