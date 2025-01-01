const express = require("express");
const connectDB = require("./config/db");
const cors = require('cors');  
const {routes} = require("./routes/route")
const app = express();

require("dotenv").config();

app.use(express.json());


const PORT = process.env.PORT || 5000;

 
connectDB();

app.use(cors({
    origin: ['http://localhost:5173'],  
      methods: 'GET,POST,PUT,DELETE',
      allowedHeaders: ['Content-Type', 'Authorization'],
      credentials: true
    }));

app.use("/api", routes);

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})





