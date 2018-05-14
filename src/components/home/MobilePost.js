import React from 'react';
import { Icon, Button, Row, Col } from 'antd';
import ShareButton from '../ShareButton';
import { Link } from 'react-router-dom';
import { PUBLIC_PATH } from "../../routes";

import '../popit.css';

import defaultCover1 from '../../asset/default_cover1.jpg';
import defaultCover2 from '../../asset/default_cover2.jpg';
import defaultCover3 from '../../asset/default_cover3.jpg';
import PostApi from "../../services/PostApi";

export default class MobilePost extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      avatar: "",
    }
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

  render() {
    const { post, isAfterAd } = this.props;

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
    const authorPostLink = `${PUBLIC_PATH}/author/${post.author.userLogin}`;

    const marginTop = this.props.index === 0 ? 0: 20;
    return (
      <div style={{marginTop: marginTop, padding: "10px", background: '#ffffff', borderRadius: 10}}>
        <Row>
          <Col span={24}>
            <Link to={postLink}><h3 className="post_title_mobile">{post.title}</h3></Link>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <div style={{marginTop: 10}}><Link to={postLink}><img style={{width: '100%', height: 200}} src={coverImage}/></Link></div>
          </Col>
        </Row>
        <Row>
          <Col span={10}>
            <div className="author" style={{marginTop: 10}}>
              <div style={{float: 'left', marginRight: 10}}>
                <a href={authorPostLink}><img src={post.author.avatar} className="author_avatar"/></a>
              </div>
              <div style={{float: 'left', marginRight: 10, fontSize: 13}}>
                <div style={{lineHeight: '18px'}}>
                  <Link to={authorPostLink}>{post.author.displayName}</Link>
                </div>
                <div style={{color: "#888888"}}>
                  {post.date.substr(0, 10)}
                </div>
              </div>
              <div style={{clear: 'both'}}></div>
            </div>
          </Col>
          <Col span={14}>
            <div style={{marginTop: 25}}>
              <ShareButton post_id={post.id} url={postUrl} title={post.title} fbLikeUrl={fbLikeUrl}/>
            </div>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <div className="post_tag" style={{marginTop: 10}}>{categories}{separator}{tags}</div>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <div className="post_description_link" style={{marginTop: 10}}><Link to={postLink}><div dangerouslySetInnerHTML={{ __html: post.socialDesc }} /></Link></div>
          </Col>
        </Row>
      </div>
    );
  }
}