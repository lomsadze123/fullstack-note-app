import mongoose from "mongoose";
const { set, connect, Schema, model } = mongoose;

const password = process.argv[2];
const url = `mongodb+srv://bekalomsadze1:${password}@cluster0.vdm2jaj.mongodb.net/notes?retryWrites=true&w=majority`;

set("strict", true);
connect(url)
  .then((result) => console.log("connection successful"))
  .catch((error) => console.log("connection failed: " + error));

const newSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: new Date(),
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

newSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Note = model("Note", newSchema);

// Note.deleteMany({}).then(() => console.log("deleted"));

export default Note;
