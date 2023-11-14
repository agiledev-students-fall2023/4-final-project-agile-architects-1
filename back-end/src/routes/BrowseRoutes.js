import express from 'express';

const router = express.Router();

const example_egg_post = {
    id: 12345,
    image: '/static/images/example_egg.jpg',
    title: "Eggs - Expires 11/30",
    author: "user1",
    usrImg: "/static/images/example_usrimg.png",
}
const example_milk_post = {
    id: 312,
    image: '/static/images/example_milk.png',
    title: "Horizon 2% Milk",
    author: "user2",
    usrImg: "/static/images/grey.png",
}
const example_lettuce_post = {
    id: 1222,
    image: '/static/images/example_lettuce.png',
    title: "Fresh Lettuce",
    author: "user3",
    usrImg: "/static/images/example_usrimg.png",
}
const example_pork_belly_post = {
    id: 1023,
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


const getPostById = (id) => {
    return datalist.find(post => post.id == id);
}

router.get('/', (req, res) => {
  res.json(datalist);
});

router.get('/:id', (req, res) => {
    const id = req.params.id;
    const post = getPostById(id);
    if (!post) {
        res.status(404).send('Post not found.');
    } else {
        res.json(post);
    }
});

export default router;
