import React from 'react';
import {
 DatePicker, Radio, Button, Select, Modal,
} from 'antd';
import PropTypes from 'prop-types';
import { PERFORMANCE, FILTER_TIME } from '../../common/constants';
// import localUtils from '../../common/utils';
import SelectProjects from '../../component/Filter/index';

class Filter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        date: [],
        time: Object.keys(FILTER_TIME)[0],
        field: '',
        token: '',
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.changeDate = this.changeDate.bind(this);
    this.changeTime = this.changeTime.bind(this);
    this.changeField = this.changeField.bind(this);
    this.changeProject = this.changeProject.bind(this);
  }

  onSubmit() {
    const { date, field, token } = this.state;
    if (date.length === 0) {
      Modal.error({ content: '请选择日期' });
      return;
    }
    if (field.length === 0) {
      Modal.error({ content: '请选择字段' });
      return;
    }
    if (token.length === 0) {
      Modal.error({ content: '请选择项目' });
      return;
    }
    const { submit } = this.props;
    submit(this.state);
    // echartLine({ id: 'chart' });
    // this.setState({ date: '提交' });
  }

  changeDate(dates, date) {
    // console.log(dates, date);
    // 转换成时间戳
    // date = date.map((value) => localUtils.dateToTimestamp(value));
    this.setState({ date });
  }

  changeField(field) {
    this.setState({ field });
  }

  changeTime(e) {
    this.setState({ time: e.target.value });
  }

  changeProject(token) {
    this.setState({ token });
  }

  render() {
    const { RangePicker } = DatePicker;
    const { Option } = Select;

    return (
      <>
        <div className="ui-mb20">
          <SelectProjects change={this.changeProject} />
          <Select defaultValue="选择性能字段" style={{ width: 160 }} onChange={this.changeField} className="ui-mr20">
            {
                Object.keys(PERFORMANCE).map((value) => <Option value={value} key={value}>{PERFORMANCE[value]}</Option>)
            }
          </Select>
        </div>
        <div className="ui-mb20">
          <RangePicker onChange={this.changeDate} className="ui-mr20" showTime={{ format: 'HH:mm' }} format="YYYY-MM-DD HH:mm" />
          <Radio.Group defaultValue="1" buttonStyle="solid" onChange={this.changeTime} className="ui-mr20">
            {
                Object.keys(FILTER_TIME).map((value) => <Radio.Button value={value} key={value}>{FILTER_TIME[value]}</Radio.Button>)
            }
          </Radio.Group>
          <Button onClick={this.onSubmit} type="primary">查询</Button>
        </div>
      </>
    );
  }
}

Filter.propTypes = {
    submit: PropTypes.func.isRequired,
};

export default Filter;
