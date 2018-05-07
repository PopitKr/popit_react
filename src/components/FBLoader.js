import React from 'react';

if (!process.env.BROWSER) {
  global.window = {};
}

let fbLoaded = !!global.window.FB;
let fbLoading = false;

function onFbLoad() {
  fbLoaded = !!global.window.FB;
}

export default class FBLoader extends React.Component {
  constructor(props) {
    super(props);

    this.fbLoadFinished = false;

    if (fbLoaded) {
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
      // script.src = 'https://connect.facebook.net/es_US/all.js#xfbml=1&version=v2.5&appId=131306400631298';
      // script.src = 'https://connect.facebook.net/es_US/all.js#xfbml=1&version=v2.5&appId=131306400631298';
      script.src = 'https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.12&appId=131306400631298&autoLogAppEvents=1';
      document.body.appendChild(script);
    }
  }

  render() {
    return React.Children.only(this.props.children);
  }
}