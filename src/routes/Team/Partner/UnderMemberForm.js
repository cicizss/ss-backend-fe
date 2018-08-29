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
} from 'antd';
import moment from 'moment';
import { connect } from 'dva';
import TableForm from '../../Forms/TableForm';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';

const FormItem = Form.Item;
const { Option } = Select;
const { TextArea } = Input;

const UnderMemberForm = Form.create()(props => {
  const { modalVisible, form, handleCreate, handleModalVisible } = props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
    });
  };

  const columns = [
    {
      title: '顾问ID',
      dataIndex: 'no',
    },
    {
      title: '姓名',
      dataIndex: 'name',
    },
    {
      title: '性别',
      dataIndex: 'sex',
    },
    {
      title: '级别',
      dataIndex: 'level',
    },
    {
      title: '直属上级',
      dataIndex: 'superior',
    },
    {
      title: '证件号',
      dataIndex: 'code',
    },
    {
      title: '手机号',
      dataIndex: 'phone',
    },
    {
      title: '注册时间',
      dataIndex: 'regTime',
    },
  ];

  const renderForm = (
    <Row>
      <Col span={5}>
        <FormItem labelCol={{ span: 8 }} wrapperCol={{ span: 15 }} label="顾问ID：">
          {form.getFieldDecorator('no')(<Input placeholder="请输入顾问ID" />)}
        </FormItem>
      </Col>
      <Col span={5}>
        <FormItem labelCol={{ span: 8 }} wrapperCol={{ span: 15 }} label="姓名：">
          {form.getFieldDecorator('name')(<Input placeholder="请输入姓名" />)}
        </FormItem>
      </Col>
      <Col span={5}>
        <FormItem labelCol={{ span: 8 }} wrapperCol={{ span: 15 }} label="证件号：">
          {form.getFieldDecorator('code')(<Input placeholder="请输入证件号" />)}
        </FormItem>
      </Col>
      <Col span={5}>
        <FormItem labelCol={{ span: 8 }} wrapperCol={{ span: 15 }} label="手机号：">
          {form.getFieldDecorator('phone')(<Input placeholder="请输入手机号" />)}
        </FormItem>
      </Col>
      <Col offset={1} span={3}>
        <div style={{ overflow: 'hidden' }}>
          <Button type="primary" htmlType="submit">
            查询
          </Button>
        </div>
      </Col>
    </Row>
  );

  return (
    <Modal
      title="顾问ID：   姓名：   级别：   "
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleModalVisible()}
      width={1024}
    >
      {renderForm}
      <Card title="直属成员" bordered={false}>
        {form.getFieldDecorator('members', {})(<Table loading={false} columns={columns} />)}
      </Card>
    </Modal>
  );
});

export default UnderMemberForm;
