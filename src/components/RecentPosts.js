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
    this.getNextPosts();
  };

  getPrevPosts = () => {
    if (this.page == 1) {
      return;
    }
    this.page--;
    this.getPosts()
  };

  getNextPosts = () => {
    this.page++;
    this.getPosts()
  };

  getPosts = () => {
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
      const showNext = index >= 4;
      const showPrev = this.page > 1 && index == 0;
      return(
        <div key={index} style={{float: "left", marginRight: marginRight}}>
          <Post key={"recent-" + post.id}
                post={post} showAuthor={true}
                showDescription={true}
                showDescriptionLink={true}
                showNext={showNext}
                showPrev={showPrev}
                handleNextButton={this.getNextPosts}
                handlePrevButton={this.getPrevPosts}
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