import React from 'react';
import { BrowserView, MobileView, isBrowser, isMobile } from 'react-device-detect';

import DesktopApp from './DesktopApp';
import MobileApp from './MobileApp';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <DesktopApp/>
      </div>
    )

    // return (
    //   {/*<div>*/}
    //     {/*<BrowserView device={isBrowser}>*/}
    //       {/*<DesktopApp/>*/}
    //     {/*</BrowserView>*/}
    //     {/*<MobileView device={isMobile}>*/}
    //       {/*<MobileApp/>*/}
    //     {/*</MobileView>*/}
    //   {/*</div>*/}
    // );
  }
}