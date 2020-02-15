import React from 'react';
import ReactDOM from 'react-dom';
import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
// @TODO: Uncomment each module as needed in your client app
import { ApolloProvider } from '@apollo/react-hooks';
import { BrowserRouter, useHistory } from 'react-router-dom'
// import { Provider as ReduxProvider } from 'react-redux'
// -------------------------------

import registerServiceWorker from './registerServiceWorker';
import theme from './theme';
import client from './apollo'

import { makeStyles } from '@material-ui/core/styles';
import AuthLink from './AuthLink'

import AppRoutes from './routes'

import ViewerProvider  from './context/ViewerProvider'
import ItemPreviewProvider from './context/ItemPreviewProvider'


import './index.css'
// import logo from './images/boomtown.svg'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    // backgroundColor: "#212121",
  },
  menuButton: {
  },
  title: {
    flexGrow: 1,
  },
  // toolbar: theme.mixins.toolbar,
  logo: {
    marginRight: 'auto',
    width: 40
  },
}));

const App = () => {
  const classes = useStyles();
  return (
    <MuiThemeProvider theme={theme}>
      <ItemPreviewProvider>
        <ApolloProvider client={client}>
          <ViewerProvider>
            <BrowserRouter>
              <CssBaseline />
              <AuthLink />
              <div className={classes.toolbar} />
              <AppRoutes />
            </ BrowserRouter>
          </ViewerProvider>
        </ ApolloProvider>
      </ItemPreviewProvider>
    </MuiThemeProvider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
