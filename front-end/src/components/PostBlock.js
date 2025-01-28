import React, { useRef, useEffect, useState}from 'react';
import { useNavigate} from 'react-router-dom';
import './PostBlock.css';
import { update } from 'lodash';

const PostBlock = ({ post }) => {
    const navigate = useNavigate();
    
    return (
        <div onClick={() => navigate(`/browse/details/${post.id}`, {state: { post }})} className='post-block'>
            <div className='post-block-image-container'>
                <img src={`${process.env.REACT_APP_BACKEND_HOST}${post.image}`} alt={post.title} className="post-block-image" />
            </div>
            <div className="post-info">
                <div className='post-title-box'>
                    <span>{post.title}</span>
                </div>
                <div className='post-author'>
                    <img
                        src={`${process.env.REACT_APP_BACKEND_HOST}${post.usrImg}`}
                        alt="Post"
                        className="post-author-img"
                        loading="lazy"
                    />

                    <div className='post-author-name'>
                        {post.author}
                    </div>
                </div>
            </div>
        </div>
    );
};


export default PostBlock;
