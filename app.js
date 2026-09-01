import express from "express";
import { loadEnvFile } from "node:process";
import { createServer } from "node:http";
import cors from "cors";
import session from "express-session";
import passport from "passport";
import bcrypt from "bcryptjs";
import { Strategy as LocalStrategy } from "passport-local";
import { prisma } from "./prisma/lib/prisma.js";
import PG from "pg";
import noteRouter from "./routes/noteRouter.js";
import userRouter from "./routes/userRouter.js";
import indexRouter from "./routes/indexRouter.js";
import categoryRouter from "./routes/categoryRouter.js";
import connectPgSimple from "connect-pg-simple";

// load environment variables
loadEnvFile();

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

// auth
const { Pool } = PG;
const pgSession = connectPgSimple(session);
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

app.use(
  session({
    store: new pgSession({ pool }),
    secret: "cats",
    resave: false,
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 }, // 30 days
    saveUninitialized: false,
  }),
);
app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

// routers
app.use("/note", noteRouter);
app.use("/user", userRouter);
app.use("/category", categoryRouter);
app.use("/", indexRouter);
app.use(express.urlencoded({ extended: false }));

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      // console.log(user, username, req);
      console.log("strategy", username, password);
      const user = await prisma.user.findUnique({
        where: {
          name: username,
        },
      });
      console.log("user", user);
      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }

      const match = await bcrypt.compare(password, user.password);

      if (!match) {
        return done(null, false, { message: "Incorrect password" });
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }),
);

passport.serializeUser((user, done) => {
  console.log(user);
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });
    console.log(user);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

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
