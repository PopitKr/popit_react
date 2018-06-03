import React from 'react';
import { Modal, Button } from 'antd';
import PostApi from "../../services/PostApi";
import decodeHtml from "decode-html";
import PostCard from '../list/PostCard';
import { withCookies, Cookies } from 'react-cookie';

const cookies = new Cookies();

export default class NoticeModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      noticePost: null,
      noticeDesc: null,
    };

    this.handleOk = this.handleOk.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.getPost = this.getPost.bind(this);
  }

  static getDerivedStateFromProps(props, state) {
    if (props.noticePostId !== state.noticePostId) {
      return {
        noticePostId: props.noticePostId,
        noticeDesc: props.noticeDesc,
        noticePost: null,
      }
    }

    return null;
  }

  componentDidMount() {
    if (!this.state.noticePostId) {
      this.getPost();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.noticePost === null) {
      this.getPost();
    }
  }

  getPost() {
    if (this.props.noticePostId) {
      PostApi.getPostById(this.props.noticePostId)
        .then(json => {
          if (json.success !== true) {
            alert("Error:" + json.message);
            return;
          }
          if (json.data) {
            setTimeout(() => {
              this.setState({
                visible: true,
                noticePost: json.data
              })
            }, 5000);

          }
        })
        .catch(error => {
          console.log("Notice Error:" + error);
        });
    }
  };

  handleOk(e){
    this.setState({
      visible: false,
    });
    const expireDate = new Date();
    expireDate.setDate(expireDate.getDate() + 365);
    cookies.set("not_open_notice_" + this.state.noticePost.id, "true", {path: '/', maxAge: 60 * 60 * 24 * 365})
  };

  handleCancel(e) {
    this.setState({
      visible: false,
    });
  };

  render() {
    const { visible, noticePost, noticeDesc } = this.state;
    let cookieDoNotOpen = noticePost ? cookies.get("not_open_notice_" + this.state.noticePost.id) === "true" : false;

    const postCard =
      noticePost ? ( <PostCard key={noticePost.id}
                        post={noticePost}
                        index={1}
                        showAuthor={false}
                        showHighlight={false} />)
        : (<div>No data</div>);

    return (
      <div>
        <Modal
          title="오늘의 추천글"
          width={940}
          visible={visible && !cookieDoNotOpen}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button key="close" onClick={this.handleCancel}>닫기</Button>,
            <Button key="save" type="primary" onClick={this.handleOk}>이 추천글 안보기</Button>
          ]}
        >
          <div>
            <div>
              {noticeDesc ? (<h3>{noticeDesc}</h3>) : null}
              {postCard}
            </div>
          </div>
        </Modal>
      </div>
    )
  }
}