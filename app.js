import express from "express";
import { loadEnvFile } from "node:process";
import { createServer } from "node:http";
import notesRouter from "./routes/notesRouter.js";
import indexRouter from "./routes/indexRouter.js";

// load environment variables
loadEnvFile();

const app = express();

// routers
app.use("/notes", notesRouter);
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
