import React from 'react'
import AuthForm from './AuthForm'
import { Redirect } from 'react-router'

export default class LoginForm extends React.Component {

  render(){
    return (
      <div>
      <h3>Log In</h3>
        { this.props.auth ? <Redirect to="/" /> : null }
        <AuthForm { ...this.props }
                       url="http://localhost:3000/sessions" />
      </div>
    )
  }
}
