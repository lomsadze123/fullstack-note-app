import express from "express";
import Note from "../models/note.js";
import User from "../models/user.js";
import jwt from "jsonwebtoken";
import errorHandler from "../utils/middleware.js";
const NoteRouter = express.Router();

const getTokenFrom = (request) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.startsWith("Bearer ")) {
    return authorization.substring(7);
  }
  return null;
};

NoteRouter.get("/", async (request, response) => {
  const note = await Note.find({});
  response.send(note);
});

NoteRouter.delete("/", async (request, response) => {
  const note = await Note.deleteMany({});
  response.send(note);
  console.log("note deleted successfully");
});

NoteRouter.get("/:id", (request, response) => {
  Note.findById(request.params.id)
    .then((item) => {
      response.send(item);
    })
    .catch((err) => {
      console.log(err);
      response.status(500).send("Internal Server Error");
    });
});

NoteRouter.post("/", async (request, response, next) => {
  try {
    const decodedToken = jwt.verify(getTokenFrom(request), "beka");
    if (!decodedToken.id) {
      return response.status(401).json({ error: "token invalid" });
    }
    const user = await User.findById(decodedToken.id);

    const note = new Note({
      title: request.body.title,
      date: new Date(),
      user: user.id,
    });

    const savedNote = await note.save();
    user.notes = user.notes.concat(savedNote.id);
    await user.save();
    response.status(201).send(savedNote);
    console.log("note saved successfully");
  } catch (error) {
    // console.log(error);
    next(error);
    response.status(401).send({ error: "Bad request" });
  }
});

NoteRouter.use(errorHandler);

export default NoteRouter;
