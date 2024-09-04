const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Item = require('./models/item');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.get('/', (req, res) => {
  res.status(200).send('Building a Powerful CRUD API with Node.js, Express.js, and Mongoose');
});

mongoose.connect('mongodb://localhost:27017/nodejs-crud', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Create a new item
app.post('/items', async (req, res) => {
  try {
    const newItem = new Item({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
    });
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to save item' });
  }
});

// Read all items
app.get('/items', async (req, res) => {
  try {
    const items = await Item.find({});
    res.status(200).json(items);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to get items' });
  }
});

// Read a single item by ID
app.get('/items/:id', async (req, res) => {
  try {
    const itemId = req.params.id;
    const item = await Item.findById(itemId);
    if (item) {
      res.status(200).json(item);
    } else {
      res.status(404).json({ message: 'Item not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to get item' });
  }
});

// Update an item by ID
app.put('/items/:id', async (req, res) => {
  try {
    const itemId = req.params.id;
    const update = {
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
    };

    const updatedItem = await Item.findByIdAndUpdate(itemId, update, { new: true });

    if (updatedItem) {
      res.status(200).json(updatedItem);
    } else {
      res.status(404).json({ message: 'Item not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update item' });
  }
});

// Delete an item by ID
app.delete('/items/:id', async (req, res) => {
  try {
    const itemId = req.params.id;
    const removedItem = await Item.findByIdAndRemove(itemId);

    if (removedItem) {
      res.status(200).json(removedItem);
    } else {
      res.status(404).json({ message: 'Item not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete item' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
