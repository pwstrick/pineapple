import React, { useState } from 'react';
import {
 Button, Modal, Form, Input,
} from 'antd';
import PropTypes from 'prop-types';
import data from '../../common/data';

const CreateForm = ({ visible, onCreate, onCancel }) => {
    // const { visible, onCreate, onCancel } = props;
    const [form] = Form.useForm();
    return (
      <Modal
        visible={visible}
        title="创建项目"
        okText="确定"
        cancelText="取消"
        onCancel={onCancel}
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              form.resetFields();
              onCreate(values);
            })
            .catch(() => {
            //   console.log('Validate Failed:', info);
            });
        }}
      >
        <Form
          form={form}
          layout="horizontal"
          name="form_in_modal"
          initialValues={{
            modifier: 'public',
          }}
        >
          <Form.Item
            name="name"
            label="名称"
            rules={[
              {
                required: true,
                message: '请输入项目名称',
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    );
};
CreateForm.propTypes = {
    visible: PropTypes.bool.isRequired,
    onCreate: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
};

const ProjectForm = (props) => {
    const [visible, setVisible] = useState(false);
    // const { create } = props;

    const onCreate = (values) => {
    //   console.log('Received values of form: ', values);
      // 提交到后台
      data.createProject(values).then((json) => {
            if (json.code !== 0) {
                return;
            }
            props.onCreate(json.data);
            setVisible(false);
      });
    };

    return (
      <>
        <Button
          type="primary"
          onClick={() => {
            setVisible(true);
          }}
        >
          创建
        </Button>
        <CreateForm
          visible={visible}
          onCreate={onCreate}
          onCancel={() => {
            setVisible(false);
          }}
        />
      </>
    );
  };

ProjectForm.propTypes = {
    onCreate: PropTypes.func.isRequired,
};
  export default ProjectForm;
