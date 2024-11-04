"use strict";
const express = require("express");
const app = express();
const port = 8000;
const cors = require("cors");
const bodyParser = require("body-parser");


app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
app.listen(port, () => {
  console.log("Server is running on http://localhost:" + port);
});