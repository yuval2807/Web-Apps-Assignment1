import request from "supertest";
import appInit from "../../server";
import mongoose from "mongoose";
import userModel, { IUser } from "../models/user";

import testCommentsData from "./test_comments.json";
import { Express } from "express";

let app: Express;
const baseUrl = "/user";

// type Comment = {
//   _id?: string;
//   post: string;
//   message: string;
//   user: string;
// };

type User = {
  name: string;
  email: string;
  password: string;
  token?: string;
  _id?: string;
};

const testUser: User = {
  name: "Moshe",
  email: "user@test.com",
  password: "1234567",
};

beforeAll(async () => {
  console.log("Before all tests");
  app = await appInit();
  await userModel.deleteMany();

  await request(app).post("/auth/register").send(testUser);
  const response = await request(app).post("/auth/login").send(testUser);
  testUser.token = response.body.accessToken;
  testUser._id = response.body._id;
  expect(response.statusCode).toBe(200);
});

afterAll(() => {
  console.log("After all tests");
  mongoose.connection.close();
});

describe("User Test", () => {
  test("Test get all users", async () => {
    const response = await request(app)
      .get(baseUrl)
      .set({ authorization: "Bearer " + testUser.token });
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(1);
  });

  test("Test get user by userId", async () => {
    const response = await request(app)
      .get(baseUrl + "/" + testUser._id)
      .set({ authorization: "Bearer " + testUser.token });
    expect(response.statusCode).toBe(200);
    expect(response.body._id).toBe(testUser._id);
  });

  test("Test get user by userId - fail", async () => {
    const response = await request(app)
      .get(baseUrl + "/" + "525252")
      .set({ authorization: "Bearer " + testUser.token });
    expect(response.statusCode).toBe(400);
  });

  test("Test get user by userId - fail - user not found", async () => {
    const response = await request(app)
      .get(baseUrl + "/" + "67914d378dc426db327977b5")
      .set({ authorization: "Bearer " + testUser.token });
    expect(response.statusCode).toBe(404);
  });

  test("Test update user by id", async () => {
    const response = await request(app)
      .put(baseUrl + "/" + testUser._id)
      .set({ authorization: "Bearer " + testUser.token })
      .send({
        name: "Inbar ",
      });
    expect(response.statusCode).toBe(200);
  });

  test("Test update user by id - fail", async () => {
    const response = await request(app)
      .put(baseUrl + "/" + "525252")
      .set({ authorization: "Bearer " + testUser.token })
      .send({
        name: "Inbar",
      });
    expect(response.statusCode).toBe(400);
  });

  test("Test update user by id - fail - user not found", async () => {
    const response = await request(app)
      .put(baseUrl + "/" + "67914d378dc426db327977b5")
      .set({ authorization: "Bearer " + testUser.token })
      .send({
        name: "Inbar ",
      });
    expect(response.statusCode).toBe(404);
  });
});
