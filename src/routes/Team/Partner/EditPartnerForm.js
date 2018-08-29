import React from 'react';
import { Form, Modal, Row, Col, Input, Select, Checkbox, Button, Icon } from 'antd';

const FormItem = Form.Item;
const { Option } = Select;
const { TextArea } = Input;

const EditPartnerForm = Form.create()(props => {
  const { modalVisible, form, handleEdit, handleModalVisible } = props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      handleEdit(fieldsValue);
    });
  };
  return (
    <Modal
      title="编辑事业合伙人"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleModalVisible()}
      width={800}
    >
      <Row>
        <Col span={12}>
          <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="姓名：">
            {form.getFieldDecorator('name', {
              rules: [{ required: true, message: '请输入姓名...' }],
            })(<Input placeholder="请输入姓名" />)}
          </FormItem>
        </Col>
        <Col span={12}>
          <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="性别：">
            {form.getFieldDecorator('sex', {
              rules: [{ required: true, message: '请输入性别...' }],
            })(
              <Select style={{ width: 120 }} placeholder="请输入性别">
                <Option value="male">男</Option>
                <Option value="female">女</Option>
              </Select>
            )}
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="手机号：">
            {form.getFieldDecorator('phone', {
              rules: [{ required: true, message: '请输入手机号...' }],
            })(<Input placeholder="请输入手机号" />)}
          </FormItem>
        </Col>
        <Col span={12}>
          <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="证件号：">
            {form.getFieldDecorator('code', {
              rules: [{ required: true, message: '请输入证件号...' }],
            })(<Input placeholder="请输入证件号" />)}
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span={20}>
          <FormItem labelCol={{ span: 3 }} wrapperCol={{ span: 15 }} label="银行卡号：">
            {form.getFieldDecorator('bankno', {
              rules: [{ required: true, message: '请输入银行卡号...' }],
            })(<Input placeholder="请输入银行卡号" />)}
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span={3}>
          <FormItem labelCol={{ span: 1 }} wrapperCol={{ span: 20 }}>
            {form.getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true,
            })(<Checkbox>推荐人</Checkbox>)}
          </FormItem>
        </Col>
        <Col span={12}>
          <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="推荐人：">
            {form.getFieldDecorator('referees', {
              rules: [{ required: true, message: '请输入推荐人...' }],
            })(<Input placeholder="请输入推荐人" />)}
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="购买保单号：">
            {form.getFieldDecorator('policy', {
              rules: [{ required: false, message: '请输入购买保单号...' }],
            })(
              <div style={{ whiteSpace: 'nowrap' }}>
                &nbsp;
                <span>G89493400</span>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <span style={{ color: 'blue' }}>查看购买产品</span>
              </div>
            )}
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span={20}>
          <FormItem labelCol={{ span: 3 }} wrapperCol={{ span: 21 }} label="备注：">
            {form.getFieldDecorator('remark', {
              rules: [{ required: true, message: '请输入备注内容...' }],
            })(<TextArea placeholder="请输入备注内容" />)}
          </FormItem>
        </Col>
      </Row>
    </Modal>
  );
});

export default EditPartnerForm;
