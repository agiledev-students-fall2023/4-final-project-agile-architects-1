import express from 'express';


const example_apple_item = {
  name: 'Apples',
  quantity: 3,
  purchasedDate: '2023-11-05',
  expiration: '2023-11-21'
};
const example_egg_item = {
  name: 'Eggs',
  quantity: 14,
  purchasedDate: '2023-11-01',
  expiration: '2023-11-30'
};
const example_milk_item = {
  name: 'Horizon 2% Milk',
  quantity: 1,
  purchasedDate: '2023-11-09',
  expiration: '2023-11-19'
};
const example_port_belly_item = {
  name: 'Pork Belly',
  quantity: 1,
  purchasedDate: '2023-11-09',
  expiration: '2023-11-16'
}
const example_beef_item = {
  name: 'Beef',
  quantity: 2,
  purchasedDate: '2023-11-09',
  expiration: '2023-11-16'
};
const example_cheese_item = {
  name: 'Cheese',
  quantity: 2,
  purchasedDate: '2023-11-13',
  expiration: '2023-12-28'
};
const example_lettuce_item = {
  name: 'Fresh Lettuce',
  quantity: 1,
  purchasedDate: '2023-11-01',
  expiration: '2023-11-11'
};

const itemlist  = [example_apple_item, example_beef_item, example_cheese_item, example_egg_item, example_lettuce_item, example_milk_item, example_port_belly_item];

const router = express.Router(itemlist);

router.get('/', (req, res) => {
  res.json({ message: 'fridge' });
});

export default router;
