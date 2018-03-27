import React from 'react';
import { Icon, Button, Row, Col } from 'antd';
import ShareButton from './ShareButton';
import './popit.css';

import defaultCover1 from '../asset/default_cover1.jpg';
import defaultCover2 from '../asset/default_cover2.jpg';
import defaultCover3 from '../asset/default_cover3.jpg';

export default class MobilePost extends React.Component {
  constructor(props) {
    super(props);

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

  render() {
    const { post, isAfterAd } = this.props;

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

    const marginTop = this.props.index === 0 ? 0: 20;
    return (
      <div style={{marginTop: marginTop, padding: "10px", background: '#ffffff', borderRadius: 10}}>
        <Row>
          <Col span={24}>
            <a href={postUrl}><h3 className="post_title_mobile">{post.title}</h3></a>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <div style={{marginTop: 10}}><a href={postUrl}><img style={{width: '100%', height: 200}} src={coverImage}/></a></div>
          </Col>
        </Row>
        <Row>
          <Col span={10}>
            <div className="author" style={{marginTop: 10}}>
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
          </Col>
          <Col span={14}>
            <div style={{marginTop: 25}}>
              <ShareButton url={postUrl} title={post.title}/>
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
            <div className="post_description_link" style={{marginTop: 10}}><a href={postUrl}>{post.socialDesc}</a></div>
          </Col>
        </Row>
      </div>
    );
  }
}