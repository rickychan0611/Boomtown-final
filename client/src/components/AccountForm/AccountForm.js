import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import React, { Component, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { Link, withRouter, useHistory, Redirect } from "react-router-dom";
import { Route, Switch } from 'react-router';
import ViewerProvider, { ViewerContext } from '../../context/ViewerProvider'

import Items from '../../pages/Items';
import TextField from '@material-ui/core/TextField';


/**
 * @TODO: Uncomment the following lines when authentication is added to the form
 */
import { Form, Field } from 'react-final-form'

import {
  LOGIN_MUTATION,
  SIGNUP_MUTATION,
  VIEWER_QUERY
} from '../../apollo/queries';
import { graphql, compose } from 'react-apollo';
import validate from './helpers/validation'

import styles from './styles';

const AccountForm = ({ classes }) => {
  const [formToggle, setFormToggle] = useState(true)
  const history = useHistory()
  const [errorMsg, setErrorMsg] = useState('')
  const [emailError, setEmailError] = useState('')
  // let error = null
  let loginValues = {}
  const redicrtToItem = () => {
    return
    // <Redirect to='/items' />
  }
  let validEmailMsg = ''

  const onValidateFunc = values => {
    // console.log('validate!!: ' + errorMsg + JSON.stringify(values))
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(values.email))
    {
      validEmailMsg = "Your email is valid"
      console.log('good')
    }
    else {
      validEmailMsg = "Invalid email address"
      console.log('bad')
    }
  }

  // console.log('class ' + props)

  const [signUp, { data: signUpData, loading: signUpoading, error: signUpError }] = useMutation(SIGNUP_MUTATION)
  const [login, { data: viewerData, loading:loginLoading, error: loginError }] = useMutation(LOGIN_MUTATION)

  if (signUpError) {
    return <p>signUpError</p>;
  }

  if (loginLoading || signUpoading){
    return <h1>Loading...</h1>
  }
  //when logged in
  console.log('auth link'+ JSON.stringify(viewerData))

  if (viewerData) {
    return (
      <ViewerContext.Consumer>
      {({updateViewer, setLogin}) => {
          updateViewer(viewerData.login)
          setLogin(true)
          history.push('/items')
        }
      }
    </ViewerContext.Consumer>
    )
  }

  //when signed in
  if (signUpData) {
    return <Redirect to="/items" />
  }

  const onSumbit = values => {
    setErrorMsg('User was not found. Please try again')
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(values.email))
    {
      // validEmailMsg = "Your email is valid"
      setEmailError('')
      console.log('good')
      formToggle ?
        login({ variables: { user: values } }) :
        signUp({ variables: { user: values } })
    }
    else{
      setEmailError('Invalid Email')
    }
  }

  return (
    // @TODO: Wrap in Final Form 
    <Form
      // this one the login function insdie the AccountForm
      onSubmit={onSumbit}
      validate={onValidateFunc}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit}
          className={classes.accountForm}
        >
          {!formToggle && (
            <FormControl fullWidth className={classes.formControl}>
              {/* @TODO: Wrap in a Final Form <Field /> */}

              <Field name="fullname" render={({ input, meta }) => (
                <div>
                  <InputLabel htmlFor="fullname">Full Name</InputLabel>
                  <Input
                    className={classes.formControl}
                    id="fullname"
                    type="text"
                    inputProps={{
                      autoComplete: 'off'
                    }}
                    value={input.value}
                    {...input}
                  />
                </div>
              )}
              />
            </FormControl>
          )}

          <FormControl fullWidth className={classes.formControl}>
            <Field name="email" render={({ input, meta }) => (
              <div>
                <InputLabel htmlFor="email">E-mail</InputLabel>
                <Input
                  className={classes.formControl}
                  id="email"
                  type="text"
                  inputProps={{
                    autoComplete: 'off'
                  }}
                  value={input.value}
                  {...input}
                  error ={true}
                />
              <FormHelperText error>{emailError}</FormHelperText>
              </div>
            )}
            />

            {/* @TODO: Close Final Form <Field /> */}
          </FormControl>

          <FormControl fullWidth className={classes.formControl}>
            <Field name="password" render={({ input, meta }) => (
              <div>
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input
                  className={classes.formControl}
                  id="password"
                  type="text"
                  inputProps={{
                    autoComplete: 'off'
                  }}
                  value={input.value}
                  {...input}
                />
              </div>
            )}
            />
            {/* @TODO: Close Final Form <Field /> */}
          </FormControl>

          <FormControl className={classes.formControl}>
            <FormHelperText error className="errorMessage">
              {(loginLoading || signUpoading) ? errorMsg : null}
            </FormHelperText>

            {/* submit button is here */}
            <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="center"
            >
              <Button
                type="submit"
                className={classes.formButton}
                variant="contained"
                size="large"
                color="secondary"
                disabled={
                  false // @TODO: This prop should depend on pristine or valid state of form
                }
              // onClick={loginClicked}
              >
                {formToggle ? 'Enter' : 'Create Account'}
              </Button>
              <Typography>
                <button
                  className={classes.formToggle}
                  type="button"
                  onClick={() => {
                    // @TODO: Reset the form on submit
                    setFormToggle(!formToggle)
                  }}
                >
                  {formToggle
                    ? 'Create an account.'
                    : 'Login to existing account.'}
                </button>
              </Typography>
            </Grid>
          </FormControl>
          <Typography className={classes.errorMessage}>
            {/* @TODO: Display sign-up and login errors */}
          </Typography>
        </form>)}
    ></Form>
  )
}



// @TODO: Use compose to add the login and signup mutations to this components props.
// export default compose(
//   graphql
// )
// @TODO: Refetch the VIEWER_QUERY to reload the app and access authenticated routes.
export default withStyles(styles)(AccountForm);
