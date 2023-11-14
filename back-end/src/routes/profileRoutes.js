import express from 'express';

const router = express.Router();

const example_egg_post = {
    id: 12345,
    image: '/static/images/example_egg.jpg',
    title: "Eggs - Expires 11/30",
    author: "user1",
    usrImg: "/static/images/example_usrimg.png",
    ingredientAmount: "3",
    location: "nyu bobst",
    expiration: "12/20/2023",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    hashtags: ["#Hashtag", "#neque", "#quisquam"]
}
const example_milk_post = {
    id: 312,
    image: '/static/images/example_milk.png',
    title: "Horizon 2% Milk",
    author: "user2",
    usrImg: "/static/images/grey.png",
    ingredientAmount: "1",
    location: "New Jersey",
    expiration: "11/30/2023",
    description: "This milk is very fresh and tasty. I bought it from the supermarket yesterday. I am selling it because I am going to travel to another country tomorrow.",
    hashtags: ["#Fresh", "#Milk"],
}
const example_lettuce_post = {
    id: 1222,
    image: '/static/images/example_lettuce.png',
    title: "Fresh Lettuce",
    author: "user1",
    usrImg: "/static/images/example_usrimg.png",
    location: "Stuy Town",
    expiration: "11/30/2023",
    description: "I bought this lettuce from the farmer's market yesterday. It's very fresh and delicious, and you can use it to make salad or sandwich. It's also very healthy. It's a great choice for you!",
    hashtags: ["#Hashtag", "#Fresh"],
}
const example_pork_belly_post = {
    id: 1023,
    image: '/static/images/example_pork_belly.jpg',
    title: "Pork Belly",
    author: "user4",
    usrImg: "/static/images/example_usrimg.png",
    location: "LIC",
    expiration: "11/30/2023",
    description: "This is a description.",
}

const FakeDB  =[
    example_egg_post,
    example_milk_post,
    example_lettuce_post,
    example_pork_belly_post,
];

export const getPostListbyUser = (userId) => {
    let postlist = FakeDB.map((post) => {
        return {
            id: post.id,
            image: post.image,
            title: post.title,
            author: post.author,
            usrImg: post.usrImg,
        }
    })
    postlist = postlist.filter((post) => post.author === userId);
    return postlist;
}

router.get('/', (req, res) => {
    const datalist = getPostListbyUser("user1");
    res.json(datalist);
});

export default router;
