import express from 'express';

const router = express.Router();

const recommendedList = [
  {
      id: 1,
      title: "Coffee",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
      //... other recipe details
  },
  {
      id: 2,
      title: "Milk",
      description: "Just drink",
      //... other recipe details
  },
];

router.get('/', (req, res) => {
    res.json(recommendedList);
    });

export default router;
