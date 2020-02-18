import React, { Component } from 'react';
import Share from './Share';
import TopBar from '../../components/TopBar/TopBar'
import { makeStyles } from '@material-ui/core/styles';
import styles from './styles';

const useStyles = makeStyles(theme => ({
    root: {
      display:"flex",
      width: '100%',
      height: '100%',
      alignItems:"center",
      justifyContent:"center",
      padding: "20px"
    },
  offset: theme.mixins.toolbar
  
}))
const ShareContainer = ()=> {
    const classes = useStyles();
    return (
      <div className={classes.root}>
        <TopBar/> 
        <div className={classes.root}>
        <Share />
        </div>
      </div>
    )
}

// export default ShareContainer;
export default ShareContainer;

