const styles = theme => ({
    root: {
      flexGrow: 1,
      padding: theme.spacing(3, 2),
      paddingTop: 60
      // backgroundColor: "#212121",
    },
    paper: {
      // padding: theme.spacing(2),
      textAlign: 'center',
      // color: theme.palette.text.secondary,
      backgroundColor: "white",
    },
    card: {
      maxWidth: 600
    },
    media: {
      height: 250,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    offset: theme.mixins.toolbar,
    container: {
      // backgroundColor: "#212121",
      paddingTop: 30
    },
    avatar : {
      width: theme.spacing(7),
      height: theme.spacing(7),
    },
  })
export default styles;
