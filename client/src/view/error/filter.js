import React from 'react';
import {
 DatePicker, Radio, Button, Select, Modal,
} from 'antd';
import PropTypes from 'prop-types';
import { ERROR_TYPE, FILTER_TIME } from '../../common/constants';
// import localUtils from '../../common/utils';
import SelectProjects from '../../component/Filter/index';

class Filter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        date: [],
        time: Object.keys(FILTER_TIME)[0],
        type: '',
        token: '',
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.changeDate = this.changeDate.bind(this);
    this.changeTime = this.changeTime.bind(this);
    this.changeType = this.changeType.bind(this);
    this.changeProject = this.changeProject.bind(this);
  }

  onSubmit() {
    const { date, type, token } = this.state;
    if (token.length === 0) {
      Modal.error({ content: '请选择项目' });
      return;
    }
    if (type.length === 0) {
      Modal.error({ content: '请选择错误类别' });
      return;
    }
    if (date.length === 0) {
      Modal.error({ content: '请选择日期' });
      return;
    }
    const { submit } = this.props;
    submit(this.state);
  }

  changeDate(dates, date) {
    this.setState({ date });
  }

  changeType(type) {
    this.setState({ type });
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
    const { isShowTime } = this.props;

    let SelectTime = '';
    if (isShowTime) {
      SelectTime = (
        <Radio.Group defaultValue="1" buttonStyle="solid" onChange={this.changeTime} className="ui-mr20">
          {
                Object.keys(FILTER_TIME).map((value) => <Radio.Button value={value} key={value}>{FILTER_TIME[value]}</Radio.Button>)
            }
        </Radio.Group>
        );
    }

    return (
      <>
        <div className="ui-mb20">
          <SelectProjects change={this.changeProject} />
          <Select defaultValue="选择错误类别" style={{ width: 160 }} onChange={this.changeType} className="ui-mr20">
            {
              Object.keys(ERROR_TYPE).map((value) => <Option value={value} key={value}>{ERROR_TYPE[value]}</Option>)
          }
          </Select>
        </div>
        <div className="ui-mb20">
          <RangePicker onChange={this.changeDate} className="ui-mr20" showTime={{ format: 'HH:mm' }} format="YYYY-MM-DD HH:mm" />
          {SelectTime}
          <Button onClick={this.onSubmit} type="primary">查询</Button>
        </div>
      </>
    );
  }
}

Filter.propTypes = {
    submit: PropTypes.func.isRequired,
    isShowTime: PropTypes.bool.isRequired,
};

export default Filter;
