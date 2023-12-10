import express from 'express';
import mongoose from 'mongoose';

const example_apple_item = {
  name: 'apples',
  quantity: 3,
  purchasedDate: '2023-11-15',
  expiration: '2023-11-30'
};
const example_egg_item = {
  name: 'Eggs',
  quantity: 14,
  purchasedDate: '2023-11-01',
  expiration: '2023-11-28'
};
const example_milk_item = {
  name: 'Horizon 2% Milk',
  quantity: 1,
  purchasedDate: '2023-12-05',
  expiration: '2023-12-12'
};
const example_pork_belly_item = {
  name: 'Pork Belly',
  quantity: 1,
  purchasedDate: '2023-12-07',
  expiration: '2023-12-13'
}
const example_beef_item = {
  name: 'Beef',
  quantity: 2,
  purchasedDate: '2023-12-07',
  expiration: '2023-12-10'
};


const itemlist  = [example_apple_item, example_beef_item, example_egg_item, example_milk_item, example_pork_belly_item];

const router = express.Router();

const fridgeItemSchema = new mongoose.Schema({
  name: String,
  quantity: Number,
  purchasedDate: String,
  expiration: String,
});

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
