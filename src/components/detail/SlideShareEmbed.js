import React from 'react';
import Iframe from 'react-iframe';
import fetch from "isomorphic-fetch";
import DomParser from 'dom-parser';

export default class SlideShareEmbed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      iframeSrc: "",
    }

    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount() {
    const { slideshareLink } = this.props;
    const slideshareApi = `https://www.popit.kr/api/GetSlideShareEmbedLink?link=${slideshareLink}`;
    try {
      // request
      fetch(slideshareApi, {method: 'GET', headers: {'Content-Type': 'json'}})
        .then(res => res.json())
        .then(json => {
          if (!json.success) {
            console.log("Error: ", json.message);
            return;
          }
          const iframHtml = json.data.html;
          const parser = new DomParser();
          const htmlDoc = parser.parseFromString(iframHtml, "text/html");
          const iframeSrc = htmlDoc.getElementsByTagName("iframe")[0].getAttribute("src");
          this.setState({
            iframeSrc: iframeSrc
          })
        })
        .catch(error => {
          console.log('Error: ', error);
        });
    } catch (error) {
      console.log('Error: ', error);
    }
  }

  render() {
    const { iframeSrc } = this.state;
    const { slideshareLink } = this.props;

    if (!iframeSrc) {
      return (
        <div className="post-embed" style={{margin: 10}}>
          <p>Link: <a href={slideshareLink} target="_blank">{slideshareLink}</a></p>
        </div>
      )
    }
    return (
      <div className="post-embed" style={{margin: 10}}>
        <Iframe url={iframeSrc}
                width="800px"
                height="400px"
                display="initial"
                position="relative"
                allowFullScreen/>
      </div>
    );
  }
}