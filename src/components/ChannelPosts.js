import React from 'react';
import {Row, Col} from 'antd';

import Post from './Post';

export default class ChannelPosts extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { termPosts } = this.props;
    console.log(">>>>>>>>>termPosts>", termPosts);
    const posts = termPosts.posts;
    const term = termPosts.term;

    const postItems = [];

    posts.forEach((post, index) => {
      if (index > 2) {
        return null;
      }
      const marginRight = index < 2 ? 20 : 0;
      postItems.push(<div style={{float: "left", marginRight: marginRight}}><Post post={post} showAuthor={true}/></div>);
    });

    return (
      <div>
        <div>
          <h2>{term.name}</h2>
          <div>{ postItems }</div>
          <div style={{clear: 'both'}}></div>
        </div>
      </div>
    )
  }
}