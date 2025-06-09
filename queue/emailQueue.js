const {Queue} = require('bullmq');
require('dotenv').config();

const connection = {
    host: "localhost",
    port: 6379,
}

const emailQueue = new Queue('emailQueue', { connection });

module.exports = emailQueue;
// This code sets up a BullMQ queue named 'emailQueue' that can be used to manage email sending tasks.
// The queue is connected to a Redis server running on localhost at port 6379.
// The queue can be used to add, process, and manage email-related jobs in a Node.js application.
// Ensure you have Redis running and BullMQ installed in your project to use this code.