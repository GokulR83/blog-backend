const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./database/connectDB");
const blogRoute = require("./routes/blog");
const cookieParser = require("cookie-parser");
const authRoute = require("./routes/auth");
const generateRoute = require("./routes/generate");
const verifyToken = require("./middleware/verifyToken");
const userRoute = require("./routes/user");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
//? Values came from the environment variable
dotenv.config();
const port = process.env.PORT || 7000;
const database_url = process.env.DATABASE_URL;

//? to parse the cookies
app.use(cookieParser());

//? Middlewares
app.use(express.json());
app.use(bodyParser.json());

//? Use path as middleware
app.use("/uploads",express.static(path.join( __dirname,"uploads")))

//? Routes
//* Auth Route
app.use("/api/auth",authRoute);

//* User Route
app.use("/api/user",userRoute);


//* Blog Route
app.use("/api/blog",blogRoute);

//* Generate URL
app.use("/api/generate",generateRoute);


//? Database Connectivity
connectDB(database_url);

//? Server
app.listen(port,()=> console.log(`server running on port ${port}`));