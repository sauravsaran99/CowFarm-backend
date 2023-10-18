const express = require('express');
const router = express.Router();
const authenticateJWT = require('../middleware/authMiddleware');
const Note = require('../models/Note');

// Create a new note for the authenticated user
router.post('/createnotes', authenticateJWT, async (req, res) => {
  const { title, content } = req.body;
  const id = req.header("_id");
  console.log('title', title, content)
  try {
    const newNote = new Note({ title, content, userId: id });
    await newNote.save();
    res.status(201).json(newNote);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all notes for the authenticated user
router.get('/allnotes', authenticateJWT, async (req, res) => {
    const id = req.header("_id");
    console.log('id', id);
  try {
    const notes = await Note.find({ userId: id });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Edit a note
router.put('/:noteId', authenticateJWT, async (req, res) => {
  const { title, content } = req.body;
  const noteId = req.params.noteId;
  const id = req.header("_id");
  console.log('hello', noteId, title)
  try {
    const updatedNote = await Note.findOneAndUpdate(
      { _id: noteId, userId: id },
      { title, content },
      { new: true } // Return the updated note
    );
    if (updatedNote) {
      res.json(updatedNote);
    } else {
      res.status(404).json({ error: 'Note not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete a note
router.delete('/:noteId', authenticateJWT, async (req, res) => {
  const noteId = req.params.noteId;
  const id = req.header("_id");
  console.log('noteid', noteId)
  try {
    const deletedNote = await Note.findOneAndDelete({ _id: noteId, userId: id });
    if (deletedNote) {
      res.json({ message: 'Note deleted successfully' });
    } else {
      res.status(404).json({ error: 'Note not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
