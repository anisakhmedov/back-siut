const express = require('express');
const router = express.Router();
const Program = require('../models/programs');

router.post('/', async (req, res) => {
  try {
    const program = new Program(req.body);
    const saved = await program.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  const programs = await Program.find().populate('department_id');
  res.json(programs);
});

router.get('/:id', async (req, res) => {
  const program = await Program.findById(req.params.id).populate('department_id');
  if (!program) return res.status(404).json({ message: 'Not found' });
  res.json(program);
});

router.put('/:id', async (req, res) => {
  try {
    const updated = await Program.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  await Program.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted successfully' });
});

module.exports = router;
