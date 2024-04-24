const { auth } = require("../middlewares/auth.middleware");
const { NoteModel } = require("../models/note.model");

const noteRouter = require("express").Router();

noteRouter.post("/", auth, async (req, res) => {
  try {
    const note = new NoteModel(req.body);
    await note.save();
    res.status(200).send({ msg: "Note has been added" });
  } catch (error) {
    res.status(400).send(error);
  }
});

noteRouter.get("/", auth, async (req, res) => {
  try {
    const notes = await NoteModel.find({ userID: req.body.userID });
    res.status(200).send({ msg: "success", notes });
  } catch (error) {
    res.status(400).send(error);
  }
});
noteRouter.patch("/:noteID", auth, async (req, res) => {
  const { noteID } = req.params;
  try {
    const note = await NoteModel.findById(noteID);
    if (note.userID === req.body.userID) {
      await NoteModel.findByIdAndUpdate(note.userID, req.body);
      return res
        .status(200)
        .send({ msg: `Note with id ${noteID} has been updated` });
    }
    return res.status(200).send({ msg: `Not your note` });
  } catch (error) {
    res.status(400).send(error);
  }
});

noteRouter.delete("/:noteID", auth, async (req, res) => {
  const { noteID } = req.params;
  try {
    const note = await NoteModel.findById(noteID);
    if (note.userID === req.body.userID) {
      await NoteModel.findByIdAndDelete(note.userID);
      return res
        .status(200)
        .send({ msg: `Note with id ${noteID} has been Deleted` });
    }
    return res.status(200).send({ msg: `Not your note` });
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = { noteRouter };
