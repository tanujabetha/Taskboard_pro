//We do not need to import the queue here, the worker automatically listens to the emailQueue


const { Worker } = require("bullmq");

const connection = {
    host: "localhost",
    port: 6379,
};


const emailWorker = new Worker("emailQueue", async(job)=>{
    const {type, taskData} = job.data;

    if(type === "created")
    {
        console.log(`Task "${taskData.title}" is created`);
    }
    else if(type === "updated")
    {
        console.log(`Task "${taskData.title}" is updated`);
    }
    else if(type === "deleted")
    {
        console.log(`Task "${taskData.title}" is deleted`);
    }
    else
    {
        console.log("Unknown task type");
    }
}, {connection}
);

emailWorker.on("completed", (job) => {
    console.log(`Job ${job.id} completed successfully`);
});

emailWorker.on("failed", (job, err) => {
    console.error(`Job ${job.id} failed with error: ${err.message}`);
});