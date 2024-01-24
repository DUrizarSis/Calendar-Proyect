const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const routes = require("./src/routes/index");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
app.use("/api", routes)

//MongoDB connection
mongoose
    .connect(process.env.MONGODB_URI)
    .then(()=> console.log("Connected to MongoDB Atlas"))
    .catch((error)=> console.error(error));

app.listen(PORT, () => console.log("server listening on port", PORT));