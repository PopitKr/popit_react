import React from 'react';
import { Icon, Button } from 'antd';
import ShareButton from './ShareButton';
import './popit.css';

import defaultCover1 from '../asset/default_cover1.jpg';
import defaultCover2 from '../asset/default_cover2.jpg';
import defaultCover3 from '../asset/default_cover3.jpg';

export default class Post extends React.Component {
  constructor(props) {
    super(props);

    //console.log("Post created:", this.props.post.title);
    this.state = {
      avatar: "",
    }
  }

  getDefaultImage = () => {
    const randVal = Math.floor(Math.random() * 3) + 1;
    if (randVal == 1) {
      return defaultCover1;
    } else if (randVal == 2) {
      return defaultCover2;
    } else {
      return defaultCover3;
    }
  };

  //get facebook like ==> https://www.facebook.com/v2.11/plugins/like.php?app_id=0&channel=http://staticxx.facebook.com/connect/xd_arbiter/r/Nh1oH0K63yz.js?version=42
  render() {
    const { post } = this.props;

    const categories = post.categories.map((category, index) => {
      const delimiter = index === 0 ? "" : ",";
      return (<span key={"categories-" + index}>{delimiter} <a href={`http://www.popit.kr/category/${category.slug}`}>{category.name}</a></span>)
    });

    const tags = post.tags.map((tag, index) => {
      if (index > 2) {
        return null;
      }
      const delimiter = index === 0 ? "" : ",";
      return (<span key={"tags-" + index}>{delimiter} <a href={`http://www.popit.kr/tag/${tag.slug}`}>{tag.name}</a></span>)
    });

    const separator = tags.length > 0 ? " | " : "";

    const coverImage = post.image ? post.image : this.getDefaultImage();
    const postUrl = `http://www.popit.kr/${post.postName}/`;
    const authorPostLink = `http://www.popit.kr/author/${post.author.userLogin}`;

    return (
      <div className="post" style={{position: 'relative'}}>
        <div>
          <a href={postUrl}><img src={coverImage} style={{width: 230, height: 130}}/></a>
        </div>
        {
          this.props.showNext === true
            ?
            (
              <div style={{position: 'absolute', top: 45, left: 210}}>
                <Button shape="circle"
                        icon="right"
                        size="large"
                        onClick={this.props.handleNextButton}
                        // style={{ color: '#F0F0F0'}}
                />
              </div>
            )
            :
            (<div></div>)
        }

        {
          this.props.showPrev === true
            ?
            (
              <div style={{position: 'absolute', top: 45, left: -20}}>
                <Button shape="circle"
                        icon="left"
                        size="large"
                        onClick={this.props.handlePrevButton}
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
          <ShareButton url={postUrl} title={post.title}/>
        </div>
        {
          this.props.showAuthor === true
            ?
            (
              <div className="author" style={{marginTop:5}}>
                <div style={{float: 'left', marginRight: 10}}>
                  <a href={authorPostLink}><img src={post.author.avatar} className="author_avatar"/></a>
                </div>
                <div style={{float: 'left', marginRight: 10, fontSize: 13}}>
                  <div>
                    <a style={{textDecoration: "none"}} href={authorPostLink} target="_blank">{post.author.displayName}</a>
                  </div>
                  <div style={{color: "#888888"}}>
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