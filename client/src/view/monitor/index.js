import React from 'react';
import { DatePicker } from 'antd';

class Monitor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: 'Hello Monitor',
    };
  }

  render() {
    const { content } = this.state;
    return (
      <div>
        {content}
        <DatePicker />
      </div>
);
  }
}

export default Monitor;
