import React from 'react';
import { Link } from 'react-router-dom';

import Post from './Post';
import "../popit.css";
import PostApi from "../../services/PostApi";

const MAX_NUM_POSTS = 2;

export default class AuthorPosts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
    };
    this.useProps = true;
    this.initShownPosts = [];
    this.author = null;
    this.page = 0;

    this.getNextTagPost = this.getNextTagPost.bind(this);
    this.getPrevTagPost = this.getPrevTagPost.bind(this);
    this.getAuthorPosts = this.getAuthorPosts.bind(this);
  }

  getNextTagPost() {
    this.useProps = false;
    this.page++;
    this.getAuthorPosts();
  };

  getPrevTagPost() {
    this.page--;
    if (this.page === 0) {
      this.setState({
        posts: this.props.authorPosts.posts,
      });
    } else {
      this.getAuthorPosts();
    }
  };

  getAuthorPosts() {
    const excludePostIds = this.initShownPosts.map(post => post.id);

    PostApi.getPostsByAuthorId(this.author.id, excludePostIds, this.page, MAX_NUM_POSTS)
      .then(json => {
        if (json.success !== true) {
          alert("Error:" + json.message);
          return;
        }

        const posts = json.data.posts;
        if (posts.length == 0) {
          this.page--;
          alert("마지막 글 입니다.");
          return;
        }

        this.setState({
          posts: posts,
        });
      })
      .catch(error => {
        alert("Error:" + error);
      });
  };

  render() {
    const { authorPosts } = this.props;
    if (!authorPosts) {
      return (<div></div>);
    }
    this.author = authorPosts.author;

    const posts = this.useProps ? authorPosts.posts : this.state.posts;
    const authorPostsLink = `/author/${this.author.userLogin}`;

    const postItems = posts.map((post, index) => {
      if (index >= MAX_NUM_POSTS) {
        return null;
      }
      if (this.useProps) {
        this.initShownPosts.push(post);
      }
      const marginRight = index < (MAX_NUM_POSTS - 1) ? 15 : 0;
      const showNext = index >= (MAX_NUM_POSTS - 1);
      const showPrev = index == 0 && this.page > 0;
      return (
        <div key={"author-" + post.id} style={{float: "left", marginRight: marginRight}}>
          <Post post={post}
                showAuthor={true}
                showDescription={true}
                showNext={showNext}
                showPrev={showPrev}
                handleNextButton={this.getNextTagPost}
                handlePrevButton={this.getPrevTagPost}
          />
        </div>
      );
    });

    return (
      <div>
        <div>
          <span style={{display: 'inline-block'}}>
            <h2>
              <Link className="author_title"
                 to={authorPostsLink}>
                { this.author.displayName }
              </Link>
            </h2>
          </span>
          {
            this.author.userUrl
            ?
              (<span className="author_home"><a href={this.author.userUrl} target="_blank">{this.author.userUrl}</a></span>)
            :
              (<span></span>)
          }

          <div>{ postItems }</div>
          <div style={{clear: 'both'}}></div>
        </div>
      </div>
    )
  }
}