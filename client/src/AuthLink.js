import React, { useState } from 'react';
import { VIEWER_QUERY } from './apollo/queries';
import { useQuery } from '@apollo/react-hooks';
import {ViewerContext} from './context/ViewerProvider';
import { Link, withRouter, useHistory } from "react-router-dom";
import { Redirect, Route, Switch } from 'react-router';

export default function AuthLink(){
const history = useHistory()
//when refreshed, send a query to the server and check if there is a cookie token
const { loading, error, data } = useQuery(VIEWER_QUERY,
  { variables: { id: 'Authlink' } });
if (loading) return <h1>LOADING...</h1>;
if (error) {
    console.log('you are not logged in')
    return <Redirect to='/' />
}
// console.log('auth link'+ JSON.stringify(data))
return (
    <ViewerContext.Consumer>
      {({updateViewer}) => {
          return updateViewer(data)
        }
      }
    </ViewerContext.Consumer>
)

}
