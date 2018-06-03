import React from 'react';
import fetch from 'isomorphic-fetch'

const HttpUtil = {
  handleHttpStatus: (response) => {
    // console.log(response.status);
    // if (response.status == 404) {
    //   throw new Error("404");
    // }
    // if (response.ok) {
    //   return response;
    // } else {
    //   //throw new Error(response.statusText);
    //   return response;
    // }
    if (response.status >= 200 && response.status < 300) {
      return Promise.resolve(response);
    } else {
      var error = new Error(response.statusText || response.status)
      error.response = response;
      return Promise.reject(error);
    }
  },
};

export default class PostApi {
  static getFacebookShareLink(post) {
    let useHttp = false;
    if (post.metas) {
      let metaValues = post.metas.filter(meta => {
        return meta.name === "facebook.like.http"
      });
      if (metaValues.length > 0) {
        useHttp = metaValues[0].value === "true" || metaValues[0].value === "1";
      }
    }
    return `${useHttp ? "http" : "https"}://www.popit.kr/${decodeURIComponent(post.postName)}/`;
  };

  static getCanonicalLink(post) {
    let useHttps = false;
    if (post.metas) {
      let metaValues = post.metas.filter(meta => {
        return meta.name === "canonical.https"
      });
      if (metaValues.length > 0) {
        useHttps = metaValues[0].value === "true" || metaValues[0].value === "1";
      }
    }
    return `${useHttps ? "https" : "http"}://www.popit.kr/${decodeURIComponent(post.postName)}/`;
  };

  static getApiServer() {
    if (process.env.NODE_ENV === 'production') {
      // return "http://127.0.0.1:8000";
      return "https://www.popit.kr";
    } else {
      // return "http://127.0.0.1:8000";
      return "https://www.popit.kr";
    }
  };

  static getSitePreference(name) {
    const apiPath = `${PostApi.getApiServer()}/api/GetSitePreference?name=${name}`;
    return fetch(apiPath, {headers: PostApi.getHeader()})
      .then(HttpUtil.handleHttpStatus)
      .then(res => res.json())
  }

  static searchPosts(keyword, page) {
    if (!keyword) {
      console.log("Error: No keyword");
      throw new Error("No keyword");
    }
    const apiPath = `${PostApi.getApiServer()}/api/Search?keyword=${keyword}&page=${page}`;
    return fetch(apiPath, {headers: PostApi.getHeader()})
      .then(HttpUtil.handleHttpStatus)
      .then(res => res.json())
  }

  static getPostByPermalink(link) {
    const apiPath = `${PostApi.getApiServer()}/api/PostByPermalink?permalink=${link}`;
    return fetch(apiPath, {headers: PostApi.getHeader()})
      .then(HttpUtil.handleHttpStatus)
      .then(res => res.json())
  }

  static getPostById(id) {
    const apiPath = `${PostApi.getApiServer()}/api/PostById?id=${id}`;
    return fetch(apiPath, {headers: PostApi.getHeader()})
      .then(HttpUtil.handleHttpStatus)
      .then(res => res.json())
  }

  static getRecentPosts(page, pageSize, includeTotal) {
    const apiPath = `${PostApi.getApiServer()}/api/RecentPosts?page=${page}&size=${pageSize}&includeTotal=${includeTotal}`;
    return fetch(apiPath, {headers: PostApi.getHeader()})
      .then(HttpUtil.handleHttpStatus)
      .then(res => res.json())
  };

  static getTagPosts(isMobile) {
    const apiPath = `${PostApi.getApiServer()}/api/TagPosts?isMobile=${isMobile}`;
    return fetch(apiPath, {headers: PostApi.getHeader()})
      .then(HttpUtil.handleHttpStatus)
      .then(res => res.json())
  };

  static getPostsByCategory(category, excludePostIds, page, pageSize) {
    const apiPath = `${PostApi.getApiServer()}/api/PostsByCategory?category=${category}&page=${page}&size=${pageSize}&excludes=${excludePostIds}`;
    return fetch(apiPath, {headers: PostApi.getHeader()})
      .then(HttpUtil.handleHttpStatus)
      .then(res => res.json())
  };

  static getPostsByTag(tag, excludePostIds, page, pageSize) {
    const apiPath = `${PostApi.getApiServer()}/api/PostsByTag?tag=${tag}&page=${page}&size=${pageSize}&excludes=${excludePostIds}`;
    return fetch(apiPath, {headers: PostApi.getHeader()})
      .then(HttpUtil.handleHttpStatus)
      .then(res => res.json())
  };

  static getPostsByTagId(tagId, excludePostIds, page, pageSize) {
    const apiPath = `${PostApi.getApiServer()}/api/PostsByTagId?id=${tagId}&page=${page}&size=${pageSize}&excludes=${excludePostIds}`;
    return fetch(apiPath, {headers: PostApi.getHeader()})
      .then(HttpUtil.handleHttpStatus)
      .then(res => res.json())
  };

  static getRandomAuthorPosts(isMobile) {
    const apiPath = `${PostApi.getApiServer()}/api/RandomAuthorPosts?isMobile=${isMobile}`;
    return fetch(apiPath, {headers: PostApi.getHeader()})
      .then(HttpUtil.handleHttpStatus)
      .then(res => res.json())
  };

  static getPostsByAuthor(author, excludePostIds, page, pageSize) {
    const apiPath = `${PostApi.getApiServer()}/api/PostsByAuthor?author=${author}&page=${page}&size=${pageSize}&excludes=${excludePostIds}`;
    return fetch(apiPath, {headers: PostApi.getHeader()})
      .then(HttpUtil.handleHttpStatus)
      .then(res => res.json())
  };

  static getPostsByAuthorId(authorId, excludePostIds, page, pageSize) {
    const apiPath = `${PostApi.getApiServer()}/api/PostsByAuthorId?id=${authorId}&page=${page}&size=${pageSize}&excludes=${excludePostIds}`;
    return fetch(apiPath, {headers: PostApi.getHeader()})
      .then(HttpUtil.handleHttpStatus)
      .then(res => res.json())
  };

  static getGoogleAds(mode) {
    const apiPath = `${PostApi.getApiServer()}/api/GetGoogleAd?mode=${mode}`;
    return fetch(apiPath, {headers: PostApi.getHeader()})
      .then(HttpUtil.handleHttpStatus)
      .then(res => res.json())
  };

  static getHeader() {
    return {
      'Content-Type': 'application/json'
    };
  }
}