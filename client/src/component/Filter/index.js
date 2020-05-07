import React, { useState, useEffect } from 'react';
import {
    Select,
} from 'antd';
import PropTypes from 'prop-types';
import data from '../../common/data';

export default function SelectProjects(props) {
  const { Option } = Select;
  const [list, setList] = useState([]);
  useEffect(() => {
    data.getAllProjects().then((json) => {
        setList(json.data);
    });
  }, []);
  const { change } = props;
  return (
    <Select defaultValue="选择项目" style={{ width: 160 }} className="ui-mr20" onChange={change}>
      {
            list.map((value) => <Option value={value.token} key={value.token}>{value.name}</Option>)
        }
    </Select>
  );
}

SelectProjects.propTypes = {
    change: PropTypes.func.isRequired,
};
