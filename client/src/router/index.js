import React, {
  useState,
  useEffect,
} from 'react';
import {
  createHashHistory,
  // createBrowserHistory,
} from 'history';
// import ReactDOM from 'react-dom';


// 历史对象
export const history = createHashHistory();

function bread(pathname, pageObj) {
  return [{
    name: pageObj.title,
    href: pathname,
    className: 'current',
  }];
}

// 路由
function App(props) {
  const [Page, setPage] = useState(null);
  const router = {
    '/': {
      url: 'view/project/index',
      title: '项目管理',
    },
    '/error': {
      url: 'view/error/index',
      title: '错误分析',
    },
    '/monitor': {
      url: 'view/monitor/index',
      title: '性能分析',
    },
  };

  function setTitle(title) {
    document.title = title;
  }
  async function route(location) {
    const { pathname } = location;
    // console.log(pathname);
    const pageObj = router[pathname] || router['/'];
    const moudle = await import(`../${pageObj.url}`);
    const View = moudle.default;
    props.callback(bread(pathname, pageObj)); // 刷新侧边栏和面包屑
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

export default App;
