import React from 'react';
import {Row, Col} from 'antd';

import Post from './Post';

export default class ChannelPosts extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { termPosts } = this.props;
    const posts = termPosts.posts;
    const term = termPosts.term;

    const postItems = posts.map((post, index) => {
      if (index > 2) {
        return null;
      }
      // const marginRight = index < 2 ? 20 : 0;
      return (<div key={"channel-" + index} style={{float: "left", marginRight: 20}}><Post post={post} showAuthor={true} showDescription={true}/></div>);
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