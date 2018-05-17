import React from 'react';
import { Layout } from 'antd';
import { Link } from 'react-router-dom';
import { renderToString } from "react-dom/server";
import decodeHtml from 'decode-html';

import PostApi from "../../services/PostApi";
import ShareButton from '../ShareButton';
import FBComment from '../FBComment';
import PopitHeader from "../PopitHeader";
import PopitMobileHeader from "../PopitMobileHeader";
import PopitMobileSider from "../PopitMobileSider";
import PopitFooter from "../PopitFooter";
import AuthorCard from '../AuthorCard';
import GoogleAd from '../GoogleAd';
import DableWidget from '../DableWidget';

import {
  PostElement, EmbeddedElement, ParagraphElement,
  CaptionImageElement, SourceCodeElement, ItemsElement, BlockQuoteElement } from './PostElement';

import '../popit.css';
import {PUBLIC_PATH} from "../../routes";

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
    this.getGoogleAd = this.getGoogleAd.bind(this);
  }

  componentDidMount () {
    if (!this.state.post) {
      this.getPostByPermalink(this.props.match.params.permalink);
    }
    this.getGoogleAd();
  }

  getGoogleAd() {
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
    if (!post) {
      return (<div style={{textAlign: 'center', marginTop: 20}}>Loading...</div>);
    }

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
    }  else {
      ads.push((<div key={'ad_google_top'}></div>));
      ads.push((<div key={'ad_google_middle'}></div>));
      ads.push((<div key={'ad_google_bottom'}></div>));
    }
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
    const tagSeparator = tags.length > 0 ? " | " : "";

    const sentences = post.content.split("\n");

    let postElement = null;
    let postElements = [];

    let verbose = false;
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

      //console.log(">>>>eachSentence>", eachSentence);
      if (postElement == null) {
        postElement = PostElement.newPostElement(eachSentence);
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

    let middleAdIndex = Math.floor(postElements.length / 2);

    let componentIndex = 0;
    let postHtml = "";

    if (this.props.isMobile) {
      postElements.forEach((element, index) => {
        const elementHtml = element.getHtmlString();
        if (elementHtml) {
          postHtml += "\n" + elementHtml;
          componentIndex++;
        }
        if (index == middleAdIndex) {
          postHtml += "\n" + renderToString((<DableWidget widgetId="1XDOg2le"/>));
        }
      });
    } else {
      postElements.forEach((element, index) => {
        const elementHtml = element.getHtmlString();
        if (elementHtml) {
          postHtml += "\n" + elementHtml;
          componentIndex++;
        }
        if (index == middleAdIndex) {
          postHtml += "\n" + renderToString((<DableWidget widgetId="1XDOg2le"/>));
        }
      });
    }

    const postUrl = `https://www.popit.kr/${post.postName}/`;
    const fbPluginUrl = PostApi.getFacebookShareLink(post);
    let shareButton = (<div></div>);
    if (process.env.BROWSER && post.postName) {
      shareButton = (<ShareButton url={postUrl} title={post.title} fbLikeUrl={fbPluginUrl} />)
    }

    if (this.props.isMobile) {
      return (
        <Layout className="layout" style={{background: '#ffffff'}}>
          <PopitMobileSider/>
          <Layout>
            <PopitMobileHeader/>
            <Content style={{ padding: '10px', marginTop: 94}}>
              <div style={{padding: "10px", background: '#ffffff', borderRadius: 10}}>
                <div className="list-post">
                  <div className="post-inner">
                    <div className="post-content" itemProp="articleBody">
                      { ads[0] }
                      <div><h1>{decodeHtml(post.title)}</h1></div>
                      <div>
                        <div style={{display: 'none'}}>{post.id}</div>
                        <AuthorCard author={post.author} postDate={post.date}/>
                        <div className="post_tag">{categories}{tagSeparator}{tags}</div>
                        <div style={{marginTop: 10}}>
                          { shareButton }
                        </div>
                      </div>
                      <DableWidget widgetId='1XDOg2le'/>
                      <div style={{marginTop:10}} className="entry-content">
                        <div dangerouslySetInnerHTML={{ __html: postHtml }} />
                      </div>
                      { ads[1] }
                      <DableWidget widgetId='370W3Kox'/>
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
                        { ads[2] }
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
        <Content style={{padding: '20px 10px', maxWidth: 1360, margin: '74px auto auto auto'}}>
          <div style={{width: 800, float: 'left'}}>
            <div className="post-content" itemProp="articleBody">
              <div><h1>{decodeHtml(post.title)}</h1></div>
              { ads[0] }
              <div>
                <div>
                  <div style={{display: 'none'}}>{post.id}</div>
                  <AuthorCard author={post.author} postDate={post.date}/>
                  <div className="post_tag">{categories}{tagSeparator}{tags}</div>
                  <div style={{marginTop: 10}}>
                    { shareButton }
                  </div>
                </div>
              </div>
              <div style={{marginTop:10}} className="entry-content">
                <div dangerouslySetInnerHTML={{ __html: postHtml }} />
                { ads[2] }
              </div>
              <DableWidget widgetId="wXQ42RlA"/>
              <DableWidget widgetId='370W3Kox'/>
              <div style={{marginTop:30}} >
                <hr/>
                <FBComment fbPluginUrl={fbPluginUrl}/>
                <div style={{marginTop: 10, fontSize: 12, fontStyle: 'italic', color: '#C3C3C3'}}>
                  Popit은 페이스북 댓글만 사용하고 있습니다. 페이스북 로그인 후 글을 보시면 댓글이 나타납니다.
                </div>
              </div>
            </div>
          </div>
          <div style={{ width: 310, marginLeft: 20, float: 'left'}}>
            <div style={{marginTop: 10}}>
              <div className="fb-page"
                   data-href="https://www.facebook.com/popitkr"
                   data-width="300"
                   data-height="200"
                   small_header="true"
                   data-hide-cover="false"
                   adapt_container_width="false"
                   data-show-facepile="true"
              />
            </div>
            <div style={{width: 300, height: 900}}>
              { ads[1] }
            </div>
          </div>
          <div style={{clear: 'both'}}/>
        </Content>
        <PopitFooter/>
      </Layout>
    )
  }
}
