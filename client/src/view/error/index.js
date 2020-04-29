import React from 'react';

class Error extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: 'Hello Error',
    };
  }

  render() {
    const { content } = this.state;
    return <div>{content}</div>;
  }
}

export default Error;
