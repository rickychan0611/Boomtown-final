const styles = theme => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
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
      backgroundColor: "#212121",
    //   paddingTop: 30
    },
    shareItemForm: {  
    },
    h1 : {
        fontSize: 45,
        lineHeight: '97%',
        margin: 0
    },
    imgButton: {
        marginTop: 70,
        marginBottom: 30,
        width: '100%'
    },
    formControl: {
        marginBottom: theme.spacing.unit * 2,
        width: '100%'
      },
      formButton: {
        marginTop: theme.spacing.unit * 2
      },
      formToggle: {
        background: 'none',
        border: 'none',
        textDecoration: 'underline',
        '&:hover': {
          cursor: 'pointer'
        }
      },
      accountForm: {
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          width: '400px'
        }
      },
      errorMessage: {
        color: 'firebrick'
      }
  })
export default styles;
