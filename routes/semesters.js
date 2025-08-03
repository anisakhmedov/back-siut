const express = require('express');
const router = express.Router();
const Semester = require('../models/semesters');

router.post('/', async (req, res) => {
  try {
    const semester = new Semester(req.body);
    const saved = await semester.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  const semesters = await Semester.find();
  res.json(semesters);
});

router.get('/:id', async (req, res) => {
  const semester = await Semester.findById(req.params.id);
  if (!semester) return res.status(404).json({ message: 'Not found' });
  res.json(semester);
});

router.put('/:id', async (req, res) => {
  try {
    const updated = await Semester.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  await Semester.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted successfully' });
});

module.exports = router;
