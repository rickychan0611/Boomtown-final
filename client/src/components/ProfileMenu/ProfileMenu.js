import React, {useState, useContext} from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';
import { useHistory } from 'react-router-dom'
import { LOGOUT_MUTATION } from '../../apollo/queries';
import { useMutation, useQuery } from '@apollo/react-hooks';
import ViewerProvider, { ViewerContext } from '../../context/ViewerProvider'


export default function ProfileMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const {viewer} = useContext(ViewerContext)

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleLogout = () => {
    // clearViewer()
    history.push('/')
    setAnchorEl(null)
  };

  const history = useHistory()
  const profileButtonHandler = (userId) => {
    history.push('/profile:' + userId)
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
        <MenuItem onClick={()=>{profileButtonHandler(viewer.user.id)}}>
          Your Profile
        </MenuItem>
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