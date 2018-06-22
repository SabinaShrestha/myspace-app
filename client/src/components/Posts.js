import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Container, Header, Card, Button } from 'semantic-ui-react';
import PostForm from './PostForm';
import { getPosts, updatePost, deletePost } from '../reducers/posts';


class Posts extends React.Component{
  state = { showForm: false }

  componentDidMount(){
    this.props.dispatch( getPosts())
  }

  toggleForm = () => {
    this.setState({ showForm: !this.state.showForm })
  }

  checkButton = (post) => {
    // debugger
    // if (post.user_id === current_user.id){
    //   return(
    //     <div>
    //       <Button onClick={this.props.dispatch( updatePost(post.id) )}>
    //         Edit
    //       </Button>
    //       <Button onClick={this.props.dispatch( deletePost(post.id) )}>
    //         Delete
    //       </Button>
    //     </div>
    //   )
    // }else{
    //   return(post)
    // }
  }

  posts = () => {
    return this.props.posts.map(post =>
      <Card key={post.id}>
        <Card.Content>
          <Card.Header>
            {post.title}
          </Card.Header>
          <Card.Description>
            {post.body}
          </Card.Description>
        </Card.Content>
        {this.checkButton(post)}
      </Card>
    )
  }

  handleChange = (e, data) => {
    this.setState({body: data.value})
  }

  render(){
    const { posts, showForm } = this.state
    return(
      <Container>
        <Header as="h3" textAlign="center">Posts</Header>
        <Button onClick={ this.toggleForm }>
          { showForm ? 'Hide Form' : 'Show Form' }
        </Button>
        { showForm ?
          <PostForm closeForm={ this.toggleForm } />:
          <div>
            <Card.Group itemsPerRow={4}>
              {this.posts()}
            </Card.Group>
          </div>
        }
      </Container>
    )
  }
}



const mapStateToProps = (state) => {
  const { posts } = state
  return{
    posts
  }
}


export default connect (mapStateToProps)(Posts);
