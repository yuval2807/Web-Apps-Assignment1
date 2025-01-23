import { Express } from "express";
import request from "supertest";
import appInit from "../../server";

import mongoose from "mongoose";
import userModel, { IUser } from "../models/user";
import postModel from "../models/post";

let app: Express;

const baseUrl = "/auth";

export type User = IUser & {
  accessToken?: string;
  refreshToken?: string;
  _id?: string;
};

const testUser: User = {
  name: "Moshe",
  email: "test@user.com",
  password: "testpassword",
};

beforeAll(async () => {
  app = await appInit();

  console.log("before all");
  await userModel.deleteMany();
  await postModel.deleteMany();
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Auth tests", () => {
  test("Auth test - register", async () => {
    const response = await request(app)
      .post(baseUrl + "/register")
      .send(testUser);
    expect(response.statusCode).toBe(200);
  });

  test("Auth test - register same user twice (fail)", async () => {
    const response = await request(app)
      .post(baseUrl + "/register")
      .send(testUser);
    expect(response.statusCode).not.toBe(200);
  });

  test("Auth test - register wrong credentials (fail)", async () => {
    const response = await request(app)
      .post(baseUrl + "/register")
      .send({ email: "gfjwdjh" });
    expect(response.statusCode).not.toBe(200);

    const response2 = await request(app)
      .post(baseUrl + "/register")
      .send({ email: "", password: "hgdjhh" });
    expect(response2.statusCode).not.toBe(200);

    const response3 = await request(app)
      .post(baseUrl + "/login")
      .send({
        email: testUser.email,
        password: "jhhgsfj",
      });
    expect(response3.statusCode).not.toBe(200);

    const response4 = await request(app)
      .post(baseUrl + "/login")
      .send({
        email: "gggjfs",
        password: "jhhgsfj",
      });
    expect(response4.statusCode).not.toBe(200);
  });

  test("Auth test - login", async () => {
    const response = await request(app)
      .post(baseUrl + "/login")
      .send(testUser);
    expect(response.statusCode).toBe(200);
    testUser.accessToken = response.body.accessToken;
    testUser.refreshToken = response.body.refreshToken;
    expect(testUser.accessToken).toBeDefined();
    expect(testUser.refreshToken).toBeDefined();
    expect(response.body._id).toBeDefined();
    testUser._id = response.body._id;
  });

  test("Auth test - create post with authorization", async () => {
    const response_fail = await request(app).post("/post").send({
      sender: "fffff",
      title: "test post",
      content: "test post content, amazing post",
    });
    expect(response_fail.statusCode).not.toBe(200);

    const response_success = await request(app)
      .post("/post")
      .set({ authorization: "Bearer " + testUser.accessToken })
      .send({
        sender: testUser._id,
        title: "test post",
        content: "test post content, amazing post",
      });
    expect(response_success.statusCode).toBe(200);
  });

  //   test("Test refresh token", async () => {
  //     const response = await request(app)
  //       .get(baseUrl + "/refresh")
  //       .send({ refreshToken: testUser.refreshToken });
  //     expect(response.statusCode).toBe(200);
  //     testUser.accessToken = response.body.accessToken;
  //     testUser.refreshToken = response.body.refreshToken;
  //     expect(testUser.accessToken).toBeDefined();
  //     expect(testUser.refreshToken).toBeDefined();
  //   });

  //   test("Test refresh token - fail", async () => {
  //     const response = await request(app)
  //       .get(baseUrl + "/refresh")
  //       .send({ refreshToken: testUser.refreshToken });
  //     expect(response.statusCode).toBe(200);

  //     const newRefreshToken = response.body.refreshToken;

  //     const response2 = await request(app)
  //       .get(baseUrl + "/refresh")
  //       .send({
  //         refreshToken: testUser.refreshToken,
  //       });
  //     expect(response2.statusCode).not.toBe(200);

  //     const response3 = await request(app)
  //       .get(baseUrl + "/refresh")
  //       .send({
  //         refreshToken: newRefreshToken,
  //       });
  //     expect(response3.statusCode).not.toBe(200);
  //   });

  test("Test logout - no token - should fail", async () => {
    const responseLogout = await request(app).get("/auth/logout");
    expect(responseLogout.statusCode).toBe(401);
  });

  //jest.setTimeout(10000);

  test("Test logout", async () => {
    const responseLogin = await request(app).post("/auth/login").send(testUser);
    testUser.accessToken = responseLogin.body.accessToken;
    testUser.refreshToken = responseLogin.body.refreshToken;
    expect(testUser.accessToken).toBeDefined();
    expect(testUser.refreshToken).toBeDefined();

    const responseLogout = await request(app)
      .get("/auth/logout")
      .set({ authorization: "Bearer " + testUser.refreshToken });
    expect(responseLogout.statusCode).toBe(200);

    // const response3 = await request(app)
    //   .get("/auth/refresh")
    //   .set({ authorization: "Bearer " + testUser.refreshToken });
    // expect(response3.statusCode).not.toBe(200);
  });
});
