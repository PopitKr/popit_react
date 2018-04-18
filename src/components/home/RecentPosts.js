import React from 'react';
import Post from './Post';
import PostApi from '../../services/PostApi';

import '../popit.css';

const MAX_NUM_POSTS = 4;

export default class RecentPosts extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
    };
    this.page = 0;
    this.getPrevPosts = this.getPrevPosts.bind(this);
    this.getNextPosts = this.getNextPosts.bind(this);
    this.getPosts = this.getPosts.bind(this);
  }
  componentDidMount() {
    this.getNextPosts();
  };

  getPrevPosts() {
    if (this.page == 1) {
      return;
    }
    this.page--;
    this.getPosts()
  };

  getNextPosts() {
    this.page++;
    this.getPosts()
  };

  getPosts() {
    PostApi.getRecentPosts(this.page, MAX_NUM_POSTS)
      .then(json => {
        if (json.success !== true) {
          alert("Error:" + json.message);
          return;
        }

        if (json.data.lenght == 0) {
          this.page--;
          alert("마지막 글 입니다.");
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
      if (index >= MAX_NUM_POSTS) {
        return null;
      }
      const marginRight = index < (MAX_NUM_POSTS - 1) ? 25 : 10;
      const showNext = index >= (MAX_NUM_POSTS - 1);
      const showPrev = this.page > 1 && index == 0;
      return(
        <div key={"recent-" + post.id} style={{float: "left", marginRight: marginRight}}>
          <Post post={post}
                showAuthor={true}
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
        <h2 className="author_title">최신글</h2>
        <div>{ postItems }</div>
        <div style={{clear: "both"}}></div>
      </div>
    )
  }
}