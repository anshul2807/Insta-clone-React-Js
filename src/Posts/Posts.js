import react,{useState,useEffect} from 'react';
import'./Posts.css';
import Avatar from '@material-ui/core/Avatar';
import {db} from '../firebase';
import firebase from 'firebase';
import Toogle from'../Toogle';

const Posts = function({user,postid,usernames,img_link,captains})
{
    const [comments,setcomments]=useState([]);
    const [comment,setcomment]=useState('');
    useEffect(()=>{
        let unsubscribe;
        if(postid)
        {
            unsubscribe = db.collection('posts').doc(postid).collection('comments').orderBy("timestamp","desc").onSnapshot((snapshot)=>{
                setcomments(snapshot.docs.map(doc=>doc.data()))
            });
        
        }
        return ()=>{unsubscribe();};
    },[postid]);

    const submitcomment = event =>{
        event.preventDefault();
        db.collection("posts").doc(postid).collection("comments").add({
            text:comment,
            username:user.displayName,
            timestamp:firebase.firestore.FieldValue.serverTimestamp()
        })
        setcomment('');
    }
    
    return(
        <div className="posts">
            <div className="posts_username">
                <Avatar className="posts__Avatar">{usernames.slice(0,1)}</Avatar>
                <p className="posts__username"><strong>{usernames}</strong></p>
                {(user && user.displayName===usernames)?(<Toogle postid={postid} username="Delete"/>):(console.log('a'))}
            </div>
            <div className="posts__img">
                <img className="posts__img_img" src={img_link}/>
            </div>
            <div className="posts_caption">
            <p><strong>{usernames}</strong> {captains}</p>
            <h3 style={{color:"lightgray"}}>Comment Section</h3>
            <div className="postsComments">
                {comments.map(comment=>
                    (
                        <p><strong>{comment.username} : </strong>{comment.text}</p>
                    ))}
            </div>
            {user?(
            <form className="post__box">
            <input className="post__input" type="text" value={comment} onChange={(e)=>setcomment(e.target.value)} placeholder="Enter the comments" />
            <button className="post__button" disabled={!comment} type="submit" onClick={submitcomment}>Add comment</button>
            </form>
                
            ):(console.log(user))
            }
            
            </div>
            
            
        </div>
    );
}
export default Posts;