import React from 'react';
import PostBlock from './PostBlock';

import './PostFlow.css';

const PostFlow = ({ posts }) => {
    return (
        <div className="post-flow-container">
            <div className="post-flow">
                {posts.map((post)=>
                    <PostBlock post={post} key={post.id}/>
                )}
            </div>
        </div>
    );
};

export default PostFlow;
