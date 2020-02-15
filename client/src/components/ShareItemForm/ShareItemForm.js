import { withStyles } from '@material-ui/core/styles';
import ItemPreviewProvider, { ItemPreviewContext } from '../../context/ItemPreviewProvider'
import ViewerProvider, { ViewerContext } from '../../context/ViewerProvider'
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import React, { useState,useContext } from 'react';
import Typography from '@material-ui/core/Typography';
import { useMutation } from '@apollo/react-hooks';
import { Link, withRouter, useHistory } from "react-router-dom";
import { Redirect, Route, Switch } from 'react-router';
import { Form, Field } from 'react-final-form'
import styles from './styles';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';
import SubmitDialog from './SubmitDialog'


import { ADD_ITEM_MUTATION } from '../../apollo/queries';

const onValidateFunc = values => {
  console.log('validate: ' + JSON.stringify(values))
  // loginValues = values
}
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const tags = [
  // {id: 1, title: 'Household Items'},
  // {id: 2, title: 'Tools'},
  // {id: 3, title: 'Electronics'},
  // {id: 4, title: 'Physical Media'},
  // {id: 5, title: 'Sporting Goods'},
  // {id: 6, title: 'Musical Instrument'},
  'Tools',
  'Electronics',
  'Physical Media',
  'Sporting Goods',
  'Musical Instrument',
  'Recreational Equiqment'
];

function getStyles(name, tagName, theme) {
  return {
    fontWeight:
      tagName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const ShareItemForm = ({ classes }) => {
  const [tagName, setTagName] = useState([]);
  const [item, setItem] = useState(null)
  const history = useHistory()
  const {viewer} = useContext(ViewerContext)


  const onSubmitClicked = () => {
    console.log('ON SUBMIT!')
    // let addItem = item
    let newItem = {"item" : item }
    item.itemowner = viewer.user.id
    for (let i in item.tags) {
      console.log (i)
    }
    console.log('clicked@@@' + JSON.stringify(newItem))
    if (item !== null) {
      // console.log(JSON.stringify(item))
      addItem({variables: newItem}) 
    }
  }

  const [addItem, { data, loading, error }] = useMutation(ADD_ITEM_MUTATION)
  if (error) {
    // return <p>ERROR</p>;
  }
  console.log('addItem return data : ' + data)
  if (loading) {
    return <p>LOADING...</p>
  }

  return (
    <ItemPreviewContext.Consumer>
      {({ state, updatePreview, tagsData, resetPreview }) => {
        return (
          <div>
            <h1 className={classes.h1}>Share. Borrow. Prosper.</h1>
            <Button className={classes.imgButton} variant="contained" color="primary" >
              Upload your image
          </Button>

            <Form
              onSubmit={onSubmitClicked}
              validate={onValidateFunc}
              render={({ handleSubmit }) => (
                <form onSubmit={handleSubmit}
                  onChange={e => {
                    updatePreview(e.target.name, e.target.value)
                    setItem(state)
                    console.log('setItem ' + JSON.stringify(item))
                  }
                  }
                  className={classes.accountForm}
                >
                  <FormControl fullWidth className={classes.formControl}>
                    {/* @TODO: Wrap in a Final Form <Field /> */}
                    <Field name="title" render={({ input, meta }) => (
                      <div>
                        <InputLabel htmlFor="title">Name of your item</InputLabel>
                        <Input
                          className={classes.formControl}
                          id="title"
                          type="text"
                          inputProps={{
                            autoComplete: 'off'
                          }}
                          value={input.value}
                          {...input}
                        />
                      </div>
                    )}
                    />
                  </FormControl>

                  <FormControl fullWidth className={classes.formControl}>
                    <Field name="description" render={({ input, meta }) => (
                      <div>
                        <InputLabel htmlFor="description">Describe your item</InputLabel>
                        <Input
                          className={classes.formControl}
                          id="description"
                          type="text"
                          inputProps={{
                            autoComplete: 'off'
                          }}
                          value={input.value}
                          {...input}
                        />
                      </div>
                    )}
                    />
                    {/* @TODO: Close Final Form <Field /> */}
                  </FormControl>
                  <FormControl fullWidth className={classes.formControl}>
                    <FormControl className={classes.formControl}>
                      <InputLabel>Add some tags</InputLabel>
                      <Field name="tags" render={({ input, meta }) => (
                        <Select
                          multiple
                          value={tagName}
                          onChange={e => {
                            updatePreview('tags', e.target.value)
                            setTagName(e.target.value)
                            setItem(state)

                            console.log('setItem ' + JSON.stringify(tagName))
                          }}
                          input={<Input />}
                          renderValue={selected => selected.join(', ')}
                          MenuProps={MenuProps}
                        >
                          {tags.map(tag => (
                            <MenuItem key={tag} value={tag}>
                              <Checkbox disabled checked={tagName.indexOf(tag) > -1} />
                              <ListItemText primary={tag} />
                            </MenuItem>
                          ))}
                        </Select>
                      )}
                      />
                    </FormControl>

                    {/* @TODO: Close Final Form <Field /> */}
                  </FormControl>
                  <FormControl className={classes.formControl}>
                    <Grid
                      container
                      direction="row"
                      justify="space-between"
                      alignItems="center"
                    >
                      {/* submit button is here */}
                      <SubmitDialog 
                      item={state} />
                      {/* <Button
                        onClick={onSubmitClicked}
                        className={classes.formButton}
                        variant="contained"
                        size="large"
                        color="secondary"
                        disabled={
                          false // @TODO: This prop should depend on pristine or valid state of form
                        }
                      // onClick={loginClicked}
                      >
                        Submit
                      </Button> */}

                    </Grid>
                  </FormControl>
                  <Typography className={classes.errorMessage}>
                    {/* @TODO: Display sign-up and login errors */}
                  </Typography>
                </form>)}
            ></Form>
            <ItemPreviewProvider />
          </div>
        )
      }
      }
    </ItemPreviewContext.Consumer>
  );
}

export default withStyles(styles)(ShareItemForm);
