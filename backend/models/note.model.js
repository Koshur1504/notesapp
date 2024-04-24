const { default: mongoose } = require("mongoose");

const noteSchema = new mongoose.Schema(
  {
    title: { type: String, require: true },
    body: { type: String },
    userID: { type: String, require: true },
    username: { type: String, require: true },
  },
  {
    versionKey: false,
  },
);

const NoteModel = mongoose.model("notes", noteSchema);

module.exports = { NoteModel };
