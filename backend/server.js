const express = require('express');
const path = require('path');
const cors = require('cors');
const mongodb = require('./db/connect');

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, '../frontend')));

app.use(require('./routes'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

mongodb.initDb((err) => {
  if (err) {
    console.log('Failed to connect to MongoDB:', err);
  } else {
    app.listen(port, () => {
      console.log(`MongoDB connected, server running on http://localhost:${port}`);
    });
  }
}) 