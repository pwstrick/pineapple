import React, {
  useState,
  useEffect,
} from 'react';
import {
  createHashHistory,
  // createBrowserHistory,
} from 'history';

// 历史对象
export const history = createHashHistory();

// 路由
export default function App(props) {
  const [Page, setPage] = useState(null);

  const router = {
    '/': {
      url: 'view/home/index',
      title: '菠萝监控系统主页',
    },
  };

  function setTitle(title) {
    document.title = title;
  }
  async function route(location) {
    const { pathname } = location;
    const pageObj = router[pathname] || router['/'];
    const moudle = await import(`../${pageObj.url}`);
    const View = moudle.default;
    setPage(<View {...props} />);
    setTitle(pageObj.title);
  }

  useEffect(() => {
    route(history.location);
    history.listen((location) => {
      route(location);
    });
  }, []);

  return Page;
}
