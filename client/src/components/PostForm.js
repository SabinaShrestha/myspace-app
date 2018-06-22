import React from 'react';
import { connect } from 'react-redux';
import { Form } from 'semantic-ui-react';
import { updatePost, addPost } from '../reducers/posts';

class PostForm extends React.Component{
  intialState = {
    title: '',
    body: ''
  }

  state = {...this.initialState}

  componentDidmount(){
    if (this.props.id)
      this.setState({ ...this.props })
  }

  handleChange = (e) => {
    const { name, value } = e.target
    this.setState({ [name]: value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const post = this.state
    const { closeForm, dispatch } = this.props
    const myFunc = this.props.id ? updatePost: addPost
    dispatch(myFunc(post))
    this.setState({...this.intialState})
    closeForm()
  }

  render(){
    const { title, body } = this.props
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Input
          name="title"
          required
          defaultValue={title}
          onChange={this.handleChange}
          label="Title"
        />
        <Form.Input
          name="body"
          defaultValue={body}
          onChange={this.handleChange}
          label="Body"
        />
        <Form.Button>Save</Form.Button>
      </Form>
    )
  }
}

export default connect()(PostForm);
