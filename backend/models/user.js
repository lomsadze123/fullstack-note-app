import mongoose from "mongoose";
const { set, connect, Schema, model } = mongoose;

const password = process.argv[2];
const url = `mongodb+srv://bekalomsadze1:${password}@cluster0.vdm2jaj.mongodb.net/notes?retryWrites=true&w=majority`;

set("strict", true);
connect(url)
  .then((result) => console.log("connection successful"))
  .catch((error) => console.log("connection failed: " + error));

const newSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
});

newSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const User = model("User", newSchema);

User.deleteMany({}).then(() => console.log("deleted"));

export default User;
