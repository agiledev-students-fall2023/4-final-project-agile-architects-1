import express from 'express';
import multer from 'multer';
import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { randomBytes } from 'crypto';

import Post from '../schemas/PostSchema.js';
import User from '../schemas/UserSchema.js';
import Counter from '../schemas/CounterSchema.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();
const upload = multer(); 

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

router.post('/details/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const post = await Post.findOne({id: id});
        if (post == null) {
            console.log("Post not found");
            res.json({});
        } else {
            post.comments.push({"user": req.body.username, "comment": req.body.commentContent});
            post.authorID = "656650e365f589b64282a5d8";
            post.pickUpTime = "empty";
            await post.save();
            res.json(post);
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

router.post('/newpost', upload.any(), async (req, res) => {
    const post = req.body;
    console.log('Text Fields:', post);
  
    // Assuming 'image0' is the key for your image data URL
    const imageDataUrl = post.image0;
    const base64Data = imageDataUrl.replace(/^data:image\/\w+;base64,/, '');
    const buffer = Buffer.from(base64Data, 'base64');

    // Define file path and name
    const randomString = randomBytes(4).toString('hex'); // Generate a random string
    const sanitizedName = post.name.replace(/[^a-zA-Z0-9]/g, '_'); // Sanitize the name to be file-system friendly
    const fileName = `${sanitizedName}-image0-${post.authorID}${randomString}.png`;
    
    const imagePath = path.join(__dirname, './../../public/images', fileName);

    // Write file to the file system
    await fs.writeFile(imagePath, buffer, (err) => {
        if (err) {
            console.error('Error saving image:', err);
            res.status(500).send('Error saving image');
            return;
        }

        console.log('Image saved successfully');
    });

    const user = await User.findById(post.authorID);
    if (!user) {
      return res.status(404).send('User not found');
    } else {
        try {
            const postID = await Post.find().count()+1;
            console.log(postID);

            const newPost = new Post({
                    title: post.name,
                    id: postID,
                    author: user.username,
                    authorID: post.authorID,
                    usrImg: user.usrImg,
                    amount: post.amount,
                    location: post.location,
                    pickUpTime: post.time,
                    expiration: new Date(post.expirationDate),
                    description: post.description,
                    hashtags: post.hashtags,
                    image: `/static/images/${fileName}` // Save path to the image
                });

            console.log(newPost);
            await newPost.save();
            console.log('Post saved successfully');
            res.status(200).send('Post saved successfully');

            // Counter.findOneAndUpdate({ postTitle: post.name}, { $inc: { seq: 1 } }, { new: true, upsert: true })
            // .then(async function (error, counter) {
            //     if (error) return (error);
            //     postID = counter.seq;
                
            //     const newPost = new Post({
            //         title: post.name,
            //         id: postID,
            //         author: user.username,
            //         authorID: post.authorID,
            //         usrImg: user.usrImg,
            //         amount: post.amount,
            //         location: post.location,
            //         pickUpTime: post.time,
            //         expiration: new Date(post.expiration),
            //         description: post.description,
            //         hashtags: post.hashtags,
            //         image: `/static/images/${fileName}` // Save path to the image
            //     });
    
            //     console.log(newPost);
            //     await newPost.save();
            //     console.log('Post saved successfully');
            //     res.status(200).send('Post saved successfully');
            // });

            
        } catch (error) {
            console.error('Error saving post:', error);
            res.status(500).send(`Error saving post: ${error.message}`);
        }
    }
});
export default router;
