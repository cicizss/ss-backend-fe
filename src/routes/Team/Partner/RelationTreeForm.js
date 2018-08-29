import React, { Fragment } from 'react';
import {
  Form,
  Modal,
  Row,
  Col,
  Input,
  Select,
  Checkbox,
  Button,
  Icon,
  Badge,
  Divider,
  Table,
  Card,
  Tree,
} from 'antd';
import moment from 'moment';
import { connect } from 'dva';
import TableForm from '../../Forms/TableForm';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';

const FormItem = Form.Item;
const { Option } = Select;
const { TextArea } = Input;

const { TreeNode } = Tree;

const RelationTreeForm = Form.create()(props => {
  const { modalVisible, form, handleCreate, handleModalVisible } = props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
    });
  };

  return (
    <Modal
      title="直属成员关系图"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleModalVisible()}
      width={600}
    >
      <Card title="顾问ID：   姓名：   级别：   " bordered={false}>
        <Tree defaultExpandAll>
          <TreeNode title="parent 1" key="0-0">
            <TreeNode title="parent 1-0" key="0-0-0" disabled>
              <TreeNode title="leaf" key="0-0-0-0" disableCheckbox />
              <TreeNode title="leaf" key="0-0-0-1" />
            </TreeNode>
            <TreeNode title="parent 1-1" key="0-0-1">
              <TreeNode title={<span style={{ color: '#1890ff' }}>sss</span>} key="0-0-1-0" />
            </TreeNode>
          </TreeNode>
        </Tree>
      </Card>
    </Modal>
  );
});

export default RelationTreeForm;
