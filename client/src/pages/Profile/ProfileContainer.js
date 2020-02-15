import React, { Component } from 'react';
import Profile from './Profile';
import { makeStyles } from '@material-ui/core/styles';
import TopBar from '../../components/TopBar/TopBar'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: "#212121",
  },
  offset: theme.mixins.toolbar,
  container: {
    backgroundColor: "#212121",
    paddingTop: 100
  }
}))

const ProfileContainer =(props) => {
  const classes = useStyles()

    return (
    <div className={classes.root}>
      <TopBar/>
      <Profile 
      className={classes.container}
      id={props.match.params.id}
      />;
    </div>
    )
}

export default ProfileContainer;
