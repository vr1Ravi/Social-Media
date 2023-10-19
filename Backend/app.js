import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
// Importing ROutes
import { router as post } from "./Routes/postRoute.js";
import { router as user } from "./Routes/userRoute.js";
//  DotEnv Configuration
if (process.env.NODE_ENV !== "production") {
  dotenv.config({ path: "Backend/Config/config.env" });
}

const app = express(); // app is an express instance

// Middlewares
app.use(
  express.json()
); /* responsible for parsing incoming requests with json payloads to object and then this obj is attached to req
object and make available as req.body in controller function */

app.use(
  express.urlencoded({ extended: true })
); /* The extended option allows to choose between parsing the URL-encoded data with the
 querystring library (when false) or the qs library (when true). The qs library allows for a richer set of features, including nested
 objects and arrays in the URL-encoded data. */
app.use(cookieParser());
// Using routes
app.use("/api/v1", post);
app.use("/api/v1", user);

export { app };
