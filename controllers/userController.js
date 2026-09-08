import { prisma } from "../prisma/lib/prisma.js";
import passport from "passport";
import bcrypt from "bcryptjs";
import { body, validationResult } from "express-validator";

async function signUp(req, res, next) {
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
    if (err.code === "P2002") {
      const fields = err.meta.driverAdapterError.cause.constraint.fields;
      let errors = [];
      if (fields.includes("name")) {
        errors.push({
          path: "name",
          msg: "Username already exists",
        });
      }
      if (fields.includes("email")) {
        errors.push({
          path: "email",
          msg: "Email is already in use",
        });
      }
      return res.status(409).json({ error: errors });
    }
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
      console.log("err", info);
      return res.status(401).json({
        error: [info],
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

async function changePassword(req, res) {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "User not authenticated" });
    }

    const { currentPassword, newPassword } = req.body;
    const match = await bcrypt.compare(currentPassword, req.user.password);

    if (!match) {
      return res.status(401).json({
        error: [
          {
            msg: "The current password is incorrect",
            path: "currentPassword",
          },
        ],
      });
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

/* Validators */
const validateSignup = [
  body("name")
    .trim()
    .isLength({ min: 2, max: 128 })
    .withMessage("Username must be between 2 and 128 characters")
    .escape(),
  body("email")
    .trim()
    .isEmail()
    .withMessage("Not a valid email address")
    .escape(),
  body("password")
    .isLength({ min: 4, max: 128 })
    .withMessage("Password must be between 4 and 128 characters"),

  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }
    next();
  },
];

const validateLogin = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("Enter your username")
    .isLength({ max: 128 })
    .withMessage("Username must not exceed 128 characters"),
  body("password")
    .notEmpty()
    .withMessage("Enter your password")
    .isLength({ max: 128 })
    .withMessage("Password must not exceed 128 characters"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: errors.array(),
      });
    }
    next();
  },
];

const validateChangePassword = [
  body("currentPassword")
    .notEmpty()
    .withMessage("Current password is required"),
  body("newPassword")
    .isLength({ min: 4, max: 128 })
    .withMessage("Password must be between 4 and 128 characters"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: errors.array(),
      });
    }
    next();
  },
];

export {
  signUp,
  logIn,
  logOut,
  auth,
  changePassword,
  validateSignup,
  validateLogin,
  validateChangePassword,
};
