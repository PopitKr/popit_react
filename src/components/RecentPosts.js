import React from 'react';
import {Row, Col} from 'antd';

import Post from './Post';
import PostApi from '../services/PostApi';

export default class RecentPosts extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
    }
  }
  componentDidMount() {
    PostApi.getRecentPosts()
      .then(json => {
        if (json.success !== true) {
          alert("Error:" + json.message);
          return;
        }

        console.log(">>>Data:", json.data);
        this.setState({
          posts: json.data
        });
      })
      .catch(error => {
        alert("Error:" + error);
      });
  };

  render() {
    const { posts } = this.state;
    const postItems = [];

    posts.forEach((post, index) => {
      const marginRight = index < 4 ? 20 : 0;
      postItems.push(<div style={{float: "left", marginRight: marginRight}}><Post post={post} showAuthor={true}/></div>);
    });

    return (
      <div>
        <h2>최신글</h2>
        <div>{ postItems }</div>
        <div style={{clear: 'both'}}></div>
      </div>
    )
  }
}