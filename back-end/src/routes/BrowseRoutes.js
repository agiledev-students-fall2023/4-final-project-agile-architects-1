import express from 'express';
import Post from '../schemas/PostSchema.js';
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const posts = await Post.find();
        // console.log(posts);
        res.json(posts);
      } catch (error) {
        console.error('Error finding data:', error);
        res.json({});
      }
    // res.status(200).send(postlist);
});

router.get('/details/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const post = await Post.find({id: id});
        console.log(post);
        if (post.length < 1) {
            console.log("Post not found");
            res.json({});
        } else {
            res.json(post[0]);
        }
    } catch (error) {
        console.error('Error finding data:', error);
        res.json({});
    } 
});

router.get('/pages/:pageNum', (req, res) => {
    const pageNum = req.params.pageNum;
    const postlist = getPostList(pageNum);
    res.status(200).send(postlist);
});
export default router;
