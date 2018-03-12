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
    };
    this.page = 0;
  }
  componentDidMount() {
    this.getPosts();
  };

  getPosts = () => {
    this.page++;
    PostApi.getRecentPosts(this.page)
      .then(json => {
        if (json.success !== true) {
          alert("Error:" + json.message);
          return;
        }

        if (json.data.lenght == 0) {
          alert("마지막 글입니다.");
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
                handleNextButton={this.getPosts}
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