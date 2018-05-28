import React from 'react';
import { Icon, Button } from 'antd';
import ShareButton from '../ShareButton';
import AuthorCard from '../AuthorCard';
import decodeHtml from 'decode-html';

import { Link } from 'react-router-dom';
import { PUBLIC_PATH } from "../../routes";
import '../popit.css';

import defaultCover1 from '../../asset/default_cover1.jpg';
import defaultCover2 from '../../asset/default_cover2.jpg';
import defaultCover3 from '../../asset/default_cover3.jpg';
import PostApi from "../../services/PostApi";

export default class Post extends React.Component {
  constructor(props) {
    super(props);

    //console.log("Post created:", this.props.post.title);
    this.state = {
      avatar: "",
    };
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

  //get facebook like ==> https://www.facebook.com/v2.11/plugins/like.php?app_id=0&channel=http://staticxx.facebook.com/connect/xd_arbiter/r/Nh1oH0K63yz.js?version=42
  render() {
    const { post } = this.props;

    const categories = post.categories.map((category, index) => {
      const delimiter = index === 0 ? "" : ",";
      return (<span key={"categories-" + index}>{delimiter} <Link to={`${PUBLIC_PATH}/category/${category.slug}`}>{category.name}</Link></span>)
    });

    const tags = post.tags.map((tag, index) => {
      if (index > 2) {
        return null;
      }
      const delimiter = index === 0 ? "" : ",";
      return (<span key={"tags-" + index}>{delimiter} <Link to={`${PUBLIC_PATH}/tag/${tag.slug}`}>{tag.name}</Link></span>)
    });

    const separator = tags.length > 0 ? " | " : "";

    let coverImage = post.mediumImage ? post.mediumImage : post.image;
    coverImage = coverImage ? coverImage : this.getDefaultImage(post.id);

    const postUrl = `https://www.popit.kr/${post.postName}/`;
    const postLink = `${PUBLIC_PATH}/${post.postName}/`;
    const fbLikeUrl = PostApi.getFacebookShareLink(post);

    return (
      <div className="post" style={{position: 'relative'}}>
        <div>
          <a href={postLink}><img src={coverImage} style={{width: 230, height: 130}}/></a>
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
          <a href={postLink}><h3 className="post_title">{decodeHtml(post.title)}</h3></a>
        </div>
        <div style={{marginTop: 5}}>
	        <ShareButton post_id={post.id} url={postUrl} title={post.title} fbLikeUrl={fbLikeUrl} />
        </div>
        {
          this.props.showAuthor === true
            ?
            (<AuthorCard author={post.author} postDate={post.date}/>)
            :
            (null)
        }
        <div className="post_tag">{categories}{separator}{tags}</div>

        {
          this.props.showDescription === true
          ?
            (
              <div>
                <div className="post_description"><div dangerouslySetInnerHTML={{ __html: post.socialDesc }} /></div>
                { (this.props.showDescriptionLink === true) ? (<div className={"post_description_link"}><a href={postLink}>[...]</a></div>) : (<div></div>) }
                </div>
            )
          :
            (null)
        }
      </div>
    );
  }
}
