import React, { useState, useEffect }from 'react';
import { Link, useNavigate} from 'react-router-dom';
import './PostBlock.css';

const PostBlock = ({ post }) => {
    const navigate = useNavigate();

    const [userImg, setUserImg] = useState('./../../public/grey.png');
    const [postImg, setPostImg] = useState('./../../public/grey.png');

    useEffect(() => {
        console.log("Rendering postblock: ",post);
        // if (post.usrImg) {
        //     setUserImg('http://localhost:3001'+post.usrImg);
        // }
        // if (post.image) {
        //     setPostImg('http://localhost:3001'+post.image);
        // }
    }, []);

    return (
        <div onClick={() => navigate(`/browse/details/${post.id}`, {state: { post }})} className='post-block'>
            <div className='post-image-container'>
                <img src={'http://localhost:3001'+post.image} alt={post.title} className="post-image" />
            </div>
            <div className="post-info">
                <div className='post-title-box'>
                    {post.title}
                </div>
                <div className='post-author'>
                    <img src={'http://localhost:3001'+post.usrImg} alt="Post" className="post-author-img" />

                    <div className='post-author-name'>
                        {post.author}
                    </div>
                </div>
            </div>
        </div>
    );
};


export default PostBlock;
