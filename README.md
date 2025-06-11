Taskboard-Pro:
A secure and scalable backend for a task management system, built with Node.js, Express, MongoDB, and Redis. This project supports user authentication, task CRUD operations, and asynchronous email notifications using BullMQ.


Features

1. JWT-based user authentication (signup/login)

2. CRUD APIs for managing tasks

3. Middleware-protected routes for authenticated users

4. Email notifications via BullMQ + Redis queue

5. Integration tests with Jest & Supertest (WIP)



Tech Stack

Backend: Node.js, Express.js

Database: (NoSQL) MongoDB + Mongoose

Auth: JWT Tokens, bcrypt

Queue: BullMQ + Redis

Testing: Jest, Supertest

Dev Tools: Nodemon, dotenv



API Endpoints

Auth Routes:

Method |      Endpoint    | Description

POST   | /api/auth/signup | Register new user

POST   | /api/auth/login  | Login with JWT

Task Routes:

Method |     Endpoint     |  Description

POST   |   /api/task/create | Create a new task

GET    |  /api/task/getTask | Get a specific task

GET     |  /api/task/getAllTasks | Get all tasks

PUT     | /api/task/updateTask | Update a task

DELETE  | /api/task/deleteTask | Delete a task


Setup Instructions:

1. Clone repogit clone https://github.com/tanujabetha/Taskboard_pro.git

2. Install dependencies: npm install

3. Create .env file
PORT=4000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_jwt_secret
REDIS_HOST=localhost
REDIS_PORT=6379

4. docker run --name redis -p 6379:6379 redis

5. Run the server
   npm run dev



Run Tests:
npm test


Postman Collection:
This is available in the postman folder.
