import React from 'react';

import './PostBlock.css';

const PostBlock = ({ post }) => {
    return (
        <div className='post-block'>

            <div className='post-image-container'>
                <img src={post.image} alt={post.title} className="post-image" />
            </div>

            <div className="post-info">

                <div className='post-title-box'>
                    {post.title}
                </div>

                <div className='post-author'>
                    <img src={post.usrImg} alt="Post" className="post-author-img" />

                    <div className='post-author-name'>
                        {post.author}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default PostBlock;
