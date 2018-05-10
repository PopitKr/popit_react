import React from 'react';
import PostApi from "../../services/PostApi";
import { Layout } from 'antd';
import ShareButton from '../ShareButton';
import FBComment from '../FBComment';
import PopitHeader from "../PopitHeader";
import PopitMobileHeader from "../PopitMobileHeader";
import PopitMobileSider from "../PopitMobileSider";
import PopitFooter from "../PopitFooter";
import { renderToString } from "react-dom/server";
import decodeHtml from 'decode-html';
import AuthorCard from '../AuthorCard';
import GoogleAd from '../GoogleAd';

import {
  PostElement, EmbeddedElement, ParagraphElement,
  CaptionImageElement, SourceCodeElement, ItemsElement, BlockQuoteElement } from './PostElement';

import '../popit.css';

const { Content, Footer } = Layout;

export default class SinglePostPage extends React.Component {
  constructor(props) {
    super(props);

    let post;
    if (process.env.BROWSER) {
      if (window.__INITIAL_DATA__) {
        post = window.__INITIAL_DATA__.data;
      }
      delete window.__INITIAL_DATA__;
    } else {
      post = this.props.staticContext.data.data;
    }
    this.state = {
      post: post,
      googleAds: null,
    };
    this.page = 0;
    this.getPostByPermalink = this.getPostByPermalink.bind(this);
    this.newPostElement = this.newPostElement.bind(this);
  }

  newPostElement(line) {
    if (line.indexOf('[embed]') >= 0) {
      return new EmbeddedElement(line);
    } else if (line.indexOf("[caption") === 0) {
      return new CaptionImageElement(line);
    } else if (line.indexOf("<pre class=\"lang") >= 0) {
      return new SourceCodeElement(line);
    } else if (line.indexOf("<ul") >= 0) {
      return new ItemsElement(line);
    } else if (line.indexOf("<blockquote") >=0 && line.indexOf("</blockquote>") < 0) {
      return new BlockQuoteElement(line);
    } else {
      return new ParagraphElement(line);
    }
  }

  componentDidMount () {
    if (!this.state.post) {
      this.getPostByPermalink(this.props.match.params.permalink)
    }

    if (!this.state.googleAds) {
      PostApi.getGoogleAds('post.desktop')
        .then(json => {
          if (json.success !== true) {
            console.log("Google Ad Error:" + json.message);
            return;
          }
          this.setState({
            googleAds: json.data,
          });
        })
        .catch(error => {
          console.log("Google Ad Error:" + error);
        });
    }
  }

  getPostByPermalink(permalink) {
    PostApi.getPostByPermalink(permalink)
      .then(json => {
        if (json.success !== true) {
          alert("Error:" + json.message);
          return;
        }
        this.setState({
          post: json.data,
        });
      })
      .catch(error => {
        alert("Error:" + error);
      });
  };

  render() {
    const { post, googleAds } = this.state;

    const ads = [];
    if (googleAds) {
      if (googleAds["ad.post.desktop.top"]) ads.push(
        (<GoogleAd googleAd={googleAds["ad.post.desktop.top"].value} key={'ad_google_top'}></GoogleAd>)
      );
      if (googleAds["ad.post.desktop.middle"]) ads.push(
        (<GoogleAd googleAd={googleAds["ad.post.desktop.middle"].value} key={'ad_google_middle'}></GoogleAd>)
      );
      if (googleAds["ad.post.desktop.bottom"]) ads.push(
        (<GoogleAd googleAd={googleAds["ad.post.desktop.bottom"].value} key={'ad_google_bottom'}></GoogleAd>)
      );
    }

    if (!post) {
      return (<div style={{textAlign: 'center', marginTop: 20}}>Loading...</div>);
    }
    const sentences = post.content.split("\n");

    let postElement = null;
    let postElements = [];

    for (let i = 0; i < sentences.length; i++) {
      let eachSentence = "";
      try {
        eachSentence = decodeURIComponent(sentences[i]);
      } catch(e) {
        eachSentence = sentences[i];
      }

      eachSentence = eachSentence.replace('\n', '').replace('\r', '');

      if (eachSentence.toString().trim().length == 0 || eachSentence === '&nbsp;') {
        continue;
      }

      if (postElement == null) {
        postElement = this.newPostElement(eachSentence);
      } else {
        if (postElement.needNextLine()) {
          postElement.addNextLine(eachSentence);
        }
      }

      if (postElement.isFinished()) {
        postElements.push(postElement);
        postElement = null;
      }
    }

    if (postElement != null) {
      postElements.push(postElement);
    }

    const postUrl = `https://www.popit.kr/${post.postName}/`;
    const fbPluginUrl = PostApi.getFacebookShareLink(post);
    let shareButton = (<div></div>);
    if (process.env.BROWSER) {
      shareButton = (<ShareButton url={postUrl} title={post.title} fbLikeUrl={fbPluginUrl} />)
    }

    let componentIndex = 0;
    let adInterval = Math.floor(postElements.length / ads.length);
    if (adInterval != 10) {
      adInterval = 10;
    }

    let postHtml = "";
    let postComponents = [];

    let adIndex = 0;
    if (this.props.isMobile) {
      postComponents.push(ads[adIndex++]);
      postElements.forEach((element, index) => {
        const component = element.getComponent(index);
        if (component != null) {
          postComponents.push(component);
        }
        if ((index + 1) % adInterval == 0 && adIndex < ads.length) {
          postComponents.push(ads[adIndex++]);
        }
      });
    } else {
      postElements.forEach((element, index) => {
        const component = element.getComponent(index);
        if (component != null) {
          postComponents.push(component);
          componentIndex++;
          if (componentIndex == 1 || (componentIndex % adInterval == 0 && adIndex < ads.length)) {
            //componentIndex == 1 <- add top
            postComponents.push(ads[adIndex++]);
          }
        }
      });
    }
    if (adIndex < ads.length) {
      postComponents.push(ads[adIndex]);
    }

    if (this.props.isMobile) {
      return (
        <Layout className="layout" style={{background: '#ffffff'}}>
          <PopitMobileSider/>
          <Layout>
            <PopitMobileHeader/>
            <Content style={{ padding: '10px', marginTop: 64}}>
              <div style={{padding: "10px", background: '#ffffff', borderRadius: 10}}>
                <div className="list-post">
                  <div className="post-inner">
                    <div className="post-content" itemProp="articleBody">
                      <div><h1>{decodeHtml(post.title)}</h1></div>
                      <div>
                        <div style={{display: 'none'}}>{post.id}</div>
                        <AuthorCard author={post.author} postDate={post.date}/>
                        <div style={{marginTop: 10}}>
                          { shareButton }
                        </div>
                      </div>
                      <div style={{marginTop:10}} className="entry-content">
                        <div>
                          { postComponents }
                        </div>
                      </div>
                      <div style={{marginTop:20, textAlign: 'center'}} >
                        <div className="fb-page"
                             data-href="https://www.facebook.com/popitkr"
                             data-width="300"
                             data-height="80"
                             small_header="true"
                             data-hide-cover="false"
                             adapt_container_width="false"
                             data-show-facepile="false"
                        />
                      </div>
                      <div style={{marginTop:30}} >
                        <hr/>
                        <FBComment fbPluginUrl={fbPluginUrl}/>
                        <div style={{marginTop:10, fontSize: 12, lineHeight: '18px', fontStyle: 'italic', color: '#C3C3C3'}}>
                          Popit은 페이스북 댓글만 사용하고 있습니다. 페이스북 로그인 후 글을 보시면 댓글이 나타납니다.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Content>
            <PopitFooter/>
          </Layout>
        </Layout>
      );
    }

    return (
      <Layout className="layout" hasSider={false} style={{background: '#ffffff'}}>
        <PopitHeader/>
        <Content style={{padding: '20px 10px', maxWidth: 1360, margin: 'auto auto'}}>
          <div style={{width: 900}}>
            <div className="list-post">
              <div className="post-inner">
                <div className="post-content" itemProp="articleBody">
                  <div><h1>{decodeHtml(post.title)}</h1></div>
                  <div>
                    <div style={{float: 'left', width: 300}}>
                      <div style={{display: 'none'}}>{post.id}</div>
                      <AuthorCard author={post.author} postDate={post.date}/>
                      <div style={{marginTop: 10}}>
                        { shareButton }
                      </div>
                    </div>
                    <div style={{float: 'right'}}>
                      <div style={{position: 'relative', top: '50%'}}>
                        <div className="fb-page"
                             data-href="https://www.facebook.com/popitkr"
                             data-width="280"
                             data-height="80"
                             small_header="true"
                             data-hide-cover="false"
                             adapt_container_width="false"
                             data-show-facepile="false"
                        />
                      </div>
                    </div>
                    <div style={{clear: 'both'}}/>
                  </div>
                  <div style={{marginTop:10}} className="entry-content">
                    <div>
                      { postComponents }
                    </div>
                  </div>
                  <div style={{marginTop:30}} >
                    <hr/>
                    <FBComment fbPluginUrl={fbPluginUrl}/>
                    <div style={{marginTop:10, fontSize: 12, fontStyle: 'italic', color: '#C3C3C3'}}>
                      Popit은 페이스북 댓글만 사용하고 있습니다. 페이스북 로그인 후 글을 보시면 댓글이 나타납니다.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Content>
        <PopitFooter/>
      </Layout>
    )
  }
}
