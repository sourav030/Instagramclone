import react from 'react';
import "./PostDetail.css"
import { useNavigate } from 'react-router-dom';
export default function PostDeatil({ items, toggleDetails ,user}) {
    const navigate = useNavigate();
    const removPost=(postId)=>{
            fetch(`http://localhost:5000/deletePost/${postId}`,{
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('jwt')}`
                }
            }).then(res=>{
                console.log(res);
            })
            .catch(err=>{
                console.log(err);
            })
            toggleDetails();
            navigate("/")
    }
    console.log(items)
    return (
        <div className='showComment'>
            <div className='container'>
                <div className="postPic">
                    <img src={items.photo} alt="" />
                </div>

                <div className="details">

                    <div className="card-header" style={{ borderBottom: "1px solid #00000029" }} id={items.id}>
                        <div className="card-pic">
                            <img src={user.Photo} alt="" />
                        </div>
                        <h5>
                            {items.postedBy.name}
                        </h5>
                        <div className="deletePost">
                            <span className="material-symbols-outlined" onClick={()=>{removPost(items._id)}}>
                                delete
                            </span>
                        </div>
                    </div>
                    {/* commentsection */}
                    <div className="comment-section" style={{ borderBottom: "1px solid #00000029" }}>
                        {items.comments.map((comment) => (
                            <p key={comment._id} className="comm">
                                <span
                                    className="commenter"
                                    style={{ fontWeight: 'bold' }}
                                >{comment.postedBy.name}
                                </span>
                                <span
                                    className="commentText">
                                    {comment.comment}
                                </span>
                            </p>
                        ))}
                    </div>

                    {/* card content */}
                    <div className="card-content">

                        <p>
                            {items.likes.length}
                        </p>

                        <p>
                            {items.body}
                        </p>

                    </div>
                    {/* addcomment */}
                    <div className="add-comment he" style={{ borderBottom: "1px solid #00000029" }}>

                        <span className="material-symbols-outlined">mood</span>
                        <input
                            type="text"
                            placeholder="Add a comment"
                        // value={comment}
                        // onChange={(e) => setComment(e.target.value)}
                        />
                        <button className="comment"
                        // onClick={() => {
                        //     makeComment(comment, items._id);
                        //     setComment("");
                        // }}
                        >
                            Post
                        </button>
                    </div>
                </div>
            </div>
            <div className="close-comment"
                onClick={() => toggleDetails(false)}
            >
                <span className="material-symbols-outlined material-symbols-outlined-comment">close</span>
            </div>
        </div>
    )
}