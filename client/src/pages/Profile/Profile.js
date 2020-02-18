import React, { useState, useEffect, Fragment, useContext } from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import OwnerItems from './OwnerItems'
import { ViewerContext } from '../../context/ViewerProvider';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';

const Profile = ({ classes, borrowedData, sharedData, viewerData }) => {

  const randomAvatar = () => {
    const num = Math.floor(Math.random() * 10)
    const url = 'https://avatars.dicebear.com/v2/human/' + num + '.svg'
    return url
  }

  return (
    <ViewerContext.Consumer>
      {({ viewer }) => {
        let user = {}
        if (viewer.login) {
          user = viewer.login.user
        }
        if (viewer.user) {
          user = viewer.user
        }
        const { id, email, fullname, avatar } = user
        // console.log('viewerData!!!' + JSON.stringify(sharedData))
        const getAvatar = () => {
          if (sharedData.owneritems.length > 0) {
            return sharedData.owneritems[0].avatar
          } else {
            return avatar
          }
        }
        return (
          <Fragment>
            <div className={classes.root}>
              <Container maxWidth="lg" className={classes.container}>
                <Paper className={classes.root}>
                  <Grid container wrap="nowrap" spacing={2}>
                    <Grid item>
                      <Avatar aria-label="recipe" className={classes.avatar}
                        src={getAvatar()}
                      >
                      </Avatar>
                    </Grid>
                    <Grid item xs>
                      <Typography variant="h2" component="h1">
                        {sharedData.owneritems.length > 0 ? sharedData.owneritems[0].fullname :
                          fullname}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Typography component="h3">
                    {sharedData.owneritems.length} items shared,  {borrowedData.borroweditems.length} items borrowed
              </Typography>
                  <Typography component="h5">
                    "No bio provided."
              </Typography>
                </Paper>
                {borrowedData.borroweditems.length > 0 ?
                  <div>
                    <br /><br />
                    <Typography variant="h3" color="primary">
                      Borrowed Items:
              </Typography>
                    <Grid container spacing={3}>
                      {borrowedData.borroweditems.map(item => {
                        return <OwnerItems item={item} />
                      })}
                    </Grid>
                  </div> : null}

                {sharedData.owneritems ?
                  <div>
                    <br /><br />
                    <Typography variant="h3" color="primary">
                      Shared Items:
              </Typography>
                    <Grid container spacing={3}>
                      {sharedData.owneritems.map(item => {
                        return <OwnerItems item={item} />
                      })}
                    </Grid>
                  </div> : null}
              </Container>
            </div>
          </Fragment>
        )
      }}

    </ViewerContext.Consumer>
  );
};

export default withStyles(styles)(Profile);
