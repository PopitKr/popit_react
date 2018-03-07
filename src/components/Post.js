import React from 'react';
import gravatar from 'gravatar-api';

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
      fontSize: 10,
    };

    const authorStyle = {
      color: "#CCCCCC",
      textDecoration: "none",
      outline: "none",
      fontSize: 12,
    };

    const { post } = this.props;

    const categories = post.categories.map((category, index) => {
      const delimiter = index === 0 ? "" : ",";
      return (<span>{delimiter} <a style={tagStyle} href={`http://www.popit.kr/${category.slug}`}>{category.name}</a></span>)
    });

    const tags = post.tags.map((tag, index) => {
      if (index > 3) {
        return null;
      }
      const delimiter = index === 0 ? "" : ",";
      return (<span>{delimiter} <a style={tagStyle} href={`http://www.popit.kr/${tag.slug}`}>{tag.name}</a></span>)
    });

    const separator = tags.length > 0 ? " | " : "";
    const avatar = gravatar.imageUrl({email: 'babokim@gmail.com'});

    console.log(">>>avatar>", avatar);
    const coverImage = post.image ? post.image : defaultCover;
    return (
      <div className="post">
        <div><img src={coverImage} style={{width: 210, height: 120}}/></div>
        <div><h3 style={{fontSize:14, fontWeight: 'bold'}}>{post.title}</h3></div>
        {
          this.props.showAuthor === true
            ?
            (<div><img src={avatar} className="author_avatar"/> <a style={authorStyle}
                                                                href={`http://www.popit.kr/author/${post.author.userLogin}`}
                                                                target="_blank">{post.author.displayName}</a></div>)
            :
            (<div></div>)
        }
        <div style={tagStyle}>{categories}{separator}{tags}</div>
      </div>
    );
  }
}