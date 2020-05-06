import React from 'react';
import {
 DatePicker, Radio, Button, Select,
} from 'antd';
import PropTypes from 'prop-types';
import { PERFORMANCE, FILTER_TIME } from '../../common/constants';

class Filter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        date: '',
        time: '',
        field: '',
    };
    this.changeDate = this.changeDate.bind(this);
    this.changeTime = this.changeTime.bind(this);
    this.changeField = this.changeField.bind(this);
    this.onSubmit = props.submit;
  }

  changeDate(dates, date) {
    // console.log(dates, date);
    this.setState({ date });
  }

  changeField(field) {
    this.setState({ field });
  }

  changeTime(e) {
    this.setState({ time: e.target.value });
  }

//   submit() {
//     // echartLine({ id: 'chart' });
//     // this.setState({ date: '提交' });
//   }

  render() {
    const { date, time, field } = this.state;
    const { RangePicker } = DatePicker;
    const { Option } = Select;

    return (
      <div className="ui-mb20">
        <Select defaultValue="选择性能字段" style={{ width: 160 }} onChange={this.changeField} className="ui-mr20">
          {
                Object.keys(PERFORMANCE).map((value) => <Option value={value} key={value}>{PERFORMANCE[value]}</Option>)
            }
        </Select>
        <RangePicker onChange={this.changeDate} className="ui-mr20" showTime={{ format: 'HH:mm' }} format="YYYY-MM-DD HH:mm" />
        <Radio.Group defaultValue="1" buttonStyle="solid" onChange={this.changeTime} className="ui-mr20">
          {
                Object.keys(FILTER_TIME).map((value) => <Radio.Button value={value} key={value}>{FILTER_TIME[value]}</Radio.Button>)
            }
        </Radio.Group>
        <Button onClick={this.onSubmit} type="primary">查询</Button>
        {date}
        {time}
        {field}
      </div>
    );
  }
}

Filter.propTypes = {
    submit: PropTypes.func.isRequired,
};

export default Filter;
