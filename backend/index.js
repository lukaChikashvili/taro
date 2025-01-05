const express = require("express");
const connectDB = require("./config/db");
const cors = require('cors');  
const {routes} = require("./routes/route");
const {uploadRoutes} = require("./routes/uploadRoutes");
const path = require('path');
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
app.use('/api/upload', uploadRoutes);

app.use('/uploads', express.static(path.join(__dirname, 'routes/uploads')));

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})





