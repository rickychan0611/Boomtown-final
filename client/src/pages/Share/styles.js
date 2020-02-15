import { height } from "@material-ui/system";

const styles = theme => ({
    root: {
      flexGrow: 1,
      backgroundColor: "#212121"
    },
    paper: {
      padding: theme.spacing(2),
      color: "black",
      backgroundColor: "#fffff1",
    //   height: '50%',
      position: 'absolute',
    },
    shareContainer: {
        padding: 30,
        maxWidth: 1000,
        display: 'flex',
        height: '90vh',
        alignItems: 'center',
        justifyContent: 'center'
    }
  });

export default styles;
