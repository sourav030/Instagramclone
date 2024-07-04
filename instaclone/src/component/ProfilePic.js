import React, { useEffect } from 'react'
import "./Profile.css"
import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom';

export default function ProfilePic({changeProfile}) {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [image, setImage] = useState('');
  const [url, setUrl] = useState('');
  const HandleClick = () => {
    fileInputRef.current.click()
  }

  const postDetail = () => {
    if (!image) {
      console.error("No image file provided.");
      return;
    }
    // Create a FormData object and append the image file and upload preset
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "instaclone"); // Replace with your actual upload preset
    data.append("cloud_name", "dgnfppo2l"); // Replace with your actual cloud name

    // Fetch request to upload image to Cloudinary
    fetch("https://api.cloudinary.com/v1_1/dgnfppo2l/image/upload", {
      method: "POST",
      body: data
    })
      .then(res => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then(data => {
        console.log("Image uploaded successfully:", data);
        setUrl(data.url)
        
      })
      .catch(error => {
        console.log("Error uploading image:", error);
       
      });
  };

  useEffect(() => {
    if (image) {
      postDetail()
    }
  }, [image])

  const postPicture = () =>{
    fetch("http://localhost:5000/uploadProfilePic", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("jwt")
      },
      body: JSON.stringify({
        
        photo: url
      })
    }).then(res => res.json())
      .then(data => { 
        console.log(data)
        changeProfile();
        window.location.reload();
      })
      .catch(err => console.log(err))
  }

  useEffect(()=>{
    if(url)
      {
        postPicture()
        
      }
      
      
  },[url])
  
  return (
    <div className='profilePic  '>
      <div className="changePic">
        <div >
          <h4>Change Profile Photo</h4>
        </div>
        <div className='upload-btn' style={{ width: 400, borderTop: "1px solid black" }} >
          <button className='upload-btn' style={{ color: "blue" }} onClick={HandleClick}>Upload Profile Photo</button>
          <input type="file" accept='image/*' style={{ display: "none" }} ref={fileInputRef} onChange={(e) => { setImage(e.target.files[0]) }} />
        </div>
        <div className='upload-btn' style={{ width: 400, borderTop: "1px solid black" }}>
          <button className='upload-btn' style={{ color: "red" }}>
            Remove current Profile Photo
          </button>
        </div>
        <div className='upload-btn' style={{ width: 400, borderTop: "1px solid black" }}>
          <button style={{ border: "none", background: "none" }} onClick={changeProfile}>cancel</button>
        </div>
      </div>
    </div>
  )
}
