import React from 'react';
import {
 Tabs,
} from 'antd';
import { echartLine, echartPie } from '../../component/Chart/index';
import Filter from './filter';
import data from '../../common/data';

class Monitor extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.submit1 = this.submit1.bind(this);
  // }

  static submit1(filter) {
    // console.log(filter, this);
    data.queryTime(filter).then((json) => {
      echartLine({ id: 'chart', data: json.data });
    });
  }

  componentDidMount() {
    echartPie({ id: 'pie' });
  }

  render() {
    const { TabPane } = Tabs;
    return (
      <div className="card-container">
        <Tabs type="card">
          <TabPane tab="折线图" key="1">
            <Filter submit={Monitor.submit1} />
            <div id="chart" className="echart-line" />
            <div id="pie" className="echart-line" />
          </TabPane>
          <TabPane tab="列表" key="2">
            <Filter submit={Monitor.submit1} />
          </TabPane>
        </Tabs>
      </div>
    );
  }
}


export default Monitor;
