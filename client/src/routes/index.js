import React, { Fragment, useState } from 'react';
import { Redirect, Route, Switch } from 'react-router';
import Home from '../pages/Home';
import Items from '../pages/Items';
import Share from '../pages/Share';
import Profile from '../pages/Profile';
import ViewerProvider, { ViewerContext } from '../context/ViewerProvider'

export default () => (

  <Fragment>
  <ViewerContext.Consumer>
      {({ viewer, getLogin, setLogin }) => {
        // console.log('!!!',viewer.user)
        if (viewer || getLogin == true) {  
          setLogin(true)    
        //  console.log('user is logged in' + JSON.stringify(viewer))
        //  console.log(JSON.stringify(viewer))
        //  console.log('loggedIn' + loggedIn)
         return (    
         <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/items" component={Items} />
          <Route path="/share" component={Share}/>
          <Route path="/profile" component={Profile} />
  
        </Switch>)
    } 
    // if (getLogin == false) {
      console.log('user is not logged in')
      return (<Switch>
          <Route path="/" component={Home} />
      </Switch>)
    }
      // }
      }
  </ViewerContext.Consumer>
    {/* <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/items" component={Items} />
        <Route path="/welcome" component={Home} />
        <Route path="/share">
          {(loggedIn) ? <Share /> : <Redirect to="/" /> }
        </Route>
        {/* {(loggedIn) ? <Route path="/share" component={Share} /> :
      <Route path="/share" component={Home} /> } */}
        {/* <Route path="/profile" component={Profile} /> */}
        {/* <Route path="/profile/:id" component={Profile} /> */}

        {/* <Route component={NotFound} /> */}
        {/**
       * @TODO: Define routes here for: /items, /profile, /profile/:userid, and /share
       *
       * Provide a wildcard redirect to /items for any undefined route using <Redirect />.
       *
       * Later, we'll add logic to send users to one set of routes if they're logged in,
       * or only view the /welcome page if they are not.
       </Switch> */}


      {/* <Route
      path={`${match.url}/:name`}
      render={({ match }) => <h2>{match.params.name}</h2>}
    /> */}
    </Fragment>

);
