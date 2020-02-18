import React, { Component } from 'react';
import Profile from './Profile';
import { makeStyles } from '@material-ui/core/styles';
import TopBar from '../../components/TopBar/TopBar'
import { OWNER_ITEMS_QUERY } from '../../apollo/queries';
import { BORROWED_ITEMS_QUERY } from '../../apollo/queries';
import { useQuery } from '@apollo/react-hooks';

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
  const { data: sharedData, loading: l1, error: e1 } = useQuery(OWNER_ITEMS_QUERY,
        { fetchPolicy: 'cache-and-network'});

  const { data: borrowedData, loading: l2, error: e2 } = useQuery(BORROWED_ITEMS_QUERY, 
        { fetchPolicy: 'cache-and-network'});
  
    if (l1 || l2) return <h1>LOADING...</h1>;
    if (e1 || e2) {
      return (
        <div>
          <p>ERROR in item</p>
          <p>{JSON.stringify(e1, e2)}</p>
        </div>
      )
    }
    if (!sharedData || !borrowedData) {
      return <p>Not found</p>
    }
    return (
    <div className={classes.root}>
      <TopBar/>
      <Profile 
      className={classes.container}
      id={props.match.params.id}
      sharedData={sharedData}
      borrowedData={borrowedData}
      />;
    </div>
    )
}

export default ProfileContainer;
