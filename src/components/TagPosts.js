import React from 'react';
import {Row, Col} from 'antd';

import Post from './Post';
import PostApi from "../services/PostApi";

export default class TagPosts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
    };
    this.useProps = true;
    this.initShownPosts = [];
    this.term = null;
    this.page = 0;
  }

  getNextTagPost = () => {
    this.useProps = false;
    this.page += 1;

    const excludePostIds = this.initShownPosts.map(post => post.id);

    PostApi.getPostsByTag(this.term.id, excludePostIds, this.page)
      .then(json => {
        if (json.success !== true) {
          alert("Error:" + json.message);
          return;
        }

        const posts = json.data;
        if (posts.length == 0) {
          alert("마지막 페이지 입니다.");
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
    const { termPosts } = this.props;
    if (!termPosts) {
      return (<div></div>);
    }

    this.term = termPosts.term;

    const posts = this.useProps ? termPosts.posts : this.state.posts;
    const termLink = `http://www.popit.kr/tag/${this.term.name}`;

    const postItems = posts.map((post, index) => {
      if (index > 2) {
        return null;
      }
      if (this.useProps) {
        this.initShownPosts.push(post);
      }
      const marginRight = index < 2 ? 15 : 0;
      const showNext = index < 2 ? false : true;
      return (
        <div key={"channel-" + index} style={{float: "left", marginRight: marginRight}}>
          <Post post={post} showAuthor={true} showDescription={true} showNext={showNext} handleNextButton={this.getNextTagPost}/>
        </div>
      );
    });
    return (
      <div>
        <div>
          <h2>
            <a className="author_title" href={termLink}>
              {this.term.name.toUpperCase()}
            </a>
          </h2>
          <div>{ postItems }</div>
          <div style={{clear: 'both'}}></div>
        </div>
      </div>
    )
  }
}