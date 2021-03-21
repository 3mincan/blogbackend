import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import axios from "axios";
import postRoutes from "./routes/posts.js";

const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

const url = "https://jobs.github.com/";

app.get("/", (req, res) => {
  res.send("hello world");
});

app.use("/posts", postRoutes);

app.get("/api", (req, res) => {
  axios({
    url: url + "positions.json",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    },
  })
    .then((response) => {
      console.log(response.data);
      res.json(response.data);
    })
    .catch((err) => {
      res.send("errr!!!");
    });
});

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port: ${PORT} `));
  })
  .catch((error) => {
    console.error(error.message);
  });

mongoose.set("useFindAndModify", false);
