import React from 'react';
import { FacebookButton, LinkedinButton, TwitterTweetButton } from 'react-social-sharebuttons';

// import {
//   FacebookShareCount,
//   FacebookShareButton,
//   LinkedinShareCount,
//   TwitterShareButton
// } from 'react-share';
//
// import {
//   FacebookIcon,
//   TwitterIcon,
//   LinkedinIcon
// } from 'react-share';

import defaultCover from '../asset/default_cover.jpg';

export default class Post extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      avatar: "",
    }
  }

  //get facebook like ==> https://www.facebook.com/v2.11/plugins/like.php?app_id=0&channel=http://staticxx.facebook.com/connect/xd_arbiter/r/Nh1oH0K63yz.js?version=42
  render() {
    const tagStyle = {
      color: "#C3C3C3",
      textDecoration: "none",
      outline: "none",
      fontSize: "12px",
      lineHeight: "15px",
      marginTop: "5px",
    };

    const authorStyle = {
      color: "#CCCCCC",
      outline: "none",
      fontSize: "12px",
      lineHeight: "15px",
      wordWarp: "break-word",
    };

    const { post } = this.props;

    const categories = post.categories.map((category, index) => {
      const delimiter = index === 0 ? "" : ",";
      return (<span key={"categories-" + index}>{delimiter} <a style={tagStyle} href={`http://www.popit.kr/${category.slug}`}>{category.name}</a></span>)
    });

    const tags = post.tags.map((tag, index) => {
      if (index > 2) {
        return null;
      }
      const delimiter = index === 0 ? "" : ",";
      return (<span key={"tags-" + index}>{delimiter} <a style={tagStyle} href={`http://www.popit.kr/${tag.slug}`}>{tag.name}</a></span>)
    });

    //http://dapperdeveloper.com/2015/01/23/creating-custom-social-share-buttons/
    const separator = tags.length > 0 ? " | " : "";
    const coverImage = post.image ? post.image : defaultCover;
    const postUrl = "http://www.popit.kr/" + post.postName + "/";
    const encodedUrl = encodeURIComponent(postUrl);
    return (
      <div className="post">
        <div><h3 style={{fontSize: "14px", lineHeight: "18px", fontWeight: 'bold'}}>{post.title}</h3></div>
        <div>
          <img src={coverImage} style={{width: 210, height: 120, marginTop: 5}}/>
        </div>
        <div style={{marginTop: 5}}>
          <FacebookButton url={postUrl} layout="button_count" action="like" share={true}/>
        </div>
        {
          this.props.showAuthor === true
            ?
            (
              <div style={{marginTop:5}}>
                <p style={{marginRight: 10}}><img src={post.author.avatar} className="author_avatar"/></p>
                <span style={authorStyle}>
                  <a style={{textDecoration: "none"}} href={`http://www.popit.kr/author/${post.author.userLogin}`} target="_blank">{post.author.displayName}</a>
                </span>
                <span style={authorStyle}>{post.date.substr(0, 10)}</span>
              </div>
            )
            :
            (<div></div>)
        }
        <div style={tagStyle}>{categories}{separator}{tags}</div>

        {
          this.props.showDescription === true
          ?
            (<div style={{wordBreak: "break-all", fontSize: "14px", lineHeight: "17px", marginTop: 5}}>{post.socialDesc}</div>)
          :
            (<div></div>)
        }
      </div>
    );
  }
}