import React, { useState, useEffect, Fragment, useContext } from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import OwnerItems from './OwnerItems'
import {ViewerContext} from '../../context/ViewerProvider';
import {ItemPreviewContext} from '../../context/ItemPreviewProvider';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import { useQuery } from '@apollo/react-hooks';
import { OWNER_ITEMS_QUERY } from '../../apollo/queries';

const Profile = ({id, classes}) => {
  const {viewer} = useContext(ViewerContext)
  const {state} = useContext(ItemPreviewContext)
  const { data, loading, error } = useQuery(OWNER_ITEMS_QUERY,
    { variables: { id: viewer.user.id } });

  if (loading) return <h1>LOADING...</h1>;
  if (error) {
    return (
      <div>
        <p>ERROR in item</p>
        <p>{JSON.stringify(error)}</p>
      </div>
    )
  }
  
  // useEffect (()=>{

  // },[])

  return (
    <ViewerContext.Consumer>
    {({viewer}) => {
      let user = {}
      if (viewer.login){
      user = viewer.login.user
      console.log(JSON.stringify(user))
      }
      if (viewer.user){
        user = viewer.user
        console.log(JSON.stringify(user))
        }
      const {id, email, fullname} = user
        return (
          <div  className={classes.root}>
            <Container maxWidth="lg" className={classes.container}>
            <Paper className={classes.root}>
            <Grid container wrap="nowrap" spacing={2}>
              <Grid item>
                <Avatar aria-label="recipe" className={classes.avatar} 
                src="https://www.gravatar.com/avatar/e9588c04071bf3a157207bb2c11fbbb9?d=retro&r=g&s=100"
                >
                  {/* {fullname.slice(0, 1)} */}
                </Avatar> 
              </Grid>
              <Grid item xs>
                <Typography variant="h2" component="h1">
                  {fullname}
                </Typography>
              </Grid>
              </Grid>
              <Typography component="h3">
                3 Items shared 0 Items borrowed
              </Typography>
              <Typography component="h5">
                "No bio provided."
              </Typography>
            </Paper>
            <br/><br/>
            <Typography variant="h3" color="primary">
              Shared Items:
              </Typography>
              <br/>
              <Grid container spacing={3}>
              {data.owneritems.map(item => {
                return <OwnerItems item={item}/>
                })}
              </Grid>
              
            </Container>
            
          </div>
        )
      }}
    
    </ViewerContext.Consumer>
  );
};

export default withStyles(styles)(Profile);
