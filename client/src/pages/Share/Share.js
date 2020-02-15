import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Items from '../Items/Items'


/* 
  TODO: Create ShareItemFrom and ShareItemPreview in the components dir
  and call them from this file.

  ShareItemForm is the form that our User will use to add a new item 

  When the user is filling ShareItemForm, we will show a preview of 
  this item using the ShareItemPreview. 
  Hint: It should look like any other Item card.

*/
import ShareItemForm from '../../components/ShareItemForm';
import SharedItemPreview from '../../components/SharedItemPreview';

const Share = ({ classes }) => {
  return (
    <Grid container 
      spacing={3} 
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
