import express from "express";
import { loadEnvFile } from "node:process";
import { createServer } from "node:http";
import cors from "cors";
import noteRouter from "./routes/noteRouter.js";
import userRouter from "./routes/userRouter.js";
import indexRouter from "./routes/indexRouter.js";
import categoryRouter from "./routes/categoryRouter.js";

// load environment variables
loadEnvFile();

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);
// routers
app.use("/note", noteRouter);
app.use("/user", userRouter);
app.use("/category", categoryRouter);
app.use("/", indexRouter);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send(err.message);
});

const PORT = process.env.PORT || 3005;

app.listen(PORT, (err) => {
  if (err) {
    throw err;
  }
  console.log("Listening on port " + PORT);
});
