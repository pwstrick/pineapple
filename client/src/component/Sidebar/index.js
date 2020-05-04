import React from 'react';
// import localUtils from '../../common/utils';

function Sidebar() {
  const { hash } = window.location;
  const bars = [
    { href: '#/', name: '项目管理' },
    { href: '#/monitor', name: '性能分析' },
    { href: '#/error', name: '错误分析' },
  ];
  const html = bars.map((item) => {
    const className = hash === item.href ? 'active' : '';
    return (
      <li className={className} key={item.name}>
        <a href={item.href}><span>{item.name}</span></a>
      </li>
    );
  });
  return (
    <ul>
      {html}
    </ul>
  );
}
export default Sidebar;
