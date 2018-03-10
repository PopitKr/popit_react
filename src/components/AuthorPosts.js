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
    const authorPostsLink = `http://www.popit.kr/author/${author.userLogin}`;
    const postItems = posts.map((post, index) => {
      if (index > 1) {
        return null;
      }
      const marginRight = index < 1 ? 15 : 0;
      return (
        <div key={"author-" + index} style={{float: "left", marginRight: marginRight}}>
          <Post post={post} showAuthor={true} showDescription={true}/>
        </div>
      );
    });

    return (
      <div>
        <div>
          <span style={{display: 'inline-block'}}>
            <h2>
              <a className="author_title"
                 href={authorPostsLink}>
                {author.displayName}
              </a>
            </h2>
          </span>
          {
            author.userUrl
            ?
              (<span className="author_home"><a href={author.userUrl} target="_blank">{author.userUrl}</a></span>)
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