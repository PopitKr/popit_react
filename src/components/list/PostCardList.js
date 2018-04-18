import React from 'react';
import PostCard from './PostCard';

export default class PostCardList extends React.Component {

  render() {
    const { posts }  = this.props;

    if (!posts) {
      return (<div>No data</div>)
    }
    const postCards = posts.map((post, index) => {
      return (<PostCard key={post.id} post={post} index={index} showAuthor={this.props.showAuthor}></PostCard>)
    });

    return(
      <div style={{marginTop: 20}}>
        {postCards}
        {
          (this.props.getNextPosts) ?

            (
              <div
                onClick={this.props.getNextPosts}
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