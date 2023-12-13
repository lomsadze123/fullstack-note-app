import express from "express";
import User from "../models/user.js";
import bcrypt from "bcrypt";

const router = express.Router();

router.get("/", async (request, response) => {
  const user = await User.find({}).populate("notes", { title: 1, date: 1 });
  response.send(user);
});

router.delete("/:id", async (request, response) => {
  const user = await User.findByIdAndDelete(request.params.id);
  response.send(user);
  console.log("deleted successfully");
});

router.post("/", async (request, response) => {
  const saltRounds = 10;
  const password = await bcrypt.hash(request.body.password, saltRounds);

  const user = new User({
    name: request.body.name,
    password: password,
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
