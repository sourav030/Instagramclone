import React from 'react'
import "./Profile.css"
import { useEffect,useState } from 'react'
import PostDeatil from './PostDeatil'
// import PostDetail from './PostDetail'
import ProfilePic from './ProfilePic'


export default function Profile() {
  const [data,setData]=useState([])
  const [show, setShow] = useState(false);
  const [post,setPost]=useState([]);
  const [pic,setChangePic]=useState(false)
  const [user,setUser]=useState("")

  const toggleDetails = (posts) => {
    setShow(!show);
    setPost(posts);
  };
  
  const changeProfile = ()=>{
    setChangePic(!pic)
  }
  useEffect(() =>{

    fetch(`http://localhost:5000/user/${localStorage.getItem("id")}`,{
      headers: {
        "Content-Type":"application/json",
        "Authorization":"Bearer "+localStorage.getItem('jwt')
      }
    })
     .then(res=>res.json())
     .then((result)=>{
       setData(result.post)
       setUser(result.user)
      
       
     })

  },[])
  
  const piclink="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1200px-Default_pfp.svg.png"

  
  if (!Array.isArray(data)) {
    return null; // or handle loading state
  }

  return (
    <div className='profile'>
      <div className="profile-frame">

        <div className="profile-pic"
        onClick={changeProfile}>
         <img src={user.Photo? user.Photo: piclink} alt="" />
        </div>

        <div className="profile-data" >
          <h1>{user.name}</h1>
          <div className="profile-info" style={{display:'flex'}}>
            <p>{data? data.length: "0"}posts</p>
            <p>{user.followers? user.followers.length: '0'} Follower</p>
            <p>{user.folllowing? user.folllowing.length: '0'} Following</p>
          </div>
<hr  style={{width:"90%", margin:"25px auto" }}/>
          <div className="gallery">
            
         {
           data.map((posts) => {
             return (
               
                 <img src={posts.photo} alt="" className='item' onClick={()=>{
                  toggleDetails(posts)
                 }}/>
               
             )
           })
         }
          </div>
        {
          show && post &&
          <PostDeatil items={post} toggleDetails={toggleDetails} user={user}/>
        }
        {
          pic &&
          <ProfilePic changeProfile={changeProfile} />
        }
        </div>

      </div>
    </div>
  )
}
