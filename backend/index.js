const express = require("express");
const connectDB = require("./config/db");
const app = express();
require("dotenv").config();

app.use(express.json());


const PORT = process.env.PORT || 5000;

 
connectDB();

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})





