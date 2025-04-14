const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Alarm = require('../models/Alarm');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});

const upload = multer({ storage });

router.post('/set-alarm', async (req, res) => {
  const { time, snoozePattern, sound } = req.body;
  const newAlarm = new Alarm({ time, snoozePattern, sound });
  await newAlarm.save();
  res.status(200).json({ message: 'Alarm set and saved to DB' });
});

router.get('/get-alarm', async (req, res) => {
  const latest = await Alarm.findOne().sort({ createdAt: -1 });
  res.status(200).json(latest);
});

router.get('/history', async (req, res) => {
  const history = await Alarm.find().sort({ createdAt: -1 });
  res.status(200).json(history);
});

router.post('/upload-sound', upload.single('sound'), (req, res) => {
  res.status(200).json({ path: `/uploads/${req.file.filename}` });
});

module.exports = router;