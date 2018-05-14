import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import decodeHtml from 'decode-html';
import { dracula } from 'react-syntax-highlighter/styles/hljs';
import {renderToString} from "react-dom/server";
import Iframe from 'react-iframe';
import SlideShareEmbed from './SlideShareEmbed';

class HtmlElement extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { html } = this.props;

    return (
      <div dangerouslySetInnerHTML={{ __html: html }} />
    )
  }
}

class PostElement {
  constructor() {
    this.needNextLine = this.needNextLine.bind(this);
    this.addNextLine = this.addNextLine.bind(this);
    this.isFinished = this.isFinished.bind(this);
    this.getHtmlString = this.getHtmlString.bind(this);
    this.getComponent = this.getComponent.bind(this);
  }

  static newPostElement(line) {
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

  addNextLine(line) {
  }

  needNextLine() {
    return false;
  }

  isFinished() {
    return true;
  }

  getHtmlString() {
    return "<div>Unknown element type</div>";
  }

  getComponent(key) {
    const html = this.getHtmlString();
    if (!html) {
      return null;
    }
    return (<HtmlElement key={key} html={html}/>)
  }
}

class ParagraphElement extends PostElement {
  constructor(paragraph) {
    super();
    this.paragraph = paragraph;
  }

  getHtmlString() {
    if (!this.paragraph) {
      return "";
    }
    if (this.paragraph.startsWith("<")) {
      return this.paragraph;
    }
    return `<p>${this.paragraph}</p>`;
  }
}

class BlockQuoteElement extends PostElement {
  constructor(firstLine) {
    super();
    this.finish = false;
    this.lines = [firstLine];
  }

  needNextLine() {
    return !this.finish;
  }

  isFinished() {
    return this.finish;
  }

  addNextLine(line) {
    const endTagIndex = line.indexOf("</blockquote>");
    if (endTagIndex >= 0) {
      this.finish = true;
    }
    this.lines.push(line);
  }

  getHtmlString() {
    let html = "";
    this.lines.forEach((line) => html += line + "\n");

    return html;
  }
}

class ItemsElement extends PostElement {
  constructor(ulTag) {
    super();
    this.finish = false;
    this.lines = [ulTag];
  }

  needNextLine() {
    return !this.finish;
  }

  isFinished() {
    return this.finish;
  }

  addNextLine(line) {
    const endTagIndex = line.indexOf("</ul>");
    if (endTagIndex >= 0) {
      this.finish = true;
    }
    this.lines.push(line);
  }

  getHtmlString() {
    let html = "";
    let startListItemTag = false; // <li>
    this.lines.forEach((line) => {
      html += line;
      if (startListItemTag) {
        html += "<br/>";
      }
      html += "\n";

      if (line.trim().replace("\t", "").startsWith("<li>")) {
        startListItemTag = true;
      }
      if (line.endsWith("</li>")) {
        startListItemTag = false;
      }
    });

    return html;
  }

  getComponent(key) {
    let html = "";
    let startListItemTag = false; // <li>

    let codeComponentIndex = 1;
    let codeComponent = null;
    this.lines.forEach((line) => {
      if (line.indexOf("<pre class=\"lang") >= 0) {
        // <li> 내부에 다시 소스 코드가 있는 경우
        codeComponent = PostElement.newPostElement(line);
        return;
      }
      if (codeComponent != null) {
        codeComponent.addNextLine(line);
        if (codeComponent.isFinished()) {
          html += renderToString(codeComponent.getComponent(key + "_" + codeComponentIndex));
          codeComponent = null;
          codeComponentIndex++;
        }
        return;
      }
      html += line;
      if (startListItemTag) {
        html += "<br/>";
      }
      html += "\n";

      if (line.trim().replace("\t", "").startsWith("<li>")) {
        startListItemTag = true;
      }
      if (line.endsWith("</li>")) {
        startListItemTag = false;
      }
    });

    return (<HtmlElement key={key} html={html}/>)
  }
}

class CaptionImageElement extends PostElement {
  constructor(captionTag) {
    super();

    this.captionTag = captionTag;
  }

  getHtmlString() {
    const captionTag = this.captionTag;

    //[caption id="attachment_11782" align="alignnone" width="600"]<img class="size-medium wp-image-11782" src="http://www.popit.kr/wp-content/uploads/2017/03/tony-1-600x600.png" alt="소통은 언제나 환영하니 메일 주세요" wit="600" /> 소통은 언제나 환영하니 메일 주세요[/caption]
    const captionIndex = captionTag.indexOf("]");
    const captionDiv = captionTag.substring(captionTag.indexOf("[caption") + 8, captionIndex);
    const imageTag = captionTag.substring(captionIndex + 1, captionTag.indexOf("/>") + 2);
    const caption = captionTag.substring(captionTag.indexOf("/>") + 2, captionTag.indexOf("[/caption]")).trim();

    return `<div className="wp-caption alignnone" ${captionDiv}>\n${imageTag}\n<p class="wp-caption-text">${caption}</p></div>`;
  }
}

class EmbeddedElement extends PostElement {
  constructor(embeddedTag) {
    super();

    this.embeddedTag = embeddedTag;
    this.contentsType = null;
    this.embeddedLink = null;

    this.parseTag = this.parseTag.bind(this);

    this.parseTag();
  }

  parseTag() {
    const startIndex = this.embeddedTag.indexOf("[embed]");
    const endIndex = this.embeddedTag.indexOf("[/embed]");

    let link = this.embeddedTag.substring(startIndex + "[embed]".length, endIndex);
    if (!link.startsWith("http://") && !link.startsWith("https://")) {
      return;
    }

    if (link.indexOf("youtube") >= 0) {
      this.contentsType = "youtube";
    } else if (link.indexOf("slideshare") >= 0) {
      this.contentsType = "slideshare";
    }
    this.embeddedLink = link;
  }

  getHtmlString() {
    if (this.embeddedLink == null) {
      return `<p>Link: ${this.embeddedTag}</p>`;
    }
    return `<p>Link: <a href="${this.embeddedLink}" target="_blank">${this.embeddedLink}</a></p>`;
  }

  getComponent(key) {
    if (this.embeddedLink == null) {
      return (<HtmlElement key={key} html={`<p>Link: ${this.embeddedTag}</p>`}/>);
    }
    if (this.contentsType == "youtube") {
      const url = new URL(this.embeddedLink);
      const contentId = url.searchParams.get("v");
      if (contentId) {
        const link = `https://www.youtube.com/embed/${contentId}`;
        return (
          <div className="post-embed" style={{margin: 10}} key={key}>
            <Iframe url={link}
                    width="800px"
                    height="400px"
                    display="initial"
                    position="relative"
                    allowFullScreen/>
          </div>
        )
      } else {
        return (<HtmlElement key={key} html={`<p>Link: <a href="${this.embeddedLink}" target="_blank">${this.embeddedLink}</a></p>`}/>);
      }
    } else if (this.contentsType == "slideshare") {
      return (<SlideShareEmbed slideshareLink={this.embeddedLink} key={key}/>);
    }

    return (<HtmlElement key={key} html={`<p>Link: ${this.embeddedTag}</p>`}/>);
  }
}

class SourceCodeElement extends PostElement {
  constructor(firstLine) {
    super();

    // parse first line
    const preTagClosingIndex = firstLine.indexOf(">");

    const firstLineSourceCode = firstLine.substring(preTagClosingIndex + 1);
    this.sourceCodes = [decodeHtml(firstLineSourceCode)];
    this.finish = firstLine.endsWith("</pre>");

    this.getComponent = this.getComponent.bind(this);
  }

  needNextLine() {
    return !this.finish;
  }

  isFinished() {
    return this.finish;
  }

  addNextLine(line) {
    if (line.endsWith("</pre>")) {
      const preTagIndex = line.lastIndexOf("</pre>");
      this.finish = true;
      this.sourceCodes.push(decodeHtml(line.substring(0, preTagIndex)));
    } else {
      this.sourceCodes.push(decodeHtml(line));
    }
  }

  getHtmlString() {
    const code = this.sourceCodes.join('\n');
    return renderToString (
      <SyntaxHighlighter customStyle={{fontSize: '13px', lineHeight: '16px'}} language='java' useInlineStyles={true} style={dracula} showLineNumbers={true}>{code}</SyntaxHighlighter>
    );
  };
}

export { PostElement, EmbeddedElement, ParagraphElement, CaptionImageElement, SourceCodeElement, ItemsElement, BlockQuoteElement }
