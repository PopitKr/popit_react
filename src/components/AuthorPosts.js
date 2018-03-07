import React from 'react';
import {Row, Col} from 'antd';

import Post from './Post';

export default class AuthorPosts extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { authorPosts } = this.props;
    console.log(">>>>>>>>>authorPosts>", authorPosts);
    const posts = authorPosts.posts;
    const author = authorPosts.author;

    const postItems = [];

    posts.forEach((post, index) => {
      if (index > 1) {
        return null;
      }
      const marginRight = index < 1 ? 20 : 0;
      postItems.push(<div style={{float: "left", marginRight: marginRight}}><Post post={post} showAuthor={true}/></div>);
    });

    return (
      <div>
        <div>
          <h2>{author.displayName}</h2>
          <div>{ postItems }</div>
          <div style={{clear: 'both'}}></div>
        </div>
      </div>
    )
  }
}