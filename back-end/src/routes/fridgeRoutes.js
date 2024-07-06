import express from 'express';
import mongoose from 'mongoose';

const router = express.Router();

const FridgeItem = mongoose.model('FridgeItem', fridgeItemSchema);

router.get('/', async (req, res) => {
  try {
    const itemsFromDB = await FridgeItem.find();
    res.json(itemsFromDB);
  } catch (error) {
    console.error('Error fetching items from MongoDB:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/', async (req, res) => {
  const newItemData = req.body;

  try {
    const newItem = new FridgeItem(newItemData);
    await newItem.save();

    res.status(201).json(newItem);
  } catch (error) {
    console.error('Error adding item to database:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// const router = express.Router(itemlist);

// router.get('/', (req, res) => {
//   res.json(itemlist);
// });

export default router;
