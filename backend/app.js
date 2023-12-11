import express from "express";
import cors from "cors";
import router from "./controllers/users.js";
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/users", router);

app.get("/", (request, response) => {
  response.send("");
});

app.listen(3001, () => console.log("listening on port 3001"));
