import request from "supertest";
import appInit from "../../server";
import mongoose from "mongoose";
import commentsModel, { IComment } from "../models/comment";

import testCommentsData from "./test_comments.json";
import { Express } from "express";
//import app from "../../app";

let app: Express;
const baseUrl = "/comment";

type Comment = {
  _id?: string;
  post: string;
  message: string;
  user: string;
};

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

const testComments: Comment[] = testCommentsData;

beforeAll(async () => {
  console.log("Before all tests");
  app = await appInit();
  await commentsModel.deleteMany();

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

describe("Comments Test", () => {
  test("Test get all comments empty", async () => {
    const response = await request(app)
      .get(baseUrl)
      .set({ authorization: "Bearer " + testUser.token });
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(0);
  });

  test("Test create new comment", async () => {
    for (let comment of testComments) {
      const response = await request(app)
        .post(baseUrl)
        .set({ authorization: "Bearer " + testUser.token })
        .send(comment);
      expect(response.statusCode).toBe(201);
      expect(response.body.message).toBe(comment.message);
      expect(response.body.post).toBe(comment.post);
      expect(response.body.user).toBe(comment.user);
      comment._id = response.body._id;
    }
  });

  test("Test get all comments", async () => {
    const response = await request(app)
      .get(baseUrl)
      .set({ authorization: "Bearer " + testUser.token });
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(testComments.length);
  });

  test("Test get all comments by post id", async () => {
    const response = await request(app)
      .get(baseUrl + "?postId=" + testComments[0].post)
      .set({ authorization: "Bearer " + testUser.token });
    expect(response.statusCode).toBe(200);
  });

  test("Test get all comments - fail", async () => {
    const response = await request(app)
      .get(baseUrl + "?postId=" + "77777")
      .set({ authorization: "Bearer " + testUser.token });
    expect(response.statusCode).not.toBe(200);
  });

  test("Test get comment by id", async () => {
    const response = await request(app)
      .get(baseUrl + "/" + testComments[0]._id)
      .set({ authorization: "Bearer " + testUser.token });
    expect(response.statusCode).toBe(200);
    expect(response.body._id).toBe(testComments[0]._id);
  });

  test("Test get comment by id - fail", async () => {
    const response = await request(app)
      .get(baseUrl + "/" + "848484")
      .set({ authorization: "Bearer " + testUser.token });
    expect(response.statusCode).not.toBe(200);
  });

  test("Test filter comment by owner", async () => {
    const response = await request(app)
      .get(baseUrl + "?owner=" + testComments[0].user)
      .set({ authorization: "Bearer " + testUser.token });
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(2);
  });

  test("Test update comment by id", async () => {
    const response = await request(app)
      .put(baseUrl + "/" + testComments[0]._id)
      .set({ authorization: "Bearer " + testUser.token })
      .send({
        message: "Test comment updated",
      });
    expect(response.statusCode).toBe(200);
  });

  test("Test update comment by id - fail - incorrect body ", async () => {
    const response = await request(app)
      .put(baseUrl + "/" + testComments[0]._id)
      .set({ authorization: "Bearer " + testUser.token })
      .send({
        message: "Test comment updated",
        post: "77777",
      });
    expect(response.statusCode).toBe(400);
  });

  test("Test update comment by id - fail - incorrect commentId", async () => {
    const response = await request(app)
      .put(baseUrl + "/" + "17925565c6ed86535a470da0")
      .set({ authorization: "Bearer " + testUser.token })
      .send({
        message: "Test comment updated",
      });
    expect(response.statusCode).toBe(404);
  });

  test("Test Delete comment", async () => {
    const response = await request(app)
      .delete(baseUrl + "/" + testComments[0]._id)
      .set({ authorization: "Bearer " + testUser.token });

    expect(response.statusCode).toBe(200);

    const responseGet = await request(app).get(
      baseUrl + "/" + testComments[0]._id
    );
    expect(responseGet.statusCode).toBe(404);
  });

  test("Test Delete comment - fail", async () => {
    const response = await request(app)
      .delete(baseUrl + "/555")
      .set({ authorization: "Bearer " + testUser.token });

    expect(response.statusCode).toBe(400);
  });

  test("Test create new comment fail", async () => {
    const response = await request(app)
      .post(baseUrl)
      .set({ authorization: "Bearer " + testUser.token })
      .send({
        message: "Test comment 1",
      });
    expect(response.statusCode).toBe(400);
  });
});
