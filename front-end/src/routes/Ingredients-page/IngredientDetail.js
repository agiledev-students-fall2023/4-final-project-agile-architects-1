import React , { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation, Link} from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';
import { FaLocationDot } from 'react-icons/fa6';
import { BsClockHistory } from 'react-icons/bs';
import LoginButton from '../../components/LoginButton';
import LocationBar from '../../components/LocationBar';


import './IngredientDetail.css';
import isEmpty from './../../../../back-end/node_modules/validator/es/lib/isEmpty';

function IngredientDetail() {
    const { id } = useParams();

    const location = useLocation();
    const navigate = useNavigate();

    const defaultPost = {
        id: id,
        image: 'http://localhost:3001/static/images/grey.png',
        title: "Lorem ipsum",
        author: "Dalek",
        usrImg : "http://localhost:3001/static/images/grey.png",
        ingredientAmount: 42,
        location: "default location",
        expiration: "default time",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        hashtags: ["#Hashtag"]
    }

    let post = location.state ? location.state.post : defaultPost;
    console.log("Got from state:",post);

    const [myPost, setMyPost] = useState(post);
    const [comments, setComments] = useState([
        {
            user: "nyuStudent1",
            profilePic: "/static/images/example_usrimg.png",
            comment: "This looks awesome!", 
            time: "1 min ago"
        },
    ]);
    const [postNotFound, setPostNotFound] = useState(false); // New state for post not found
    const [username, setUsername] = useState("User"); // New state for post not found
    const [commentContent, setCommentContent] = useState(""); // New state for post not found

    const fetchPostDetails = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_HOST}/api/browse/details/${myPost.id}`);
            const data = await response.json();
            console.log("Got from fetch:",data);
            if (data.hasOwnProperty('id')) {
                setMyPost(data);
                if (data.comments) {
                    setComments(data.comments);
                }
                return true;
            } else {
                console.log("data is empty")
                return false;
            }
        } catch (error) {
            console.error(error);
            return false;
        }
    };

    const getFormattedDate = (d) => {
        let date = new Date(d);

        let year = date.getFullYear();
        let month = (1 + date.getMonth()).toString().padStart(2, '0');
        let day = date.getDate().toString().padStart(2, '0');
      
        return month + '/' + day + '/' + year;
    }

    useEffect(() => {
        fetchPostDetails()
        .then((emp)=>{
            console.log("Has Content:",emp);
            if (!emp) {
                // navigate('/browse');
                setPostNotFound(true);
            }
        });
        if (localStorage.getItem('username')) {
            setUsername(localStorage.getItem('username'));
        }
    }, []);

    const handleSubmit = async() => {
        console.log("Comment Content:",commentContent)
        if (!isEmpty(commentContent)) {
            try {
                const response = await fetch(`${process.env.REACT_APP_BACKEND_HOST}/api/browse/details/${myPost.id}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ username, commentContent })
                });
                const data = await response.json();
                if (data.hasOwnProperty('id')) {
                    setMyPost(data);
                    if (data.comments) {
                        setComments(data.comments);
                    }
                    return true;
                } else {
                    console.log("data is empty")
                    return false;
                }
            } catch (error) {
                console.error(error);
                return false;
            }
        }
    }

    if (postNotFound) {
        return (
            <section className='ingredient-detail-page'>
                <section className='ingredient-detail-top-bar'>
                    <button className="back-button" onClick={()=> navigate(-1)}>
                        <IoIosArrowBack/>
                    </button>
                </section>
                
                <section className='ingredient-detail'>
                    <h1>Post Not Found</h1>
                    <p>The post you are looking for does not exist.</p>
                    <button onClick={() => navigate('/browse')} className="back-to-browse-button">
                        Browse all the posts
                    </button>
                </section>
                
            </section>
        );
    }

    return (
        <section className='ingredient-detail-page'>
            <section className='ingredient-detail-top-bar'>
                <button className="back-button" onClick={()=> navigate(-1)}>
                    <IoIosArrowBack/>
                </button>
            </section>

            <section className='ingredient-detail'>
                <img className='ingredient-detail-img' src={`${process.env.REACT_APP_BACKEND_HOST}${myPost.image}`} alt={myPost.title}/>
                <section className='selling-info'>
                    <section className='info-without-description'>
                        <img className="profile-picture" alt="User Profile" src={`${process.env.REACT_APP_BACKEND_HOST}${myPost.usrImg}`}/>
                        <div className="ingredient-detail-info">
                            <div className="ingredient-detail-name-wrapper">
                                {myPost.title}
                            </div>
                            <div className="ingredient-detail-number-wrapper">
                                amount: {myPost.amount}
                            </div>
                            <div className="ingredient-detail-label">
                                Pick up at:
                            </div>
                            <div className='ingredient-detail-location'>
                                <LocationBar location={myPost.location} />
                            </div>
                            {/* <div className="expiration-info">
                                <div className='time-icon'>
                                    <BsClockHistory/>
                                </div>
                                <div className="expiration-wrapper">
                                    {getFormattedDate(myPost.expiration)}
                                </div>
                            </div> */}
                            <div className="pickuptime-info">
                                <div className='time-icon'>
                                    <BsClockHistory/>
                                </div>
                                <div className="pickuptime-wrapper">
                                    {myPost.pickUpTime}
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
                    <form className="comment-form" >
                        <input className="compose-comment" onChange={(e)=>setCommentContent(e.target.value)} type="comment" placeholder="comment" id="comment" name="comment"/>
                    </form>
                    <button className="send-button" onClick={handleSubmit}>
                        Send
                    </button>
                </div>
                <div className="user-comments">
                    {comments.map((comment, index) => (
                            <p >
                                <span className="comment-user"> {comment.user} </span>
                                <br/>
                                <span> {comment.comment} </span>
                            </p>
                    ))}
                </div>
            </section>
        </section>
    );

}
export default IngredientDetail;