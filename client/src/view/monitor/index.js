import React from 'react';
import {
 Tabs, Table, Modal,
} from 'antd';
import { echartLine } from '../../component/Chart/index';
import Filter from './filter';
import data from '../../common/data';
import localUtils from '../../common/utils';
import { PAGINATION_NUM } from '../../common/constants';

class Monitor extends React.Component {
  static submit1(filter) {
    data.queryTime(filter).then((json) => {
      echartLine({ id: 'chart', data: json.data, unit: 'ms' });
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
        title: '性能参数(ms)',
        dataIndex: 'field',
        key: 'field',
      },
      {
        title: '代理',
        dataIndex: 'agent',
        key: 'agent',
      },
      {
        title: '分辨率',
        dataIndex: 'dpi',
        key: 'dpi',
      },
      {
        title: '网络',
        dataIndex: 'network',
        key: 'network',
      },
      {
        title: '异步请求',
        dataIndex: 'ajax', // 添加值会报key错误
        key: 'ajax',
        className: 'ui-pointer',
        render: (text, record) => text.map((value, index) => <p key={record.ajaxs[index]._id}>{value}</p>),
        onCell: (record) => ({
            onClick: () => {
              if (record.ajaxs.length === 0) return;
              Modal.info({
                title: 'ajax请求详情',
                content: record.ajaxs.map((value) => (
                  <div key={value._id} className="ui-mb40">
                    <p>
                      请求地址：
                      {value.url}
                    </p>
                    <p>
                      请求方法：
                      {value.type}
                    </p>
                    <p>
                      请求开始毫秒数：
                      {value.start}
                    </p>
                    <p>
                      响应结束毫秒数：
                      {value.end}
                    </p>
                    <p>
                      POST请求的数据：
                      {value.startBytes}
                      KB
                    </p>
                    <p>
                      响应数据：
                      {value.endBytes}
                      KB
                    </p>
                    <p>
                      通信时长：
                      {value.interval}
                      ms
                    </p>
                  </div>
                )),
              });
            },
          }),
      },
      {
        title: '创建日期',
        dataIndex: 'created',
        key: 'created',
      },
    ];
  }

  componentDidMount() {
    // echartPie({ id: 'pie' });
  }

  submit2(filter) {
    this.filter = filter; // 内部缓存
    this.query(1);
  }

  query(page) {
    const { pageNumber } = this.state;
    const offset = localUtils.getPaginationOffset(page, pageNumber);
    data.queryTimeList({ ...this.filter, offset, number: pageNumber }).then((json) => {
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
            <Filter submit={Monitor.submit1} isShowTime />
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

export default Monitor;
