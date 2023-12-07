import express from 'express';
import {MongoClient} from 'mongodb';


const uri = 'your_mongodb_connection_string'; // Replace with your actual MongoDB connection string
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const router = express.Router();

// Connect to the MongoDB database
async function connectToDatabase() {
  try {
    await client.connect();
    console.log('Connected to the database');
  } catch (err) {
    console.error('Error connecting to the database', err);
  }
}

connectToDatabase();

// Define routes
router.get('/', async (req, res) => {
  try {
    const database = client.db('WasteWise'); // Replace with your actual database name
    const collection = database.collection('Fridge'); // Replace with your actual collection name

    const items = await collection.find({}).toArray();
    res.json(items);
  } catch (error) {
    console.error('Error fetching items from the database', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/', async (req, res) => {
  try {
    const database = client.db('WasteWise'); // Replace with your actual database name
    const collection = database.collection('Fridge'); // Replace with your actual collection name

    const newItem = req.body; 
    await collection.insertOne(newItem);

    res.status(201).json({ message: 'Item added successfully' });
  } catch (error) {
    console.error('Error adding item to the database', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// const example_apple_item = {
//   name: 'Apples',
//   quantity: 3,
//   purchasedDate: '2023-11-05',
//   expiration: '2023-11-21'
// };
// const example_egg_item = {
//   name: 'Eggs',
//   quantity: 14,
//   purchasedDate: '2023-11-01',
//   expiration: '2023-11-30'
// };
// const example_milk_item = {
//   name: 'Horizon 2% Milk',
//   quantity: 1,
//   purchasedDate: '2023-11-09',
//   expiration: '2023-11-19'
// };
// const example_port_belly_item = {
//   name: 'Pork Belly',
//   quantity: 1,
//   purchasedDate: '2023-11-09',
//   expiration: '2023-11-16'
// }
// const example_beef_item = {
//   name: 'Beef',
//   quantity: 2,
//   purchasedDate: '2023-11-09',
//   expiration: '2023-11-16'
// };
// const example_cheese_item = {
//   name: 'Cheese',
//   quantity: 2,
//   purchasedDate: '2023-11-13',
//   expiration: '2023-12-28'
// };
// const example_lettuce_item = {
//   name: 'Fresh Lettuce',
//   quantity: 1,
//   purchasedDate: '2023-11-01',
//   expiration: '2023-11-11'
// };

// const itemlist  = [example_apple_item, example_beef_item, example_cheese_item, example_egg_item, example_lettuce_item, example_milk_item, example_port_belly_item];

// const router = express.Router(itemlist);

// router.get('/', (req, res) => {
//   res.json(itemlist);
// });

export default router;
