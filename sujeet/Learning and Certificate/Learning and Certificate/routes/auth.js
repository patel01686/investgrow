const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User");

// Login page
router.get("/login", (req, res) => {
  if (req.session.user) {
    return res.redirect("/dashboard");
  }

  res.render("pages/login", {
    title: "Login",
    currentPage: "login",
    error: req.query.error,
  });
});

// Register page
router.get("/register", (req, res) => {
  if (req.session.user) {
    return res.redirect("/dashboard");
  }

  res.render("pages/register", {
    title: "Register",
    currentPage: "register",
    error: req.query.error,
  });
});

// Login form submission
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.redirect("/auth/login?error=Invalid credentials");
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.redirect("/auth/login?error=Invalid credentials");
    }

    // Set user in session
    req.session.user = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    res.redirect("/dashboard");
  } catch (err) {
    console.error(err);
    res.redirect("/auth/login?error=Server error");
  }
});

// Register form submission
router.post("/register", async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  // Simple validation
  if (password !== confirmPassword) {
    return res.redirect("/auth/register?error=Passwords do not match");
  }

  try {
    // Check if user exists
    let user = await User.findOne({ email });
    if (user) {
      return res.redirect("/auth/register?error=User already exists");
    }

    // Create new user
    user = new User({ name, email, password });
    await user.save();

    // Set user in session
    req.session.user = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    res.redirect("/dashboard");
  } catch (err) {
    console.error(err);
    res.redirect("/auth/register?error=Server error");
  }
});

module.exports = router;
