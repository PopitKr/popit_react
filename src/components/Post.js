import React from 'react';
import { FacebookButton, LinkedinButton, TwitterTweetButton } from 'react-social-sharebuttons';
import { Icon, Button } from 'antd';

import './popit.css';

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
    const { post } = this.props;

    const categories = post.categories.map((category, index) => {
      const delimiter = index === 0 ? "" : ",";
      return (<span key={"categories-" + index}>{delimiter} <a href={`http://www.popit.kr/${category.slug}`}>{category.name}</a></span>)
    });

    const tags = post.tags.map((tag, index) => {
      if (index > 2) {
        return null;
      }
      const delimiter = index === 0 ? "" : ",";
      return (<span key={"tags-" + index}>{delimiter} <a href={`http://www.popit.kr/${tag.slug}`}>{tag.name}</a></span>)
    });

    //http://dapperdeveloper.com/2015/01/23/creating-custom-social-share-buttons/
    const separator = tags.length > 0 ? " | " : "";
    const coverImage = post.image ? post.image : defaultCover;
    const postUrl = `http://www.popit.kr/${post.postName}/`;
    const authorPostLink = `http://www.popit.kr/author/${post.author.userLogin}`;

    return (
      <div className="post" style={{position: 'relative'}}>
        <div>
          <a href={postUrl}><img src={coverImage} style={{width: 210, height: 120}}/></a>
        </div>
        {
          this.props.showNext === true
            ?
            (
              <div style={{position: 'absolute', top: 40, left: 190}}>
                <Button shape="circle"
                        icon="right"
                        onClick={this.props.handleNextButton}
                        // style={{ color: '#F0F0F0'}}
                />
              </div>
            )
            :
            (<div></div>)
        }
        <div>
          <a href={postUrl}><h3 className="post_title">{post.title}</h3></a>
        </div>
        <div style={{marginTop: 5}}>
          <FacebookButton url={postUrl} layout="button_count" action="like" share={true}/>
        </div>
        {
          this.props.showAuthor === true
            ?
            (
              <div className="author" style={{marginTop:5}}>
                <div style={{float: 'left', marginRight: 10}}>
                  <a href={authorPostLink}><img src={post.author.avatar} className="author_avatar"/></a>
                </div>
                <div style={{float: 'left', marginRight: 10, fontSize: 12}}>
                  <div>
                    <a style={{textDecoration: "none"}} href={authorPostLink} target="_blank">{post.author.displayName}</a>
                  </div>
                  <div style={{color: "#CCCCCC"}}>
                    {post.date.substr(0, 10)}
                  </div>
                </div>
                <div style={{clear: 'both'}}></div>
              </div>
            )
            :
            (<div></div>)
        }
        <div className="post_tag">{categories}{separator}{tags}</div>

        {
          this.props.showDescription === true
          ?
            (
              <div>
                <div className="post_description">{post.socialDesc}</div>
                { (this.props.showDescriptionLink === true) ? (<div className={"post_description_link"}><a href={postUrl} target="_blank">[...]</a></div>) : (<div></div>) }
                </div>
            )
          :
            (<div></div>)
        }
      </div>
    );
  }
}