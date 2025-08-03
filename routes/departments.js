const express = require('express');
const router = express.Router();
const Department = require('../models/departments');

router.post('/', async (req, res) => {
  try {
    const department = new Department(req.body);
    
    const saved = await department.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  const departments = await Department.find();
  res.json(departments);
});

router.get('/:id', async (req, res) => {
  const department = await Department.findById(req.params.id);
  if (!department) return res.status(404).json({ message: 'Not found' });
  res.json(department);
});

router.put('/:id', async (req, res) => {
  try {
    const updated = await Department.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  await Department.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted successfully' });
});

module.exports = router;
