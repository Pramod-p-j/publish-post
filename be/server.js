const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const customConst = require("./config/custom");

mongoose.connect("mongodb://localhost:27017/publish-post-db");

const app = express();
app.use(cors());
app.use(express.json());

app.use(`${customConst.API_PREFIX_BACKEND}`, require("./routes/routes"));

app.listen(1338, () => {
  console.log("server 5000 started and running");
});
