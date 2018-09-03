import React, { Fragment, PureComponent } from 'react';
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

@Form.create()
export default class OwnerChannelForm extends PureComponent {

  render() {

    const { currentRowData, modalVisible, form, handleModalVisible } = this.props;

    const columns = [
      {
        title: '渠道编号',
        dataIndex: 'no',
        key: 'no',
      },
      {
        title: '联系人',
        dataIndex: 'name',
      },
      {
        title: '渠道公司',
        dataIndex: 'sex',
      },
      {
        title: '签约公司',
        dataIndex: 'level',
      },
      {
        title: '累计标保',
        dataIndex: 'superior',
      },
      {
        title: '签约时间',
        dataIndex: 'code',
      },
    ];

    return (
      <Modal
        width={1024}
        title={`${currentRowData.realname}-归口渠道`}
        visible={modalVisible}
        onOk={() => handleModalVisible(false)}
        closable={false}
        footer={[
          <span style={{ float: 'left' }}>{`归口渠道${3}个，累计标保${4}元`}</span>,
          <Button type="primary" onClick={() => handleModalVisible(false)}>确定</Button>,
        ]}
      >
        <Table columns={columns} />
      </Modal>
    );
  }

}
