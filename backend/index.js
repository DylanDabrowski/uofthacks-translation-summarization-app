const express = require("express");
const app = express();
var cors = require("cors");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
const cohere = require("cohere-ai");
const vision = require("@google-cloud/vision");
const { GoogleAuth } = require("google-auth-library");
require("dotenv").config();
cohere.init(process.env.COHERE_KEY);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

app.post("/summarize/text", async (req, res) => {
  try {
    let resp = await cohere.generate({
        prompt: req.body.input,
        max_tokens: req.body.tokens
    });
    res.status(200).json(resp);
  } catch (err) {
    res.status(500).json(err);
  }
});

const auth = new GoogleAuth({
  keyFile: "./key.json",
  scopes: "https://www.googleapis.com/auth/cloud-platform",
});
// Creates a client
const client = new vision.ImageAnnotatorClient({ auth });

app.post("/imageToText", async (req, res) => {
  try {
    console.log("hello world");
    console.log("file buffer", req.file.buffer)
    const [result] = await client.textDetection(req.file.buffer);
    const detections = result.textAnnotations;
    console.log("Text:");
    detections.forEach((text) => console.log(text));
    res.status(200).json(detections);
  } catch (error) {

    res.status(500).send("imagetotext error message: " + error);
  }
});

app.listen(process.env.PORT || 8080, () => {
  console.log(
    `ollie listening at http://localhost:${process.env.PORT || 8080}`
  );
});
