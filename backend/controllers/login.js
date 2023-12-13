import jwt from "jsonwebtoken";
import { compare } from "bcrypt";
import express from "express";
const loginRouter = express.Router();
import User from "../models/user.js";

loginRouter.post("/", async (request, response) => {
  const { name, password } = request.body;

  const user = await User.findOne({ name });
  const passwordCorrect =
    user === null ? false : await compare(password, user.password);

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: "invalid name or password",
    });
  }

  const userForToken = {
    name: user.name,
    id: user.id,
  };

  const token = jwt.sign(userForToken, "beka"); // beka is secret

  response.status(200).send({ token, name: user.name });
});

export default loginRouter;
