import express, { Express } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import connectToDatabase from "./src/config/db";
import postRoutes from "./src/routes/post";
import commentRoutes from "./src/routes/comment";
import userRoutes from "./src/routes/user";
import authRoutes from "./src/routes/auth";
import swaggerUi from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Web dev 2024 api",
      description: "Blog API Information",
      version: "1.0.0",
      contact: {
        name: "Amazing Developer",
      },
      servers: [{ url: "http://localhost:" + process.env.PORT }],
    },
  },
  apis: ["./src/routes/*.ts"],
};

dotenv.config();

const swaggerDocs = swaggerJsDoc(swaggerOptions);

const app: Express = express();
const port = process.env.PORT || 3000;

const db = connectToDatabase();

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/post", postRoutes);
app.use("/comment", commentRoutes);
app.use("/user", userRoutes);
app.use("/auth", authRoutes);

app.get("/about", (req, res) => {
  res.send("Hello World!");
});

const initApp = () => {
  return new Promise<Express>(async (resolve, reject) => {
    if (process.env.DB_CONNECTION == undefined) {
      reject("DB_CONNECTION is not defined");
    } else {
      await mongoose.connect(process.env.DB_CONNECTION);
      resolve(app);
    }
  });
};

export default initApp;
