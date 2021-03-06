import axios from 'axios';
import {  setHeaders } from './headers';
const POSTS = 'POSTS';
const ADD_POST = 'Add_POST';
const UPDATE_POST = 'UPDATE_POST';
const DELETE_POST = 'DELETE_POST';

export const getPosts = () => {
  return (dispatch) => {
    axios.get('/api/posts')
      .then(res => {
        const { headers } = res;
        dispatch(setHeaders(headers));
        dispatch({type: POSTS, posts: res.data})
      })
  }
}


export const addPost = (post) => {
  return (dispatch) => {
    axios.post('/api/posts', {post})
      .then(res => {
        const { headers } = res;
        dispatch(setHeaders(headers));
        dispatch({type: ADD_POST, post: res.data})
      })
  }
}


export const updatePost = (post) => {
  return (dispatch) => {
    axios.put(`/api/posts/${post.id}`, {post})
      .then(res => {
        dispatch({type: UPDATE_POST, post: res.data})
      })
  }
}


export const deletePost = (id) => {
  return (dispatch) => {
    axios.delete(`/api/posts/${id}`)
      .then(res => dispatch({type: DELETE_POST, id}))
  }
}

export default (state = [], action) => {
  switch(action.type){
    case POSTS:
      return action.posts
    case ADD_POST:
      return [action.post, ...state]
    case UPDATE_POST:
    debugger
      return state.map(p => {
        if (p.id === action.post.id)
          return action.post
        return p
      })
    case DELETE_POST:
      return state.filter(p => p.id !== action.id)
    default:
      return state
  }
}
