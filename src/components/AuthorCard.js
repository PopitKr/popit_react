import React from 'react';
import { Link } from 'react-router-dom';
import { PUBLIC_PATH } from "../routes";

export default class AuthorCard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { author, postDate } = this.props;
    const authorPostLink = `${PUBLIC_PATH}/author/${author.userLogin}`;

    return (
      <div className="author" style={{marginTop:5}}>
        <div style={{float: 'left', marginRight: 10}}>
          <Link to={authorPostLink}><img src={author.avatar} className="author_avatar"/></Link>
        </div>
        <div style={{float: 'left', marginRight: 10, fontSize: 13, marginTop: -3}}>
          <div style={{height: 18}}>
            <Link style={{color: "#888888", textDecoration: "none"}} to={authorPostLink}>{author.displayName}</Link>
          </div>
          <div style={{color: "#888888", height: 18}}>
            {postDate.substr(0, 10)}
          </div>
        </div>
        <div style={{clear: 'both'}}></div>
      </div>
    )
  }
}