import React from 'react';
import {
 DatePicker, Radio, Button, Tabs,
} from 'antd';

import { echartLine, echartPie } from '../../component/Chart/index';

class Monitor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: '',
      time: '',
    };
    this.changeDate = this.changeDate.bind(this);
    this.changeTime = this.changeTime.bind(this);
    this.submit = this.submit.bind(this);
  }

  componentDidMount() {
    echartPie({ id: 'pie' });
  }

  changeDate(dates, date) {
    // console.log(dates, date);
    this.setState({ date });
  }

  changeTime(e) {
    this.setState({ time: e.target.value });
  }

  submit() {
    echartLine({ id: 'chart' });
    this.setState({ date: '提交' });
  }

  render() {
    const { date, time } = this.state;
    const { RangePicker } = DatePicker;
    const { TabPane } = Tabs;

    return (
      <div className="card-container">
        <Tabs type="card">
          <TabPane tab="折线图" key="1">
            <div className="ui-mb20">
              <RangePicker onChange={this.changeDate} className="ui-mr20" showTime={{ format: 'HH:mm' }} format="YYYY-MM-DD HH:mm" />
              <Radio.Group defaultValue="1" buttonStyle="solid" onChange={this.changeTime} className="ui-mr20">
                <Radio.Button value="1">按分</Radio.Button>
                <Radio.Button value="2">按时</Radio.Button>
                <Radio.Button value="3">按日</Radio.Button>
              </Radio.Group>
              <Button onClick={this.submit} type="primary">查询</Button>
            </div>
            <div id="chart" className="echart-line" />
            <div id="pie" className="echart-line" />
            {date}
            {time}
          </TabPane>
          <TabPane tab="列表" key="2" />
        </Tabs>
      </div>
    );
  }
}

export default Monitor;
