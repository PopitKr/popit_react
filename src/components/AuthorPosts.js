import React from 'react';
import {Row, Col} from 'antd';

import Post from './Post';
import "./popit.css";

export default class AuthorPosts extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { authorPosts } = this.props;
    const posts = authorPosts.posts;
    const author = authorPosts.author;

    const postItems = [];

    posts.forEach((post, index) => {
      if (index > 1) {
        return null;
      }
      const marginRight = index < 1 ? 20 : 0;
      postItems.push(<div key={"author-" + index} style={{float: "left", marginRight: marginRight}}><Post post={post} showAuthor={true} showDescription={true}/></div>);
    });

    const authorStyle = {
      color: "#111111",
      textDecoration: "none",
      outline: "none",
      fontWeight: "bold",
    };

    return (
      <div>
        <div>
          <h2>
            <a style={authorStyle}
               href={`http://www.popit.kr/author/${author.userLogin}`}
               target="_blank">
              {author.displayName}
            </a>
          </h2>
          <div>{ postItems }</div>
          <div style={{clear: 'both'}}></div>
        </div>
      </div>
    )
  }
}