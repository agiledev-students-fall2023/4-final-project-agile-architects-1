import express from 'express';
import { getUser } from '../controllers/userController.js';

import Post from '../schemas/PostSchema.js';

const router = express.Router();

export const getPostListbyUser = async (userId) => {
    // let postlist = FakeDB.map((post) => {
    //     return {
    //         id: post.id,
    //         image: post.image,
    //         title: post.title,
    //         author: post.author,
    //         usrImg: post.usrImg,
    //     }
    // })
    // postlist = postlist.filter((post) => post.author === userId);
    const postlist = await Post.find({author: userId});
    return postlist;
}

// GET all posts
router.get('/posts', async (req, res) => {
    // console.log('body', JSON.stringify(req.query));
    const datalist = await getPostListbyUser(req.query.username);
    // console.log(datalist);
    res.json(datalist);
});

// Get user profile
router.get('/:id', getUser)

// Post a post
router.post('/', (req, res) => {
    res.json({mssg: 'POST a new post'})
})

// DELETE a post
router.delete('/:id', (req, res) => {
    res.json({mssg: 'Delete a post'})
})

// UPDATE a post
router.patch('/:id', (req, res) => {
    res.json({mssg: 'Update a post'})
})
export default router;
