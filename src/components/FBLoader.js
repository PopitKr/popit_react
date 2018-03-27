import React from 'react';

let fbLoaded = !!window.FB;
let fbLoading = false;
let fbLoadFinished = false;

function onFbLoad() {
  fbLoadFinished = true;
}

export default class FBLoader extends React.Component {
  constructor(props) {
    super(props);

    if (fbLoaded && fbLoadFinished) {
      // Injected and loaded
      if (props.onFbLoad) {
        props.onFbLoad();
      }
    } else {
      if (fbLoading == true) {
        return;
      }
      fbLoading = true;
      // Not yet injected
      console.log("==> fbLoaded load");
      let script = document.createElement('script');
      script.onload = onFbLoad;
      script.src = 'https://connect.facebook.net/es_US/all.js#xfbml=1&version=v2.5&appId=131306400631298';
      document.body.appendChild(script);
    }
  }

  render() {
    return React.Children.only(this.props.children);
  }
}