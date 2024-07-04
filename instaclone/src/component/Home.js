import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import { Link } from 'react-router-dom';

export default function Home() {
  const [data, setData] = useState([]);
  const [comment, setComment] = useState("");
  const [show, setShow] = useState(false);
  const [items, setItems] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (!token) {
      navigate('/signup');
    } else {
      fetch("http://localhost:5000/allposts", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      })
        .then(res => {
          if (!res.ok) {
            throw new Error('Failed to fetch');
          }
          return res.json();
        })
        .then(resul => setData(resul))
        .catch(err => {
          console.error('Error fetching posts:', err);
          // Handle error appropriately, e.g., show user-friendly message
        });
    }
  }, []);

  const toggleComment = (post) => {
    setShow(!show);
    setItems(post);
  };

  const likePost = (id) => {
    fetch("http://localhost:5000/like", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem('jwt')}`
      },
      body: JSON.stringify({
        postId: id
      })
    })
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to like post');
        }
        return res.json();
      })
      .then((result) => {
        const updatedData = data.map(item => (item._id === result._id ? result : item));
        setData(updatedData);
      })
      .catch(err => {
        console.error('Error liking post:', err);
        // Handle error appropriately, e.g., show user-friendly message
      });
  };

  const unlikePost = (id) => {
    fetch("http://localhost:5000/unlike", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem('jwt')}`
      },
      body: JSON.stringify({
        postId: id
      })
    })
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to unlike post');
        }
        return res.json();
      })
      .then((result) => {
        const updatedData = data.map(item => (item._id === result._id ? result : item));
        setData(updatedData);
      })
      .catch(err => {
        console.error('Error unliking post:', err);
        // Handle error appropriately, e.g., show user-friendly message
      });
  };

  const makeComment = (text, id) => {
    fetch("http://localhost:5000/comment", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem('jwt')}`
      },
      body: JSON.stringify({
        postId: id,
        text: text
      })
    })
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to comment on post');
        }
        return res.json();
      })
      .then((result) => {
        const updatedData = data.map(item => (item._id === result._id ? result : item));
        setData(updatedData);
      })
      .then(result => {
        console.log('Post commented successfully:', result);
        
      })
      .catch(err => {
        console.error('Error commenting on post:', err);
        
      });
  };

  if (!Array.isArray(data)) {
    return null; // or handle loading state
  }

  return (
    <div className='home'>
      {data.map(item => (
        <div className="card" key={item._id}>
          <div className="card-header">
            <div className="card-pic">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfp8682Msz_IaNhUrZd1lZwBpwGpxxpcB9Jjm1Pv6-ajXVafC77A8cu_hy8tE9AlCEst4&usqp=CAU" alt="" />
            </div>
            <h5>
              <Link to={`/profile/${item.postedBy._id}`}>
                {item.postedBy.name}
              </Link>

            </h5>
          </div>

          <div className="card-image">
            <img src={item.photo} alt="" />
          </div>

          <div className="card-content">
            {
              item.likes.includes(localStorage.getItem('id')) ? (
                <span className="material-symbols-outlined material-symbols-outlined-red" onClick={() => unlikePost(item._id)}>
                  favorite_border
                </span>
              ) : (
                <span className="material-symbols-outlined" onClick={() => likePost(item._id)}>
                  favorite
                </span>
              )
            }
            <p>{item.likes.length} like(s)</p>
            <p>{item.body}</p>
            <p style={{ fontWeight: "bold", cursor: "pointer" }} onClick={() => toggleComment(item)}>View all comments</p>
          </div>

          <div className="add-comment">
            <span className="material-symbols-outlined">mood</span>
            <input
              type="text"
              placeholder="Add a comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <button className="comment" onClick={() => {

              makeComment(comment, item._id);
              setComment("");
            }}>
              Post
            </button>

          </div>
        </div>
      ))}

      {/* Show comments */}
      {show && items && (
        <div className='showComment'>
          <div className='container'>
            <div className="postPic">
              <img src={items.photo} alt="" />
            </div>

            <div className="details">

              <div className="card-header" style={{ borderBottom: "1px solid #00000029" }} id={items.id}>
                <div className="card-pic">
                  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfp8682Msz_IaNhUrZd1lZwBpwGpxxpcB9Jjm1Pv6-ajXVafC77A8cu_hy8tE9AlCEst4&usqp=CAU" alt="" />
                </div>
                <h5>{items.postedBy.name}</h5>
              </div>
              {/* commentsection */}
              <div className="comment-section" style={{ borderBottom: "1px solid #00000029" }}>
                {items.comments.map((comment) => (
                  <p key={comment._id} className="comm">
                    <span className="commenter" style={{ fontWeight: 'bold' }}>{comment.postedBy.name}</span>
                    <span className="commentText">{comment.comment}</span>
                  </p>
                ))}
              </div>

              {/* card content */}
              <div className="card-content">
                <p>{items.likes.length}</p>
                <p>{items.body}</p>
              </div>
              {/* addcomment */}
              <div className="add-comment he" style={{ borderBottom: "1px solid #00000029" }}>
                <span className="material-symbols-outlined">mood</span>
                <input
                  type="text"
                  placeholder="Add a comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
                <button className="comment" onClick={() => {
                  makeComment(comment, items._id);
                  setComment("");
                }}>Post</button>
              </div>
            </div>
          </div>
          <div className="close-comment" onClick={() => setShow(false)}>
            <span className="material-symbols-outlined material-symbols-outlined-comment">close</span>
          </div>
        </div>
      )}

    </div>
  );
}
