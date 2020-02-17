import React, {useContext} from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import BorrowButtonModal from '../../components/BorrowButtonModal'
import ViewerProvider, { ViewerContext } from '../../context/ViewerProvider'


const Items = ({ classes, item }) => {
  const {viewer} = useContext(ViewerContext)

  let options = {
    year: "numeric",
    month: "2-digit",
    day: "numeric"
  };

  console.log(item.tags)
  let formatedTags = ''
  formatedTags = item.tags.replace(/"/g, '')
  formatedTags = formatedTags.replace(/{/g, '')
  formatedTags = formatedTags.replace(/}/g, '')
  formatedTags = formatedTags.replace(/,/g, ', ')

  const randomAvatar = () => {
    const num = Math.floor(Math.random() * 10)
    const url = 'https://avatars.dicebear.com/v2/human/'+num+'.svg'
    return url
  }

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card className={classes.card}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={item.imageurl}
            title={item.title}
          />
          <CardHeader
            avatar={
              <Avatar aria-label="recipe" className={classes.avatar} 
                src={randomAvatar()}
                >
                </Avatar> 
            }
            title={item.fullname}
            subheader={"Added Date: " + new Date(item.created).toLocaleString("en", options)}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h3" m={0}>
              {item.title}
          </Typography>
            <Typography gutterBottom variant="body2" color="textSecondary" component="p">
              {formatedTags}
          </Typography>
            <Typography gutterBottom variant="subtitle1" color="black" component="p" mt={8}>
            {item.description}
          </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <BorrowButtonModal 
          item={item}
          viewer={viewer}/>
        </CardActions>
      </Card>
    </Grid>
  )
}

export default withStyles(styles)(Items);
