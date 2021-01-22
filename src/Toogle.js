import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {db} from "./firebase";



const ITEM_HEIGHT = 48;

export default function Toogle(props) {
    const options = [
        props.username
      ];
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
   
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  // const deleteposts = (event) =>
  // {
    
  //   db.collection("posts").doc(postid).delete().then(function() {
  //     console.log("Document successfully deleted!");
  // }).catch(function(error) {
  //     console.error("Error removing document: ", error);
  // });
  //   handleClose();
  // }
  return (
    <div>
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '20ch',
          },
        }}
      >
        {options.map((option) => (
          <MenuItem key={option} selected={option === 'Pyxis'} onClick={event=>{db.collection("posts").doc(props.postid).delete()}}>
            {option}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
