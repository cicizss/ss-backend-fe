import React from 'react';
import { Form, Modal, Row, Col, Input, Select, Checkbox, Icon } from 'antd';

const FormItem = Form.Item;
const { Option } = Select;
const { TextArea } = Input;

const CreatePartnerForm = Form.create()(props => {
  const { modalVisible, form, handleCreate, handleModalVisible } = props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      handleCreate(fieldsValue);
    });
  };
  return (
    <Modal
      title="新增事业合伙人"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleModalVisible()}
      width={800}
    >
      <Row>
        <Col span={12}>
          <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 15 }} label="姓名：">
            {form.getFieldDecorator('realname', {
              rules: [{ required: true, message: '请输入姓名...' }],
            })(<Input placeholder="请输入姓名" />)}
          </FormItem>
        </Col>
        <Col span={12}>
          <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 15 }} label="性别：">
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
          <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 15 }} label="手机号：">
            {form.getFieldDecorator('tel', {
              rules: [{ required: true, message: '请输入手机号...' }],
            })(<Input placeholder="请输入手机号" />)}
          </FormItem>
        </Col>
        <Col span={12}>
          <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 15 }} label="证件号：">
            {form.getFieldDecorator('certifyNo', {
              rules: [{ required: true, message: '请输入证件号...' }],
            })(<Input placeholder="请输入证件号" />)}
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span={18}>
          <FormItem labelCol={{ span: 4 }} wrapperCol={{ span: 10 }} label="银行卡号：">
            {form.getFieldDecorator('bankcardid', {
              rules: [{ required: true, message: '请输入银行卡号...' }],
            })(<Input placeholder="请输入银行卡号" />)}
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span={18}>
          <FormItem labelCol={{ span: 4 }} wrapperCol={{ span: 10 }} label="归口服务人：">
            {form.getFieldDecorator('superior', {
              rules: [{ required: true, message: '请输入归口服务人...' }],
            })(<Input placeholder="请输入归口服务人姓名" />)}
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span={18}>
          <FormItem labelCol={{ span: 4}} wrapperCol={{ span: 15 }} label="购买保单号：">
            {form.getFieldDecorator('policyid', {
              rules: [{ required: true, message: '请输入购买保单号...' }],
            })(<Input placeholder="请输入购买保单号" />)}
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span={18}>
          <FormItem labelCol={{ span: 4 }} wrapperCol={{ span: 20 }} label="备注：">
            {form.getFieldDecorator('remark', {
              rules: [{ required: true, message: '请输入备注内容...' }],
            })(<TextArea placeholder="请输入备注内容" />)}
          </FormItem>
        </Col>
      </Row>
    </Modal>
  );
});

export default CreatePartnerForm;
