import React, { useState, useEffect, Fragment, useContext } from 'react';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import { useMutation } from '@apollo/react-hooks';
import { useHistory } from "react-router-dom";
import ViewerProvider, { ViewerContext } from '../../context/ViewerProvider'

import { ADD_ITEM_MUTATION } from '../../apollo/queries';


const SubmitDialog = ( {classes, item} ) => {
  const history = useHistory()
  const [open, setOpen] = React.useState(false);
  const {viewer} = useContext(ViewerContext)

  let newItem = {}
  newItem.item = item
  newItem.item.itemowner = viewer.user.id
  console.log('newItem' + newItem)

  const [addItem, { data, loading, error }] = useMutation(ADD_ITEM_MUTATION)
    if (error) {
      console.log("dddddddd"  + error)// return <p>ERROR</p>;
    }
    if (data) {
      console.log("submDiaglLLLLLL" + JSON.stringify(data))
    }
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleAddAnotherItem = () => {
      setOpen(false);
      addItem({variables: newItem})
      // console.log('@@@@item' + JSON.stringify(newItem))
    };

    const handleGoToItemPage = () => {
      setOpen(false);
      addItem({variables: newItem})
      // console.log('@@@@item' + JSON.stringify(newItem))
      history.push('/items')
    };
  
    return (
      <div>
        <Button 
        onClick={handleClickOpen}
        // onClick={onSubmitClicked}
        className={classes.formButton}
        variant="contained"
        size="large"
        color="secondary"
        disabled={
          false // @TODO: This prop should depend on pristine or valid state of form
        }>
          Submit
        </Button>
        <Dialog
          open={open}
          // onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
          {"Your item was added!"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
            You may add another item if you like. To add another item click 'Add another item'. To view your item, click 'Back to items page'.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleAddAnotherItem} color="primary">
              Add another item
            </Button>
            <Button onClick={handleGoToItemPage} color="primary" autoFocus>
              Back to item page
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
  export default withStyles(styles)(SubmitDialog)