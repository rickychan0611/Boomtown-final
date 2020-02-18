import React, { Component } from 'react';
import { ItemPreviewContext } from '../../context/ItemPreviewProvider'
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

export class SharedItemPreview extends Component {
    render() {
        const classes = this.props.classes
        return (
            <ItemPreviewContext.Consumer>
                {({ state }) => {
                    const item = state
                    return (
                        <Grid item xs={12}>
                            <Card className={classes.card}>
                                <CardActionArea>
                                    <CardMedia
                                        className={classes.media}
                                        image={item.imageUrl}
                                        title="Contemplative Reptile"
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
                                            {item.tags.map((tag, index) => {
                                                if (index === item.tags.length - 1) {
                                                    return (
                                                        `${tag}`
                                                    )
                                                }
                                                else return (
                                                    `${tag}, `
                                                )
                                            })}
                                        </Typography>
                                        <Typography gutterBottom variant="subtitle1" component="p" mt={8}>
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
                }
            </ItemPreviewContext.Consumer>
        );
    }
}

export default withStyles(styles)(SharedItemPreview);
