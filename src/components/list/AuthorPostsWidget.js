import React from 'react';
import PostApi from "../../services/PostApi";
import { Layout } from 'antd';

import defaultCover1 from '../../asset/default_cover1.jpg';
import defaultCover2 from '../../asset/default_cover2.jpg';
import defaultCover3 from '../../asset/default_cover3.jpg';
import {PUBLIC_PATH} from "../../routes";

import '../popit.css';

const { Content } = Layout;

const MAX_NUM_POSTS = 5;

export default class AuthorPostsWidget extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
      errorMessage: "",
    };
    this.getAuthorPosts = this.getAuthorPosts.bind(this);
  }

  getDefaultImage(id) {
    if (id % 3 == 0) {
      return defaultCover1;
    } else if (id % 3 == 1) {
      return defaultCover2;
    } else {
      return defaultCover3;
    }
  };

  componentDidMount () {
    this.getAuthorPosts()
  }

  getAuthorPosts() {
    const exceptPosts = (this.props.except) ? [this.props.except] : [];

    PostApi.getPostsByAuthor(this.props.author.userLogin, exceptPosts, 1, MAX_NUM_POSTS)
      .then(json => {
        if (json.success !== true) {
          this.setState({
            errorMessage: json.message,
            posts: [],
          });
          return;
        }

        this.setState({
          posts: json.data.posts,
        });
      })
      .catch(error => {
        this.errorMessage = error;
      });
  };

  render() {
    const { posts, errorMessage } = this.state;
    if (errorMessage) {
      return (<div style={{background: '#f6f7f9',   border: '1px solid #e9ebee'}}>{errorMessage}</div>)
    }
    const authorPostLink = `${PUBLIC_PATH}/author/${this.props.author.userLogin}`;

    const titleStyle = {
      float: 'left',
      color: '#525252',
      fontSize: 14,
      lineHeight: '16px',
      maxHeight: 50,
      maxWidth: 185,
      marginLeft: 10,

      fontWeight: 'bold',
      textOverflow: 'ellipsis',
      wordWrap: 'break-word',
    };
    const postComponents = posts.map((post, index) => {
      const postLink = `${PUBLIC_PATH}/${post.postName}/`;
      const coverImage = post.image ? post.image : this.getDefaultImage(post.id);
      const marginTop = index == 0 ? 0 : 10;
      return (
        <div key={index} style={{marginTop: marginTop}}>
          <a href={postLink}>
            <div style={{float: 'left'}}>
              <img src={coverImage} style={{width: 90, height: 50, borderRadius: '5%'}}/>
            </div>
            <div style={titleStyle}>
              {post.title}
            </div>
            <div style={{clear: 'both'}}/>
          </a>
          <div style={{marginTop: 10, borderBottom: '1px solid #e9ebee'}}/>
        </div>
      )
    });
    return (
      <div style={{width: 300, border: '1px solid #e9ebee', display: 'inline-block'}}>
        <div style={{textAlign: 'center', background: '#e9ebee'}}>
          <h4 style={{padding: 5}}><a style={{color: '#333333'}} href={authorPostLink}>{this.props.author.displayName} 님의 다른 글</a></h4>
        </div>
        <div style={{padding: 5}}>
          { postComponents }
        </div>
        <div style={{textAlign: 'center'}}>
          <h4><a style={{color: '#333333'}} href={authorPostLink}>더 보기</a></h4>
        </div>
      </div>
    )
  }
}
