import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
dotenv.config({ path: "../../.env.local", override: true });

//utils
import { connentDB } from "./utils/database.js";
import { connectCloudinary } from "./utils/cloudinary.js";

//routes
import formRouter from "./routes/formRoutes.js";

//configuration
const PORT = process.env.PORT || 8000;
const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json({ limit: "50mb" }));
app.use((req, res, next) => {
  res.on("finish", function () {
    let code = this.statusCode;
    console.log(`${req.method} ${req.originalUrl} ${code}`);
  });
  next();
});

//paths
app.get("/", (_, res) => res.json({ message: "Server is running!" }));

app.use("/api/v1/forms", formRouter);

//start-function
export const startServer = () => {
  try {
    connentDB();
    connectCloudinary();
    app.listen(PORT, () => console.log("Server is running on PORT:", PORT));
  } catch (error) {
    console.log("Server running failed");
    console.log(error);
  }
};
