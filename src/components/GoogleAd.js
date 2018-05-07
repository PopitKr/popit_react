import React from 'react';

export default class GoogleAd extends React.Component {
  componentDidMount() {
    (window.adsbygoogle = window.adsbygoogle || []).push({})
  }

  render() {
    return (
      <div dangerouslySetInnerHTML={ {__html: this.props.googleAd} }>
      </div>
    );
  }
}
