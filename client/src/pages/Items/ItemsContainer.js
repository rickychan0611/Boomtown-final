import React, { useState, useEffect, Fragment, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Items from './Items'
import {ViewerContext} from '../../context/ViewerProvider';
import TopBar from '../../components/TopBar/TopBar'


// import FullScreenLoader from '../../components/FullScreenLoader';
import { Query } from 'react-apollo';
import { useQuery } from '@apollo/react-hooks';

import { ALL_ITEMS_QUERY } from '../../apollo/queries';

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

const ItemsContainer = () => {
  const classes = useStyles();
  const {viewer} = useContext(ViewerContext)
  const {getUserId} = useContext(ViewerContext)
// console.log('viewer!!!!' + JSON.stringify(viewer))
  // const [viewerId, setViewerId] = useState()
  const { data, loading, error } = useQuery(ALL_ITEMS_QUERY,
    { variables: { id: viewer.user.id },
    fetchPolicy: 'cache-and-network'
  });
  
  if (loading) return <h1>LOADING...</h1>;

  if (error) {
    return (
      <div>
        <p>ERROR in item</p>
        <p>{JSON.stringify(error)}</p>
      </div>
    )
  }
  
  if (data) {
    // console.log('item data!!!' + JSON.stringify(data))
    let sortedItems = data.items
    sortedItems.sort((a,b)=>{
      return (
        new Date(b.created) - new Date(a.created)
      )
    })
  return (
    <div className={classes.root}>
      <TopBar/>
      <Container maxWidth="lg" className={classes.container}>
        <Grid container spacing={3}>
          {sortedItems.map((item, index) => {
          return <Items item={item} key={index}/>
          })}
        </Grid>
      </Container>
    </div>
  )
}
}

export default ItemsContainer;
