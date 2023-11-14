import React , { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation, Link} from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';
import { FaLocationDot } from 'react-icons/fa6';
import { BsClockHistory } from 'react-icons/bs';
import LoginButton from '../../components/LoginButton';
import LocationBar from '../../components/LocationBar';


import './IngredientDetail.css';

function IngredientDetail() {
    const { id } = useParams();

    const location = useLocation();
    const navigate = useNavigate();

    let post = location.state ? location.state.post : null;

    const defaultPost = {
        id: id ? id: post.id,
        image: post ? post.image : '/static/images/grey.jpg',
        title: post ? post.title : "Plenty of Eggs",
        author: post ? post.author : "Dalek",
        usrImg : post ? post.usrImg : "/static/images/grey.png",
        ingredientAmount: "0",
        location: "default location",
        expiration: "default time",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        hashtags: ["#Hashtag"]
    }

    const [myPost, setMyPost] = useState(defaultPost);
    const [comment, setComment] = useState('');

    const [userImg, setUserImg] = useState('./profile_pic.png');
    const [postImg, setPostImg] = useState('./grey.png');

    const fetchPostDetails = async () => {
        try {
            const response = await fetch(`http://localhost:3001/browse/details/${myPost.id}`);
            const data = await response.json();
            setMyPost(data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchPostDetails();
        if (myPost.id === undefined) {
            const message = 'Post Not found.';
            navigate('/browse');
            return (
                <div>
                    <h1>{message}</h1>
                    <p>The post you are looking for does not exist.</p>
                    <Link to="/browse">Go back to browse page</Link>
                </div>
            );
        }
    }, []);


    useEffect(() => {
        setUserImg('http://localhost:3001'+myPost.usrImg);
        setPostImg('http://localhost:3001'+myPost.image);
    }, [myPost]);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(comment);
    }


    const comments = [
        {
            user: "nyuStudent1",
            profilePic: "/example_usrimg.png",
            comment: "This looks awesome!", 
            time: "1 min ago"
        },
    ]



    return (
        <section className='ingredient-detail-page'>
            <section className='ingredient-detail-top-bar'>
                <button className="back-button" onClick={()=> navigate(-1)}>
                    <IoIosArrowBack/>
                </button>
            </section>

            <section className='ingredient-detail'>
                <img className='ingredient-detail-img' src={postImg} alt={myPost.title}/>
                <section className='selling-info'>
                    <section className='info-without-description'>
                        <img className="profile-picture" alt="User Profile" src={userImg}/>
                        <div className="ingredient-detail-info">
                            <div className="ingredient-detail-name-wrapper">
                                {myPost.title}
                            </div>
                            <div className="ingredient-detail-number-wrapper">
                                amount: {myPost.ingredientAmount}
                            </div>
                            <div className='ingredient-detail-location'>
                                <LocationBar location={myPost.location} />
                            </div>
                            <div className="expiration-info">
                                <div className='time-icon'>
                                    <BsClockHistory/>
                                </div>
                                <div className="expiration-wrapper">
                                    {myPost.expiration}
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className='ingredient-details-description'>
                        <div className='ingredient-details-description-wrapper'>
                            {myPost.description}
                        </div>
                        <div className='ingredient-hashtags'>
                            {myPost.hashtags && myPost.hashtags.map((hashtag, index) => (
                                <div key={index} className='hashtag'>{hashtag}</div>
                            ))}
                        </div>
                    </section>

                </section>
            </section>

            <section className="ingredient-detail-comment-container">
                <div className="sending-comment">
                    <img className="detail-comment-user-img" alt="User Profile" src="/profile_pic.png"/>
                    <form className="comment-form" onSubmit={handleSubmit}>
                        <input className="compose-comment" value={comment} onChange={(e)=>setComment(e.target.value)} type="comment" placeholder="comment" id="comment" name="comment"/>
                    </form>
                    <button className="send-button">
                        Send
                    </button>
                </div>
                <div className="user-comments">
                    <div className="title-wrapper">Comments</div>
                </div>
            </section>
        </section>
    );

}
export default IngredientDetail;