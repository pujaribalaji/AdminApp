// server.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

mongoose.connect(
  'mongodb+srv://pujaribalaji:balaji@cluster0.j7f9qun.mongodb.net/gulak',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
);

const UrlSchema = new mongoose.Schema({
  url: String,
});

const Url = mongoose.model('Url', UrlSchema);

app.get('/urls', async (req, res) => {
  try {
    const urls = await Url.find();
    res.json(urls);
  } catch (error) {
    res.status(500).json({error: 'Internal Server Error'});
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
