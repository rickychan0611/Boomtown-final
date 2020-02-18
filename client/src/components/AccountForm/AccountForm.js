import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import { useMutation } from '@apollo/react-hooks';
import { useHistory, Redirect } from "react-router-dom";
import { ViewerContext } from '../../context/ViewerProvider'
import { Form, Field } from 'react-final-form'

import {
  LOGIN_MUTATION,
  SIGNUP_MUTATION,
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
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(values.email))
    {
      validEmailMsg = "Your email is valid"
    }
    else {
      validEmailMsg = "Invalid email address"
    }
  }

  const [signUp, { data: signUpData, loading: signUpoading, error: signUpError }] = useMutation(SIGNUP_MUTATION)
  const [login, { data: viewerData, loading:loginLoading, error: loginError }] = useMutation(LOGIN_MUTATION)

  // if (signUpError || loginError) {
  //   // setErrorMsg("User not found")
  //   return <Redirect to="/" />
  // }

  if (loginLoading || signUpoading){
    return <h1>Loading...</h1>
  }

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
  const randomAvatar = () => {
    const num = Math.floor(Math.random() * 100)
    const url = 'https://avatars.dicebear.com/v2/identicon/'+num+'.svg'
    return url
  }

  const onSumbit = values => {
    values.avatar = randomAvatar()
    console.log('singin values: ' + JSON.stringify(values))
    setErrorMsg('User was not found. Invalid e-mail or password. Please try again')
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(values.email))
    {
      setEmailError('')
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
                  error = {true}
                />
              <FormHelperText error>{emailError}</FormHelperText>
              </div>
            )}
            />

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
                  error = {true}
                />
                <FormHelperText error>{errorMsg}</FormHelperText>
              </div>
            )}
            />
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
                  false  
                }
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

export default withStyles(styles)(AccountForm);
