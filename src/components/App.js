import React, { Component } from 'react';
import axios from 'axios';

import './App.css';

import Header from './Header/Header';
import Compose from './Compose/Compose';
import Post from './Post/Post';

const baseUrl = 'https://practiceapi.devmountain.com/api'

class App extends Component {
  constructor() {
    super();

    this.state = {
      posts: []
    };

    this.updatePost = this.updatePost.bind( this );
    this.deletePost = this.deletePost.bind( this );
    this.createPost = this.createPost.bind( this );
  }
  
  componentDidMount() {
  axios.get(`${baseUrl}/posts`).then(results =>{
    this.setState({ posts: results.data });
    }).catch(error=> console.log("componentMount",error));
  }


  updatePost(id,text) {
  axios.put(`${baseUrl}/posts?id=${id}`,{text}).then(results => {
        this.setState({
          posts: results.data
        });
     }).catch(error => console.log(error));
  }
  

  deletePost(id) {
  console.log(id);
  axios.delete(`${baseUrl}/posts?id=${id}`).then(results =>{
    this.setState({ posts: results.data});
  })
  }

  createPost(text) {
    axios.post(`${baseUrl}/posts`, {text}).then(results => {
      this.setState({
        posts: results.data
      });
    });
  }

  render() {
    const { posts } = this.state;
    console.log(posts)
    return (
      <div className="App__parent">
        <Header />

        <section className="App__content">

          <Compose createPostFn={this.createPost}/>

          {posts.map(post => (
          <Post key={post.id} 
          text={post.text} 
          date={post.date}
          id={post.id}
          updatePostFn={ this.updatePost}
          deletePostFn={ this.deletePost}
          />
        ))}
          
        </section>
      </div>
    );
  }
}
console.log(this.props)

export default App;
