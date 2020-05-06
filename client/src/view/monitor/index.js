import React from 'react';
import {
 Tabs,
} from 'antd';
import { echartLine, echartPie } from '../../component/Chart/index';
import Filter from './filter';

class Monitor extends React.Component {
  constructor(props) {
    super(props);
    this.submit1 = this.submit1.bind(this);
  }

  componentDidMount() {
    echartPie({ id: 'pie' });
  }

  submit1() {
    echartLine({ id: 'chart' });
    console.log(this);
    // this.setState({ date: '' });
  }

  render() {
    const { TabPane } = Tabs;

    return (
      <div className="card-container">
        <Tabs type="card">
          <TabPane tab="折线图" key="1">
            <Filter submit={this.submit1} />
            <div id="chart" className="echart-line" />
            <div id="pie" className="echart-line" />
          </TabPane>
          <TabPane tab="列表" key="2">
            <Filter submit={this.submit1} />
          </TabPane>
        </Tabs>
      </div>
    );
  }
}


export default Monitor;
