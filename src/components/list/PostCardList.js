import React from 'react';
import PostCard from './PostCard';
import PostApi from "../../services/PostApi";
import GoogleAd from "../GoogleAd";

export default class PostCardList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      googleAds: null,
    };
  }
  componentDidMount () {
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

  render() {
    const { posts }  = this.props;
    const { googleAds } = this.state;

    if (!posts) {
      return (<div style={{textAlign: 'center', marginTop: 20}}>No elements</div>)
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
    }

    const adInterval = 5;
    let adIndex = 0;
    const postCards = [];
    posts.forEach((post, index) => {
      if (index == 0 || (index % adInterval == 0 && adIndex < ads.length - 1)) {
        postCards.push((<div key={'ad_google_' + adIndex} style={{marginTop:10, marginBottom: 10}}>{ads[adIndex++]}</div>));
      }
      postCards.push(
        (<PostCard key={post.id}
                   post={post}
                   index={index}
                   showAuthor={this.props.showAuthor}
                   showHighlight={this.props.showAuthor}
        />)
      );
    });

    if (adIndex < ads.length) {
      postCards.push((<div key={'ad_google_' + adIndex} style={{marginTop:10}}>{ads[adIndex++]}</div>));
    }
    return(
      <div style={{marginTop: 20}}>
        {postCards}
        {
          (this.props.getNextPosts) ?

            (
              <div
                onClick={() => {
                  this.props.getNextPosts();
                }}
                style={{
                  marginTop: 20,
                  cursor: 'pointer',
                  textAlign: 'center',
                  background: '#ffffff',
                  borderStyle: 'solid',
                  borderWidth: 1,
                  borderColor: '#D9D9D9',
                  borderRadius: 10,
                  height: 40,
                  lineHeight: '40px',
                  fontSize: 18,
                  fontWeight: 'bold'
                }}>
                더보기
              </div>
            )
            :
            null
        }
      </div>
    )
  }
}
