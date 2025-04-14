const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const alarmRoutes = require('./routes/alarmRoutes');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use('/api', alarmRoutes);

mongoose.connect('mongodb://localhost:27017/alarmDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));