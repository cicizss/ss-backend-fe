
import React, { PureComponent } from 'react';
import { Form, Modal, Row, Col, Input, Select, Checkbox, Icon } from 'antd';

const FormItem = Form.Item;
const { Option } = Select;
const { TextArea } = Input;

@Form.create()
export default class DetailInfoForm extends PureComponent {
  okHandle = () => {
    const { form, handleCreate } = this.props;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      handleCreate(fieldsValue);
    });
  };

  render() {
    const { modalVisible, form, handleModalVisible } = this.props;
    return (
      <Modal
        title="新增直销员工"
        visible={modalVisible}
        onOk={this.okHandle}
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
                rules: [{ required: true, message: '请选择性别...' }],
              })(
                <Select style={{ width: 120 }} placeholder="请选择性别">
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
          <Col span={12}>
            <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 15 }} label="岗位：">
              {form.getFieldDecorator('jobs', {
                rules: [{ required: true, message: '请输入岗位级别...' }],
              })(<Input placeholder="请输入岗位级别" />)}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 15 }} label="所在公司：">
              {form.getFieldDecorator('company', {
                rules: [{ required: true, message: '请选择所在公司...' }],
              })(
                <Select style={{ width: 232 }} placeholder="请选择所在公司">
                  <Option value="a">香港业禾</Option>
                  <Option value="b">湖北朔商</Option>
                </Select>
              )}
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
  }
}
