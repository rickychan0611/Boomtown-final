import React from 'react';
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


const OwnerItems = ({ classes, item }) => {
  console.log('profile' + JSON.stringify(item))
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
              <Avatar aria-label="recipe" className={classes.avatar}>
                R
          </Avatar>
            }
            title="Full name"
            subheader="some time ago"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h3" m={0}>
              {item.title}
          </Typography>
            <Typography gutterBottom variant="body2" color="textSecondary" component="p">
              tag, tag, tag
          </Typography>
            <Typography gutterBottom variant="subtitle1" color="black" component="p" mt={8}>
            {item.description}
          </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button variant="outlined" size="large" color="primary" className={classes.margin}>
            Borrow
        </Button>
        </CardActions>
      </Card>
    </Grid>
  )
}

export default withStyles(styles)(OwnerItems);
