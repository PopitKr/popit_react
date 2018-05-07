import Home from './components/home/Home';
import SinglePostPage from './components/detail/SinglePostPage';
import TagPostsPage from './components/list/TagPostsPage';
import CategoryPostsPage from './components/list/CategoryPostsPage';
import PostApi from './services/PostApi';
import AuthorPostsPage from "./components/list/AuthorPostsPage";
import DesktopApp from "./components/home/DesktopApp";

const PUBLIC_PATH = '/v2';

const routes =  [
  {
    path: PUBLIC_PATH + '/',
    exact: true,
    component: DesktopApp,
    fetchInitialData: (path = '') => {
      return PostApi.getGoogleAds('index.desktop');
    }
  }, {
    path: PUBLIC_PATH + '/tag/:tag',
    component: TagPostsPage,
    fetchInitialData: (path = '') => {
      const tagParam = path.split('/').pop();
      return PostApi.getPostsByTag(tagParam, [], 1, 10);
    }
  }, {
    path: PUBLIC_PATH + '/category/:category',
    component: CategoryPostsPage,
    fetchInitialData: (path = '') => {
      const categoryParam = path.split('/').pop();
      return PostApi.getPostsByCategory(categoryParam, [], 1, 10);
    }
  }, {
    path: PUBLIC_PATH + '/author/:author',
    component: AuthorPostsPage,
    fetchInitialData: (path = '') => {

      const authorParam = path.split('/').pop();
      return PostApi.getPostsByAuthor(authorParam, [], 1, 10);
    }
  }, {
    path: PUBLIC_PATH + '/:permalink/',
    component: SinglePostPage,
    fetchInitialData: (path = '') => {
      console.log(">>>>>>>>>>>>>Path:", path);
      const tokens = path.split('/');
      if (tokens.length < 2) {
        return Promise.resolve();
      }
      if (tokens[1] === "favicon.ico") {
        return Promise.resolve();
      }
      return PostApi.getPostByPermalink(tokens[1]);
    }
  }
];

export { routes, PUBLIC_PATH }