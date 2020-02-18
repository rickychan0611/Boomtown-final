import React, { Fragment, useState } from 'react';
import { Redirect, Route, Switch } from 'react-router';
import Home from '../pages/Home';
import Items from '../pages/Items';
import Share from '../pages/Share';
import Profile from '../pages/Profile';
import OwnerProfile from '../pages/OwnerProfile';
import { ViewerContext } from '../context/ViewerProvider'

export default () => (
  <Fragment>
    <ViewerContext.Consumer>
      {({ viewer, getLogin, setLogin }) => {
        if (viewer || getLogin == true) {
          setLogin(true)
          return (
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/items" component={Items} />
              <Route path="/share" component={Share} />
              <Route path="/profile" component={Profile} />
              <Route path="/owner-profile:userId" component={OwnerProfile} />
            </Switch>)
        }
        console.log('user is not logged in')
        return (<Switch>
          <Route path="/" component={Home} />
        </Switch>)
      }
      }
    </ViewerContext.Consumer>
  </Fragment>
);
