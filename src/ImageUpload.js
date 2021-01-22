import React,{useState} from 'react'
import {db,storage} from'./firebase';
import {Button} from '@material-ui/core';
import firebase from "firebase";
import './ImageUpload.css';
function ImageUpload({username}) {
    
    const [progress,setprogress]=useState(0);
    const [image,setimage]=useState(null);
    const [captain,setcaptain]=useState('');

    const handlechange =(e)=>{
        if(e.target.files[0])
        {
            setimage(e.target.files[0]);
        }
    };
    const handleupload =()=>
    {
        const uploadtask = storage.ref(`images/${image.name}`).put(image);

        uploadtask.on(
            "state_changed",
            (snapshot)=>{
                const progress = Math.round(
                    (snapshot.bytesTransferred/snapshot.totalBytes)*100
                );
                setprogress(progress);
            },
            (error)=>{
                console.log(error);
                alert(error.message);
            },
            ()=>{
                storage
                    .ref("images")
                    .child(image.name)
                    .getDownloadURL()
                    .then(url=>
                        {
                            db.collection('posts').add({
                                timestamp : firebase.firestore.FieldValue.serverTimestamp(),
                                captains: captain,
                                img_link : url,
                                username:username
                            });
                            setprogress(0);
                            setimage(null);
                            setimage("");
                    })
            }

        )
    };

    return (
        <div className="uploading">

             {/* // captains
            // file uploader
            // submit button */}
            
            <center>
            <img className="uploading__img" src="https://logo-logos.com/wp-content/uploads/2016/10/Instagram_logo_wordmark_logotype.png"/>
            </center>
            <progress  value={progress} max="100" />
            <input type="text" placeholder="Enter the Captain.." onChange={event=>setcaptain(event.target.value)} value={captain}/>
            <input type="file" onChange={handlechange} />
            <Button  onClick={handleupload}>
                Post
            </Button>
            
            
            
            
        </div>
    );
}

export default ImageUpload;
