import express from 'express';

const router = express.Router();

const example_egg_post = {
    image: '/static/images/example_egg.jpg',
    title: "Eggs - Expires 11/30",
    author: "user1",
    usrImg: "/static/images/example_usrimg.png",
}
const example_milk_post = {
    image: '/static/images/example_milk.png',
    title: "Horizon 2% Milk",
    author: "user2",
    usrImg: "/static/images/grey.png",
}
const example_lettuce_post = {
    image: '/static/images/example_lettuce.png',
    title: "Fresh Lettuce",
    author: "user3",
    usrImg: "/static/images/example_usrimg.png",
}
const example_pork_belly_post = {
    image: '/static/images/example_pork_belly.jpg',
    title: "Pork Belly",
    author: "user4",
    usrImg: "/static/images/example_usrimg.png",
}

const datalist  =[
    example_egg_post,
    example_milk_post,
    example_lettuce_post,
    example_pork_belly_post,
  ];

router.get('/', (req, res) => {
  res.json(datalist);
});

export default router;
