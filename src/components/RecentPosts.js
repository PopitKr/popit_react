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
      if (index >= 5) {
        return null;
      }
      const marginRight = index < 4 ? 15 : 0;
      // const marginRight = 15;
      const showNext = index < 4 ? false : true;
      return(
        <div key={index} style={{float: "left", marginRight: marginRight}}>
          <Post key={"recent-" + post.id}
                post={post} showAuthor={true}
                showDescription={true}
                showDescriptionLink={true}
                showNext={showNext}
          />
        </div>
      );
    });

    return (
      <div>
        <div>
          <div>{ postItems }</div>
          <div style={{clear: "both"}}></div>
        </div>
      </div>
    )
  }
}