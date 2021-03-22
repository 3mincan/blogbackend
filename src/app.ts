import express from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";
import postRoutes from "../routes/posts.js";
import Post from "../models/post.js";
import mongoose from "mongoose";

const app = express();
dotenv.config();
app.use(cors());

const getPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

// const url = "https://jobs.github.com/";

const PORT = process.env.PORT || 5000;

// app.get("/", (req, res) => res.send("Hello World"));

// app.get("/api", (req, res) => res.status(200).json({ data: "api" }));

app.get("/", (req, res) => {
  res.send("hello world");
});

app.get("/posts", getPosts);

// app.get("/api/", (req, res) => {
//   axios({
//     url: url + "positions.json",
//     headers: {
//       "Access-Control-Allow-Origin": "*",
//       "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
//     },
//   })
//     .then((response) => {
//       console.log(response.data);
//       res.json(response.data);
//     })
//     .catch((err) => {
//       res.send("errr!!!");
//     });
// });

// app.get("/api/positions/:id.json", (req, res) => {
//       let id = req.params.id;
//       console.log(id)

//   axios({
//     url: url + `positions/${id}.json`,
//   })
//     .then((response) => {
//       console.log(response.data);
//       res.json(response.data);
//     })
//     .catch((err) => {
//       res.send("errr!!!");
//     });
// });

// app.listen(port, () =>
//   console.log(`Server running on ${port}, http://localhost:${port}`)
// );

mongoose
  .connect(`${process.env.CONNECTION_URL}`, {
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