import { prisma } from "../prisma/lib/prisma.js";
import passport from "passport";

async function signUp(req, res) {
  try {
    const { name, email, password } = req.body;
    const result = await prisma.user.create({
      data: {
        name,
        email,
        password,
      },
    });
    // console.log(result);
    res.status(201).json(result);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: "Failed to sign up" });
  }
}

async function logIn(req, res, next) {
  // console.log(req.body);
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }

    if (!user) {
      return res.status(401).json({
        message: info?.message,
      });
    }

    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }

      return res.json({
        user,
      });
    });
  })(req, res, next);
}

async function logOut(req, res, next) {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    // console.log("logout11");
    res.status(200).json({ message: "Logged out" });
  });
}

async function auth(req, res) {
  // console.log("cookie:", req.headers.cookie);
  // console.log("session:", req.session);
  // console.log("user:", req.user);
  // console.log("authenticated:", req.isAuthenticated());
  if (req.isAuthenticated()) {
    res.json(req.user);
  } else {
    res.status(401).json({ error: "Not authenticated" });
  }
}

export { signUp, logIn, logOut, auth };
