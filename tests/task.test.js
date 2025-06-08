const request = require("supertest");
const app = require("../app"); 
const mongoose = require("mongoose");

let token = "";
let createdTaskId = "";

beforeAll(async () => {
  // signup test user
  await request(app)
    .post("/api/auth/signup")
    .send({
      name: "Test User",
      email: "testuser@example.com",
      password: "test123",
    });

  // Login to get token
  const loginRes = await request(app)
    .post("/api/auth/login")
    .send({
      email: "testuser@example.com",
      password: "test123",
    });

  token = loginRes.body.token;
});

afterAll(async () => {
  // Close DB connection after tests
  await mongoose.connection.close();
});

describe("Task API Integration Tests", () => {
  it("should create a new task", async () => {
    const res = await request(app)
      .post("/api/tasks/create")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Test Task",
        description: "Created during test",
        status: "To Do",
        labels: ["test"],
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe("Task is created");

    // Fetch the created task from DB to get its ID
    const allTasksRes = await request(app)
      .get("/api/tasks/getAllTasks")
      .set("Authorization", `Bearer ${token}`);

    const createdTask = allTasksRes.body.find(
      (t) => t.title === "Test Task"
    );

    createdTaskId = createdTask._id;
    expect(createdTask).toBeDefined();
  });

  it("should get all tasks", async () => {
    const res = await request(app)
      .get("/api/tasks/getAllTasks")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it("should update the task", async () => {
    const res = await request(app)
      .put("/api/tasks/updateTask")
      .set("Authorization", `Bearer ${token}`)
      .send({
        taskId: createdTaskId,
        description: "Updated by Jest test",
        status: "In Progress",
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe("In Progress");
    expect(res.body.description).toBe("Updated by Jest test");
  });

  it("should delete the task", async () => {
    const res = await request(app)
      .delete("/api/tasks/deleteTask")
      .set("Authorization", `Bearer ${token}`)
      .send({
        taskId: createdTaskId,
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Task deleted successfully");
  });
});
