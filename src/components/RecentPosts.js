import React from 'react';
import {Row, Col} from 'antd';

import Post from './Post';
import PostApi from '../services/PostApi';
import './popit.css';

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
    const postItems = posts.map((post, index) => {
      return(<div key={index} style={{float: "left", marginRight: 20}}><Post key={"recent-" + post.id} post={post} showAuthor={true} showDescription={true}/></div>);
    });

    return (
      <div>
        <div>
          <div>{ postItems }</div>
          <div style={{float: "left", background: "#eee", width: 200, minHeight: 300}}>광고 영역</div>
          <div style={{clear: "both"}}></div>
        </div>
      </div>
    )
  }
}