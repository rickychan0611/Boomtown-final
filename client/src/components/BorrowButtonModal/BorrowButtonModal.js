import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import {useSpring, animated} from 'react-spring'
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { BORROW_MUTATION } from '../../apollo/queries';
import { useMutation } from '@apollo/react-hooks';
import { useHistory } from "react-router-dom";


const useStyles = makeStyles(theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  root: {
    maxWidth: 400,
  },
}));

const Fade = React.forwardRef(function Fade(props, ref) {
  const { in: open, children, onEnter, onExited, ...other } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter();
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited();
      }
    },
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {children}
    </animated.div>
  );
});

Fade.propTypes = {
  children: PropTypes.element,
  in: PropTypes.bool.isRequired,
  onEnter: PropTypes.func,
  onExited: PropTypes.func,
};

const BorrowButtonModal = ({item, viewer}) => {
  const [borrowItem, { data, loading, error }] = useMutation(BORROW_MUTATION)

  console.log('button viewer: ' + JSON.stringify(viewer))
  console.log('button item: ' + JSON.stringify(item))

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
 
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  let newItem = {}
  newItem.item = item
  newItem.item.borrower = viewer.user.id
  console.log('newItem' + newItem)
  delete newItem.item.__typename
  // let newItem = {}
  // // newItem.item.id = item.id
  // newItem.item.title = item.title
  // newItem.item.description = item.description
  // newItem.item.imageurl = item.imageurl
  // newItem.item.itemowner = item.itemowner
  // newItem.item.created = item.created
  // newItem.item.fullname = item.fullname
  // newItem.item.borrower = viewer.user.id
  // let borrower = {}
  // borrower = viewer.user.id
  
  const handleBorrow = () => {
    console.log('BORROW_MUTATION ' + JSON.stringify(newItem ))
    setOpen(false);
    borrowItem({variables: newItem})
  };

  return (
    <div>
      <Button variant="outlined" size="large" color="primary" className={classes.margin} onClick={handleOpen}>
            Borrow
        </Button>
      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
        <Card className={classes.root}>
            <CardActionArea>
              <CardMedia
                component="img"
                alt={item.title}
                image={item.imageurl}
                title={item.title}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  Do you want to borrow {item.title}?
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button size="large" variant="outlined" color="primary" onClick={handleBorrow}>
                Yes, borrow it!
              </Button>
              <Button size="large" variant="outlined" color="primary" onClick={()=>{setOpen(false)}}>
                Cancel
              </Button>
            </CardActions>
          </Card>
        </Fade>
      </Modal>
    </div>
  );
}

export default BorrowButtonModal 