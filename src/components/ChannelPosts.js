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
    const termLink = `http://www.popit.kr/tag/${term.name}`;
    const postItems = posts.map((post, index) => {
      if (index > 2) {
        return null;
      }
      const marginRight = index < 2 ? 15 : 0;
      const showNext = index < 2 ? false : true;
      return (
        <div key={"channel-" + index} style={{float: "left", marginRight: marginRight}}>
          <Post post={post} showAuthor={true} showDescription={true} showNext={showNext}/>
        </div>
      );
    });

    return (
      <div>
        <div>
          <h2>
            <a className="author_title" href={termLink}>
              {term.name.toUpperCase()}
            </a>
          </h2>
          <div>{ postItems }</div>
          <div style={{clear: 'both'}}></div>
        </div>
      </div>
    )
  }
}