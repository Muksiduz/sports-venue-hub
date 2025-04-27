import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

//import the database
import { connectDB } from "./utils/dbConnection.js";

//importing all the routes
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import venueRoutes from "./routes/venue.routes.js";
import adminRoutes from "./routes/admin.routes.js";

const app = express();
dotenv.config();

const PORT = process.env.PORT || 5000;

//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:4000", // frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

//call the db connection
connectDB();

//routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/venue", venueRoutes);
app.use("/api/admin", adminRoutes);

//starting the server
app.listen(PORT, (req, res) => {
  console.log("server started at ", PORT);
});
