import jwt from "jsonwebtoken";
import User from "../models/User.models.js";

export const isLoggedIn = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    req.user = decoded;
    next();
  } catch (error) {
    res.status(500).json({
      sucess: false,
      message: "Error in decoding Token",
    });
  }
};

export const isVenueOwner = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(404).json({
        message: "No user Found",
      });
    }

    if (user.role !== "VENUE") {
      return res.status(404).json({
        message: "You are not authorized",
      });
    }

    console.log("hello");

    req.user = decoded;
    next();
  } catch (error) {
    res.status(500).json({
      sucess: false,
      message: "Error in decoding Token of venue ",
    });
  }
};

export const isAdmin = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(404).json({
        message: "No user Found",
      });
    }
    if (user.role !== "ADMIN") {
      return res.status(404).json({
        message: "You are not authorized",
      });
    }
    req.user = decoded;
    next();
  } catch (error) {
    res.status(500).json({
      sucess: false,
      message: "Error in decoding Token",
    });
  }
};
