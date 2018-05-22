import React from 'react';
import { connect } from 'react-redux'
import { postComment } from '../actions/contentActions'
import Well from 'react-bootstrap/lib/Well'

class CommentContainer extends React.Component {

  state = {
    content: ""
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.postComment(this.props.song.id, this.state.content, this.props.auth)
  }

  handleDelete = (id) => {

  }

  render() {
    const comments = this.props.song.comments.map(com => <Well onClick={() => {this.props.history.push(`/users/${com.user.id}`)}}>{com.user.username} - {com.content}</Well>)

    return (
      <div>
        <form onChange={this.handleChange} onSubmit={this.handleSubmit}>
          <input name="content" value={this.state.content} size="40" />
          <input type="submit" value="Save Comment" />
          <br></br><br></br>
          <ul>
            { comments }
          </ul>
        </form>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps, { postComment })(CommentContainer)
