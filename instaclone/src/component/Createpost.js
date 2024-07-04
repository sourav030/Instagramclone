// import React, { useState } from 'react';
import "./Createpost.css";
import { useState, useEffect } from "react"
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

export default function Createpost() {
  const [body, setBody] = useState("");
  const [image, setImage] = useState(null); // Changed initial state to null
  const [url, setUrl] = useState("")
  const nab=useNavigate()
  const notifyA = (msg) => {
    toast.error(msg)
  }
  const notifyB = (msg) => {
    toast.success(msg)
  }

  useEffect(() => {
    if (url) {
      fetch("http://localhost:5000/createPost", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + localStorage.getItem("jwt")
        },
        body: JSON.stringify({
          body: body,
          photo: url
        })
      }).then(res => res.json())
        .then(data => {if(data.error){
          notifyA(data.error)
        }else{
          notifyB("successfully Posted");
          nab("/")
        }})
        .catch(err => console.log(err))
    }
  }, [url])


  const postDetail = () => {
    console.log(body, image); // Ensure body and image are defined

    // Check if image is defined and not null
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
        // Here you can do further processing with the Cloudinary response
      })
      .catch(error => {
        console.log("Error uploading image:", error);
        // Handle errors here
      });
  };

  const loadFile = (event) => {
    const file = event.target.files[0];
    setImage(file); // Update image state with the selected file

    const output = document.getElementById('output');
    output.src = URL.createObjectURL(file);
    output.onload = () => {
      URL.revokeObjectURL(output.src);
    }; // free memory
  };

  return (
    <div className='createPost'>
      <div className="post-header">
        <h4 style={{ margin: "3px auto" }}>Create New Post</h4>
        <button id='post-btn' onClick={postDetail}>Share</button>
      </div>

      <div className="main-div">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Picture_icon_BLACK.svg/1200px-Picture_icon_BLACK.svg.png"
          alt=""
          id='output'
        />

        <input
          type="file"
          accept='image/*'
          onChange={loadFile} // Corrected event handler
        />
      </div>

      <div className="details">
        <div className="card-header">
          <div className="card-pic">
            <img src="" alt="" />
          </div>
          <h5>Dhoni</h5>
        </div>

        <textarea
          value={body}
          type="text"
          placeholder='Write a caption'
          onChange={(e) => { setBody(e.target.value); }}
        />
      </div>
    </div>
  );
}
