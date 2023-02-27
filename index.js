import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
// import helmet from "helmet";
// import morgan from "morgan";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";

import User from "./models/User.js";
import { users } from "./data/index.js";

dotenv.config();
const app = express();
app.use(express.json());
// app.use(helmet());
// app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
// app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

/* ROUTES */
app.use("/auth", authRoutes);
app.use("/users", userRoutes);

// ---mongoose setup

const PORT = process.env.PORT || 6002;
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));

    /* ADD DATA ONE TIME */
    // User.insertMany(users);
  })
  .catch((error) => console.log(`${error} did not connect`));
