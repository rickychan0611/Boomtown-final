import { withStyles } from '@material-ui/core/styles';
import ItemPreviewProvider, { ItemPreviewContext } from '../../context/ItemPreviewProvider'
import ViewerProvider, { ViewerContext } from '../../context/ViewerProvider'
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import React, { useState,useContext } from 'react';
import Typography from '@material-ui/core/Typography';
import { useMutation } from '@apollo/react-hooks';
import { useHistory } from "react-router-dom";
import { Form, Field } from 'react-final-form'
import styles from './styles';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import SubmitDialog from './SubmitDialog'
import firebase from 'firebase/app'
import { OWNER_ITEMS_QUERY } from '../../apollo/queries';
import { ADD_ITEM_MUTATION } from '../../apollo/queries';

const onValidateFunc = values => {
  // console.log('validate: ' + JSON.stringify(values))
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
  const {updatePreview} = useContext(ItemPreviewContext)
  const [imgFile, setImgfile] = useState({})


  const onSubmitClicked = () => {
    // console.log('ON SUBMIT!')
    // let addItem = item
    let newItem = {"item" : item }
    item.itemowner = viewer.user.id
    for (let i in item.tags) {
      // console.log (i)
    }
    // console.log('clicked@@@' + JSON.stringify(newItem))
    if (item !== null) {
      // console.log(JSON.stringify(item))
      addItem({variables: newItem}) 
    }
  }

  const [ addItem ] = useMutation(ADD_ITEM_MUTATION, {
    refetchQueries: () => [{
        query: OWNER_ITEMS_QUERY,
    }],
    // onCompleted: refetch,
  })

  const fileChangedHandler = (event) => {
    let file = event.target.files[0];// let files = event.target.files
    // console.log(file)
    let filename = ''
      filename = file.name
      if (filename.lastIndexOf('.') <= 0) {
        return alert('Please add a valid file!')
      }
      const ext = filename.slice(filename.lastIndexOf('.'))
      let reader = new FileReader()
      reader.onloadend = () => {
        setImgfile({
          file: file,
          imagePreviewUrl: reader.result
        });
      }
      reader.readAsDataURL(file)
      // updatePreview('imageUrl', imgFile.imagePreviewUrl)
      firebase.storage().ref('boomtown/' + filename).put(file)
        .then((fileData) => { // then get downloadUrl
          let storage = firebase.storage()
          let urlRef = storage.ref('boomtown/' + filename)
          urlRef.getDownloadURL().then(function (downloadURL) {
            // item.refundImg = downloadURL
            return downloadURL
          })
            .then((downloadURL) => {
              // console.log('downloadURL' + downloadURL)
              updatePreview('imageUrl', downloadURL)
              // firebase.database().ref('sellers/' + this.id + '/' + item.productName + '/' + item.buyer).update({ 'refundImg': downloadURL })
            })
            .then(() => {
              // item.loading = false
              // vm.$forceUpdate()
            })
        })

  }

  const onPickFile = () => {
    // console.log(this.$refs.fileInput.click)
    document.getElementById("file").click() // $refs = all ref in this file, in this case, ref="fileInput"
  }
  
    let {imagePreviewUrl} = imgFile;
    let imagePreview = null;
    if (imagePreviewUrl) {
      imagePreview = (<img src={imagePreviewUrl} />);
    } else {
      imagePreview = (<div className="previewText">Please select an Image for Preview</div>);
    }

  return (
    
    <ItemPreviewContext.Consumer>
      {({ state, updatePreview, tagsData, resetPreview }) => {
        return (
          
          <div>
            <h1 className={classes.h1}>Share. Borrow. Prosper.</h1>
            <Button className={classes.imgButton} variant="contained" color="primary" 
            onClick={onPickFile}>
              Upload your image
              <input style={{display: "none"}} id="file" type="file" 
              accept="image/*"
              onChange={fileChangedHandler}
              />
              </Button>
              <div className="imgPreview">
                {/* {imagePreview} */}
              </div>
            <Form
              onSubmit={onSubmitClicked}
              validate={onValidateFunc}
              render={({ handleSubmit }) => (
                <form onSubmit={handleSubmit}
                  onChange={e => {
                    updatePreview(e.target.name, e.target.value)
                    setItem(state)
                    // console.log('setItem ' + JSON.stringify(item))
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

                            // console.log('setItem ' + JSON.stringify(tagName))
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
