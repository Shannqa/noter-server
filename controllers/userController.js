import { prisma } from "../prisma/lib/prisma.js";
import passport from "passport";
import bcrypt from "bcryptjs";

async function signUp(req, res) {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
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

async function changePassword(req, res, next) {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "User not authenticated" });
    }
    const { currentPassword, newPassword } = req.body;
    const match = await bcrypt.compare(currentPassword, req.user.password);

    if (!match) {
      console.log("passwords dont match");
      return res.status(401).json({ message: "Passwords don't match" });
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    const result = await prisma.user.update({
      where: {
        id: Number(req.user.id),
      },
      data: {
        password: hashedNewPassword,
      },
    });

    res.status(201).json(result);
  } catch (err) {
    console.error(err);
    res.status(400).send({ error: "Failed to change password" });
  }
}

export { signUp, logIn, logOut, auth, changePassword };
