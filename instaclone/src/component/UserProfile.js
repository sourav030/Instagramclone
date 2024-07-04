import React from 'react'
import "./Profile.css"
import { useEffect, useState } from 'react'
import PostDeatil from './PostDeatil'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

export default function UserProfile() {
    const { userid } = useParams();
    const [data, setData] = useState([])
    const [show, setShow] = useState(false);
    const [post, setPost] = useState([]);
    const [user, setUser] = useState("")
    const [isfollow, setFollow] = useState(false)
    const navigate = useNavigate();

    const followUser = (userId) => {
        fetch("http://localhost:5000/follow", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem('jwt')
            },
            body: JSON.stringify({
                followId: userId
            })

        })
            .then(response => {
                return response.json();
            })
            .then(data => console.log(data))
            .catch(err => console.log(err))
            window.location.reload();
    }

    const unfollowUser = (userId) => {
        fetch("http://localhost:5000/unfollow", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem('jwt')
            },
            body: JSON.stringify({
                followId: userId
            })

        })
            .then(res => res.json())
            .then(data => console.log(data))
            .catch(err => console.log(err))
            window.location.reload();
    }


    useEffect(() => {

        fetch(`http://localhost:5000/user/${userid}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem('jwt')
            }
        })
            .then(res => res.json())
            .then((result) => {

                setUser(result.user);
                setPost(result.post);
                if (result.user.followers.includes(localStorage.getItem("id"))) {
                    setFollow(true)
                }
                else {
                    setFollow(false)
                }
            })

    }, [])
    const piclink = "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1200px-Default_pfp.svg.png"
    return (
        <div className='profile'>
            <div className="profile-frame">

                <div className="profile-pic">
                    <img src={user.Photo ? user.Photo : piclink} alt="" />
                </div>

                <div className="profile-data">

                    <div >

                        <h1 >{user.name}</h1>
                        <button
                            className='followBtn'
                            style={{
                                position: "relative",
                                left: 10, width: 100,
                                cursor: 'pointer',
                                borderRadius: 8,
                                height: 30,
                                backgroundColor: user.isFollowing ? '#FF0000' : '#3897f0',
                                color: '#fff',
                            }}

                            onClick={() => {
                                if (isfollow) {
                                    unfollowUser(user._id)
                                    setFollow(false)
                                  

                                }
                                else {
                                    followUser(user._id)
                                    setFollow(true)
                                    
                                }
                            }}>
                            {
                                isfollow ? "unfollow" : "follow"
                            }
                        </button>

                    </div>

                    <div className="profile-info" style={{ display: 'flex' }}>
                        <p>{post.length} posts</p>
                        <p>{user.followers ? user.followers.length : 0} followers</p>
                        <p>{user.folllowing? user.folllowing.length: '0'} folllowing</p>
                    </div>
                    <hr style={{ width: "90%", margin: "25px auto" }} />

                    <div className="gallery">

                        {
                            post.map((posts) => {
                                return (

                                    <img src={posts.photo} alt="" className='item' onClick={() => {
                                        // toggleDetails(posts)
                                    }} />

                                )
                            })
                        }
                    </div>
                    {/* {
          show && post &&
          <PostDeatil items={post} toggleDetails={toggleDetails}/>
        } */}
                </div>

            </div>
        </div>
    )
}
