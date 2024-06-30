import React, { useRef, useEffect, useState}from 'react';
import { Link, useNavigate} from 'react-router-dom';
import './PostBlock.css';

const PostBlock = ({ post }) => {
    const navigate = useNavigate();
    const imgRef = useRef(null); // Create a ref for the image
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const image = imgRef.current;
    
        const updateContainerHeight = (img) => {
            const container = img.closest('.post-block-image-container');
            const height = (img.naturalHeight / img.naturalWidth) * container.offsetWidth;
            container.style.height = `${height}px`;
        };
    
        const handleLoad = () => {
            updateContainerHeight(image);
            setLoaded(true);
        };
    
        if (image) {
            window.addEventListener('resize', () => updateContainerHeight(image));
            if (image.complete) {
                handleLoad();
            } else {
                image.addEventListener('load', handleLoad);
            }
        }
    
        return () => {
            if (image) {
                image.removeEventListener('load', handleLoad);
            }
            window.removeEventListener('resize', () => updateContainerHeight(image));
        };
    }, [post.image]);


    return (
        <div onClick={() => navigate(`/browse/details/${post.id}`, {state: { post }})} className='post-block'>
            <div className='post-block-image-container'>
                <img ref={imgRef} src={`${process.env.REACT_APP_BACKEND_HOST}${post.image}`} alt={post.title} className="post-block-image" />
            </div>
            <div className="post-info">
                <div className='post-title-box'>
                    <span>{post.title}</span>
                </div>
                <div className='post-author'>
                    <img src={`${process.env.REACT_APP_BACKEND_HOST}${post.usrImg}`} alt="Post" className="post-author-img" />

                    <div className='post-author-name'>
                        {post.author}
                    </div>
                </div>
            </div>
        </div>
    );
};


export default PostBlock;
