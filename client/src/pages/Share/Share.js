import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Items from '../Items/Items'

import ShareItemForm from '../../components/ShareItemForm';
import SharedItemPreview from '../../components/SharedItemPreview';

const Share = ({ classes }) => {
  return (
    <Grid container 
      spacing={5} 
      className={classes.shareContainer}>
        <Grid item xs={12} sm={6}>
          <SharedItemPreview />
        </Grid>

        <Grid item xs={12} sm={6}>
          <ShareItemForm />
        </Grid>
      </Grid>
  );
};

export default withStyles(styles)(Share);
