import React from 'react';
import { Link, useNavigate} from 'react-router-dom';
import './PostBlock.css';

const PostBlock = ({ post }) => {
    const navigate = useNavigate();

    return (
        <div onClick={() => navigate(`/ingredientDetail/${post.id}`, {state: { post }})} className='post-block'>
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
