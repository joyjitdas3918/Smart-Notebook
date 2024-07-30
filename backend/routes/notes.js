const express = require("express");
const fetchuser = require("../middleware/fetchuser");
const Notes = require("../models/Notes");
const router = express.Router();
const { body, validationResult } = require("express-validator");

//ROUTE 1
//get all notes using get "/api/notes/fetchallnotes". login required
router.post("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    //console.error(error.message);
    res.status(500).send(error.message);
  }
});

//ROUTE 2
//add notes using post "/api/notes/addnotes". login required
router.post(
  "/addnotes",
  fetchuser,
  [
    body("title", "Enter a longer title").isLength({ min: 3 }),
    body("description", "Enter a longer description").isLength({ min: 5 }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).send({ errors: result.array() });
      }
      const note = new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savedNote = await note.save();
      res.json(savedNote);
    } catch (error) {
      //console.error(error.message);
      res.status(500).send("internal server error");
    }
  }
);

//ROUTE 3
//updating notes using put "/api/notes/updatenotes". login required
router.put(
  "/updatenotes/:id",
  fetchuser,
  /*[
    body("title", "Enter a longer title").isLength({ min: 3 }),
    body("description", "Enter a longer description").isLength({ min: 5 }),
  ],*/
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).send({ errors: result.array() });
      }
      /*const note = new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      });
      if(title) note.title=title;
      if(description) note.description=description;
      if(tag) note.tag=tag;*/

      //find node to be updated and update it
      let findnote = await Notes.findById(req.params.id);
      if (!findnote) return res.status(404).send("not found");
      if (findnote.user.toString() != req.user.id)
        return res.status(401).send("not allowed");
      findnote = await Notes.findByIdAndUpdate(
        req.params.id,
        {
          title,
          description,
          tag,
        },
        { new: true }
      );
      res.json(findnote);
    } catch (error) {
      //console.error(error.message);
      res.status(500).send("internal server error");
    }
  }
);

//ROUTE 4
//updating notes using delete "/api/notes/deletenotes". login required
router.delete(
  "/deletenotes/:id",
  fetchuser,
  /*[
    body("title", "Enter a longer title").isLength({ min: 3 }),
    body("description", "Enter a longer description").isLength({ min: 5 }),
  ],*/
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).send({ errors: result.array() });
      }
      /*const note = new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      });
      if(title) note.title=title;
      if(description) note.description=description;
      if(tag) note.tag=tag;*/

      //find node to be deleted and delete it
      let findnote = await Notes.findById(req.params.id);
      if (!findnote) return res.status(404).send("not found");
      if (findnote.user.toString() != req.user.id)
        return res.status(401).send("not allowed");
      findnote = await Notes.findByIdAndDelete(
        req.params.id,
        {
          title,
          description,
          tag,
        },
        { new: true }
      );
      res.json({ success: "note deleted", note: findnote });
    } catch (error) {
      //console.error(error.message);
      res.status(500).send("internal server error");
    }
  }
);

module.exports = router;