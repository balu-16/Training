const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const Book = require('./models/Book');

const app = express();
const PORT = process.env.PORT || 3000;

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/bookstore';

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

let isConnected = false;
let useInMemory = false;
let inMemoryBooks = [];
let nextId = 1;

mongoose.connect(MONGO_URI, { serverSelectionTimeoutMS: 3000 })
  .then(() => {
    isConnected = true;
    console.log('MongoDB Connected');
  })
  .catch(err => {
    console.log('MongoDB not available, using in-memory storage');
    useInMemory = true;
    isConnected = false;
    mongoose.disconnect();
  });

mongoose.connection.on('connected', () => { isConnected = true; useInMemory = false; });
mongoose.connection.on('disconnected', () => { if (!useInMemory) isConnected = false; });

app.get('/api/status', (req, res) => {
  res.json({
    status: 'running',
    mongodb: useInMemory ? 'in-memory' : (isConnected ? 'connected' : 'disconnected'),
    timestamp: new Date().toISOString()
  });
});

app.get('/api/books', async (req, res) => {
  try {
    if (useInMemory) {
      return res.json(inMemoryBooks);
    }
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/books/:id', async (req, res) => {
  try {
    if (useInMemory) {
      const book = inMemoryBooks.find(b => b._id === req.params.id);
      if (!book) return res.status(404).json({ error: 'Book not found' });
      return res.json(book);
    }
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ error: 'Book not found' });
    res.json(book);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/books', async (req, res) => {
  try {
    if (useInMemory) {
      const book = { _id: String(nextId++), ...req.body, createdAt: new Date().toISOString() };
      inMemoryBooks.push(book);
      return res.status(201).json(book);
    }
    const book = new Book(req.body);
    const savedBook = await book.save();
    res.status(201).json(savedBook);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.put('/api/books/:id', async (req, res) => {
  try {
    if (useInMemory) {
      const index = inMemoryBooks.findIndex(b => b._id === req.params.id);
      if (index === -1) return res.status(404).json({ error: 'Book not found' });
      inMemoryBooks[index] = { ...inMemoryBooks[index], ...req.body };
      return res.json(inMemoryBooks[index]);
    }
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!book) return res.status(404).json({ error: 'Book not found' });
    res.json(book);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.delete('/api/books/:id', async (req, res) => {
  try {
    if (useInMemory) {
      const index = inMemoryBooks.findIndex(b => b._id === req.params.id);
      if (index === -1) return res.status(404).json({ error: 'Book not found' });
      inMemoryBooks.splice(index, 1);
      return res.json({ message: 'Book deleted successfully' });
    }
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) return res.status(404).json({ error: 'Book not found' });
    res.json({ message: 'Book deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
