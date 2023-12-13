import express from "express";
import cors from "cors";
import router from "./controllers/users.js";
import NoteRouter from "./controllers/notes.js";
import loginRouter from "./controllers/login.js";
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/users", router);
app.use("/api/notes", NoteRouter);
app.use("/api/login", loginRouter);

app.listen(3001, () => console.log("listening on port 3001"));
