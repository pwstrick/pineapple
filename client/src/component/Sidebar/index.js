import React from 'react';

function Sidebar() {
  return (
    <ul>
      <li className="active">
        <a href="index.html"><span>Dashboard</span></a>
        {' '}
      </li>
      <li>
        {' '}
        <a href="charts.html"><span>性能分析</span></a>
        {' '}
      </li>
      <li>
        {' '}
        <a href="widgets.html"><span>错误分析</span></a>
        {' '}
      </li>
    </ul>
  );
}
export default Sidebar;
