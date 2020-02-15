import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';
import { useHistory } from 'react-router-dom'
import { LOGOUT_MUTATION } from '../../apollo/queries';
import { useMutation, useQuery } from '@apollo/react-hooks';


export default function ProfileMenu() {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleLogout = () => {
    history.push('/')
    setAnchorEl(null)
  };

  const history = useHistory()
  const profileButtonHandler = () => {
    history.push('/profile')
    setAnchorEl(null)
  }

  const [logout] = useMutation(LOGOUT_MUTATION)


  return (
    <div>
      <IconButton aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        <MoreIcon/>
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={()=>{setAnchorEl(null)}}
      >
        <MenuItem onClick={profileButtonHandler}>Your Profile</MenuItem>
        <MenuItem onClick={()=>{
          logout()
          handleLogout()}}
          >
          Logout
          </MenuItem>
      </Menu>
    </div>
  );
}