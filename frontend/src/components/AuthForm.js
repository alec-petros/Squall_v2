import React from 'react';
import { connect } from 'react-redux';
import { login, getFavorites, register } from '../actions/actions'

class AuthForm extends React.Component {

  DEFAULT_STATE = {
    username: "",
    password: "",
    email: "",
    errors: []
  }
  state = this.DEFAULT_STATE

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.props.mode === "login") {
      this.props.login(this.state.username, this.state.password)
    } else {
      this.props.register(this.state.username, this.state.password)
    }
    this.props.history.push('/')
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  errors(){
    return <ol>
        { this.state.errors.map((error) => <li>{ error }</li>) }
    </ol>
  }

  render(){

    const registerInputs=(
      <form onSubmit={ this.handleSubmit }>
        <label htmlFor="username">Username</label>
        <input type="text" onChange={ this.handleChange }
                           value={ this.state.username }
                           name="username"
                           id="username" /><br></br>
        <label htmlFor="password">Password</label>
        <input type="password" onChange={ this.handleChange }
                           value={ this.state.password }
                           name="password"
                           id="password" /><br></br>
        <label htmlFor="email">Email</label>
        <input type="text" onChange={ this.handleChange }
                           value={ this.state.email }
                           name="email"
                           id="email" /><br></br>
         <label htmlFor="name">Display Name</label>
         <input type="text" onChange={ this.handleChange }
                            value={ this.state.name }
                            name="name"
                            id="name" /><br></br>
        <input type="submit" />
      </form>
    )

    return (<div>
      { this.state.errors.length ? this.errors() : "" }
      {
        this.props.mode === "login" ?
        <form onSubmit={ this.handleSubmit }>
          <label htmlFor="username">Username</label>
          <input type="text" onChange={ this.handleChange }
            value={ this.state.username }
            name="username"
            id="username" /><br></br>
          <label htmlFor="password">Password</label>
          <input type="password" onChange={ this.handleChange }
            value={ this.state.password }
            name="password"
            id="password" /><br></br>
          <input type="submit" />
        </form> :
        registerInputs
      }
    </div>)
  }
}

function mapStateToProps(state){
  return {auth: state.auth}
}

export default connect(mapStateToProps, { login, getFavorites, register })(AuthForm)
