import express from "express";
import User from "../models/user.js";
import bcrypt from "bcrypt";

const router = express.Router();

router.get("/", async (request, response) => {
  try {
    const users = await User.find({}).populate("notes", { title: 1, date: 1 });
    response.send(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    response.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/:id", async (request, response) => {
  try {
    const user = await User.findByIdAndDelete(request.params.id);
    if (!user) {
      return response.status(404).json({ error: "User not found" });
    }
    response.send(user);
    console.log("User deleted successfully");
  } catch (error) {
    console.error("Error deleting user:", error);
    response.status(500).json({ error: "Internal server error" });
  }
});

router.post("/", async (request, response) => {
  try {
    const saltRounds = 10;
    const password = await bcrypt.hash(request.body.password, saltRounds);

    const user = new User({
      name: request.body.name,
      password: password,
    });

    await user.save();
    response.status(201).send(user);
    console.log("user saved successfully");
  } catch (error) {
    console.log(error);
    response.status(401).send({ error: "Bad request" });
  }
});

export default router;
