import React from 'react';
import ShareButton from '../ShareButton';
import { Link } from 'react-router-dom';
import AuthorCard from '../AuthorCard';

import '../popit.css';

import defaultCover1 from '../../asset/default_cover1.jpg';
import defaultCover2 from '../../asset/default_cover2.jpg';
import defaultCover3 from '../../asset/default_cover3.jpg';
import PostApi from "../../services/PostApi";
import {PUBLIC_PATH} from "../../routes";

export default class PostCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      avatar: "",
    };

    this.useFacebookLikeHttp = this.useFacebookLikeHttp.bind(this);
  }

  useFacebookLikeHttp(post) {
    console.log("post:", post.id, " ==> ", post.title);
    if (post.metas) {
      let metaValues = post.metas.filter(meta => {
        return meta.name === "facebook.like.http"
      });
      if (metaValues.length > 0) {
        return metaValues[0].value === "true";
      }
    }
    return false;
  };

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
    const { post, index } = this.props;

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

    const coverImage = post.image ? post.image : this.getDefaultImage(post.id);
    const postUrl = `https://www.popit.kr/${post.postName}/`;
    const postLink = `${PUBLIC_PATH}/${post.postName}/`;
    const fbLikeUrl = PostApi.getFacebookShareLink(post);

    let shareButton = (<div></div>);
    if (process.env.BROWSER) {
      shareButton = (<ShareButton post_id={post.id} url={postUrl} title={post.title} fbLikeUrl={fbLikeUrl} />)
    }

    const marginTop = index === 0 ? 0 : 30;

    return (
      <div className="post_card" style={{marginTop: marginTop}}>
        <div>
          <div style={{float: 'left'}}>
            <a href={postLink}><img src={coverImage} style={{width: 250, height: 170, borderRadius: '5%', background: '#F3F3F3'}}/></a>
          </div>
          <div style={{float: 'left', marginLeft: 15, maxWidth: 630}}>
            <div>
              <a href={postLink}><h3 className="post_card_title">{post.title}</h3></a>
            </div>
            <div style={{marginTop: 0}}>
              <div style={{float: 'left'}}>
                {shareButton}
              </div>
              <div style={{float: 'right', color: '#888888', fontSize: 14}}>
                {
                  this.props.showAuthor === true ? "" : post.date.substr(0, 10)
                }
              </div>
              <div style={{clear: 'both'}}/>
            </div>
            {
              this.props.showAuthor === true
                ?
                (<AuthorCard author={post.author} postDate={post.date}/>)
                :
                (<div></div>)
            }
            <div className="post_tag">{categories}{separator}{tags}</div>
            <div className="post_card_description">
              {post.socialDesc + "..."}
              </div>
          </div>
          <div style={{clear: 'both'}}/>
        </div>
      </div>
    );
  }
}