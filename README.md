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

 Message queue:
 create a docker for redis.
 docker pull redis - downloads redis image
 now, we need to run docker aswell:
 docker run -d -p 6379:6379 --name redis-server redis
run redis in detached mode in port 6379 with container name as redis-server.
Detached mode means it runs in the background.
docker ps - shows the running contaners

docker stop redis-server
docker start redis-server

BullMQ: Install: npm install bullmq ioredis dotenv
Have the queue worker running in diff terminal. 
npm workers/emailWorker.js



Creating React Appp:
npx create-react-app taskboard-frontend
Navigate to taskboard-frontend and run react app with npm start
We'll use:
Axios for API calls: npm install axios react-router-dom
React Router for navigation
Context API or localStorage to manage the JWT token
