import express from "express";
import User from "../models/user.js";

const router = express.Router();

router.get("/", async (request, response) => {
  const user = await User.find({});
  response.send(user);
});

router.post("/", async (request, response) => {
  const user = new User({
    name: request.body.name,
    passwordHash: request.body.password,
  });

  try {
    await user.save();
    response.status(201).send(user);
    console.log("user saved successfully");
  } catch (error) {
    console.log(error);
    response.status(401).send({ error: "Bad request" });
  }
});

export default router;
