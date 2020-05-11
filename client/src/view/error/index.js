import React from 'react';
import {
  Tabs, Table,
 } from 'antd';
 import { echartLine } from '../../component/Chart/index';
 import Filter from './filter';
 import data from '../../common/data';
 import localUtils from '../../common/utils';
 import { PAGINATION_NUM } from '../../common/constants';


class Error extends React.Component {
  static submit1(filter) {
    data.queryError(filter).then((json) => {
      echartLine({ id: 'chart', data: json.data, unit: '个' });
    });
  }

  constructor(props) {
    super(props);
    this.state = {
      list: [],
      count: 0,
      pageNumber: PAGINATION_NUM,
    };
    this.submit2 = this.submit2.bind(this);

    this.columns = [
      {
        title: '错误描述',
        dataIndex: 'desc',
        key: 'desc',
        width: '20%',
      },
      {
        title: '错误栈',
        dataIndex: 'stack',
        key: 'stack',
        width: '20%',
      },
      {
        title: '错误地址',
        dataIndex: 'url',
        key: 'url',
        width: '20%',
      },
      {
        title: '代理',
        dataIndex: 'agent',
        key: 'agent',
      },
      {
        title: '创建日期',
        dataIndex: 'created',
        key: 'created',
      },
    ];
  }

  submit2(filter) {
    this.filter = filter; // 内部缓存
    this.query(1);
  }

  query(page) {
    const { pageNumber } = this.state;
    const offset = localUtils.getPaginationOffset(page, pageNumber);
    data.queryErrorList({ ...this.filter, offset, number: pageNumber }).then((json) => {
      const { list, count } = json.data;
      this.setState({
        list,
        count,
      });
    });
  }

  render() {
    const { TabPane } = Tabs;
    const { list, count, pageNumber } = this.state;
    const pagination = {
      showQuickJumper: true,
      total: count,
      defaultPageSize: pageNumber,
      onChange: (page) => {
        this.query(page);
        document.documentElement.scrollTop = 0;
      },
    };

    return (
      <div className="card-container">
        <Tabs type="card">
          <TabPane tab="折线图" key="1">
            <Filter submit={Error.submit1} isShowTime />
            <div id="chart" className="echart-line" />
            {/* <div id="pie" className="echart-line" /> */}
          </TabPane>
          <TabPane tab="列表" key="2">
            <Filter submit={this.submit2} isShowTime={false} />
            <Table dataSource={list} columns={this.columns} pagination={pagination} />
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

export default Error;
