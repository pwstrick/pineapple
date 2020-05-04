import React from 'react';
import { Table } from 'antd';
import ProjectForm from './form';
import data from '../../common/data';

class Project extends React.Component {
    constructor(props) {
        super(props);
        this.columns = [
            {
                title: '项目名称',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: 'token',
                dataIndex: 'token',
                key: 'token',
            },
        ];
        this.state = {
            source: [],
        };
        this.updateProject = this.updateProject.bind(this);
    }

    componentDidMount() {
        data.getAllProjects().then((json) => {
            json.data.forEach((value) => {
                value.key = value.token;
            });
            this.setState({ source: json.data });
        });
    }

    updateProject(row) {
        const { source } = this.state;
        row.key = row.token;
        source.push(row);
        // console.log(row);
        this.setState({ source });
    }

    render() {
        const { source } = this.state;
        return (
          <>
            <div className="ui-mb20">
              <ProjectForm onCreate={this.updateProject} />
            </div>
            <Table dataSource={source} columns={this.columns} pagination={false} />
          </>
          );
    }
}

export default Project;
