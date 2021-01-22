import './App.css';
import Posts from './Posts/Posts';
import React,{useEffect, useState} from 'react';
import { db,auth } from './firebase';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import {Avatar, Button,Input} from '@material-ui/core';
import ImageUpload from './ImageUpload';
import Toogle from './Toogle';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}


const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function App() {

  const [posts,setposts] = useState([]);
  const [open,setopen] = useState(false);
  const [opensignin,setopensignin] = useState(false);
  const [openupload,setopenupload] = useState(false);
  const [modalStyle] = React.useState(getModalStyle);
  const classes = useStyles();
  const [email,setemail] = useState('');
  const [username,setusername] = useState('');
  const [password,setpassword] = useState('');
  const [user,setuser] = useState(null);

  useEffect(()=>{
    db.collection('posts').orderBy('timestamp','desc').onSnapshot(snapshot=>{
      setposts(snapshot.docs.map(doc=>({id:doc.id,post:doc.data()})))})
    },[]);

  useEffect(()=>{
    const unsubscribe = auth.onAuthStateChanged((authuser)=>{
      if(authuser)
      {
        // user logg-in
        console.log(authuser);
        setuser(authuser);
        
      }
      else
      {
        // user logged-out
        setuser(null);
      }
    })
    return () => {unsubscribe();}
  },[user,username]); 

    const signup =event =>{
      event.preventDefault();

      auth.createUserWithEmailAndPassword(email,password)
      .then((authuser)=>{
        return authuser.user.updateProfile({
          displayName:username
        });
      })
      .catch((error) =>alert(error.message));

      setopen(false);
    }

    const signIn = event =>{
      event.preventDefault();
      auth.signInWithEmailAndPassword(email,password)
      .catch((error)=>alert(error.message))
      setopensignin(false);
    }

    

  return (

    <div className="App">
      
      
     <div className="App__navbar">
       <div className="logo-insta">
       <img className="navbar__img" src="https://logo-logos.com/wp-content/uploads/2016/10/Instagram_logo_wordmark_logotype.png"/>
     
       </div>
    
     
     {user ?(
       <div className="app__logoutcontainer">
         
         <Button variant="contained" color="primary" style={{marginLeft:"200px"}} type="button" onClick={()=>auth.signOut()} >
            Logout
          </Button>
          <Avatar className="posts__Avatar">{user.displayName.slice(0,1)}</Avatar>
         <Toogle username={user.displayName} />
         </div>
        
      ):
      (
        <div className="app__logincontainer">
          <div className="app__logincontainer_signin">
          <Button variant="contained" color="primary" style={{marginLeft:"200px"}} type="button" onClick={()=>setopensignin(true)} >
          Sign In
         </Button>
        </div>
        <div className="app__logincontainer_signup">
        <Button variant="contained" color="primary" style={{marginLeft:"200px"}} type="button" onClick={()=>setopen(true)} >
        Sign Up
        </Button>
        </div>
       
        </div>
        
      )}
     
     
      </div>
     
    
      {/* Modal - start for signUp */}
      <Modal
        open={open}
        onClose={()=>{setopen(false)}}
        
      >
        {
            <div style={modalStyle} className={classes.paper}>
              <form className="App__signup">
                <center>
                    <img className="navbar__img"
                    src="https://logo-logos.com/wp-content/uploads/2016/10/Instagram_logo_wordmark_logotype.png"/>
                </center>
                    <Input
                    type="email"
                    placeholder="email"
                    onChange={(e)=>setemail(e.target.value)}
                    />
                    <Input
                    type="text"
                    placeholder="username"
                    onChange={(e)=>setusername(e.target.value)}
                    />
                    <Input
                    type="password"
                    placeholder="password"
                    onChange={(e)=>setpassword(e.target.value)}
                    />
                    <Button type="submit" onClick={signup} >Submit</Button>
                
              </form>
            </div>
        }
      </Modal>
      
{/* Modal - start for signIn */}
      <Modal
        open={opensignin}
        onClose={()=>{setopensignin(false)}}
        
      >
        {
            <div style={modalStyle} className={classes.paper}>
              <form className="App__signup">
                <center>
                    <img className="navbar__img"
                    src="https://logo-logos.com/wp-content/uploads/2016/10/Instagram_logo_wordmark_logotype.png"/>
                </center>
                    <Input
                    type="email"
                    placeholder="email"
                    onChange={(e)=>setemail(e.target.value)}
                    />
                    <Input
                    type="password"
                    placeholder="password"
                    onChange={(e)=>setpassword(e.target.value)}
                    />
                    <Button type="submit" onClick={signIn} >Submit</Button>
                
              </form>
            </div>
        }
      </Modal>
      {/* Modal - start for Uploading */}

      <Modal
        open={openupload}
        onClose={()=>{setopenupload(false)}}
        
      >
        {
            <div style={modalStyle} className={classes.paper}>
               {/* upload section */}
       { ( user?.displayName?(
        <ImageUpload username={user.displayName}/>
        
      ):
      (
        <center><h3>Sorry ,Logged In first</h3></center>
      )
        
      )}
            </div>
        }
      </Modal>

      {/* Modal - end */}
     
      <div className="App__posts">

        {posts.map(({id,post}) => {
          return <Posts key={id} postid={id} user={user} usernames={post.username} img_link={post.img_link} captains={post.captains} />
           })}
        
        
      </div>
      <div className="uploadsection">
        <center>
        <Button variant="contained" color="secondary" onClick={()=>setopenupload(true)}>
          Upload Your Post
        </Button>
         
        </center>

      
        
       
        
      
 
           
      </div>     
     
    </div>
  );
}

export default App;
