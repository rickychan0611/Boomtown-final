import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, useHistory } from 'react-router-dom'
import ProfileMenu from '../ProfileMenu/ProfileMenu.js'

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Fab from '@material-ui/core/Fab';
import Icon from '@material-ui/core/Icon';
import logo from '../../images/boomtown.svg'

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
      // backgroundColor: "#212121",
    },
    menuButton: {
    },
    title: {
      flexGrow: 1,
    },
    toolbar: theme.mixins.toolbar,
    logo: {
      marginRight: 'auto',
      width: 40
    },
  }));


const TopBar = () => {
    const classes = useStyles();
    const history = useHistory()
    const clickHandler = () => {
      console.log('share clicked')
      history.push('/share')
    }
    return (
      <div className={classes.root}>
        <AppBar position="fixed"
>
          <Toolbar>
            <img src={logo} alt="logo" className={classes.logo} />
            <Fab 

          style={{boxShadow: "none"}}
            variant="extended"
            color="primary"
            aria-label="add"
            onClick={clickHandler}>
              <Icon color="black" className={classes.logo}>add_circle</Icon> 
              Share Something
            </Fab>
            <ProfileMenu />
            
          </Toolbar>
        </AppBar>
      </div>
    )
  }

  export default TopBar