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
        title: '序号',
        dataIndex: 'no',
        key: 'no',
      },
      {
        title: '姓名',
        dataIndex: 'name',
      },
      {
        title: '展业条件',
        dataIndex: 'sex',
      },
      {
        title: '签约公司',
        dataIndex: 'level',
      },
      {
        title: '团队人数',
        dataIndex: 'superior',
      },
      {
        title: '团队标保',
        dataIndex: 'code',
      },
      {
        title: '签约时间',
        dataIndex: 'time',
      },
    ];

    return (
      <Modal
        width={1024}
        visible={modalVisible}
        title={`${currentRowData.realname}-归口事业合伙人`}
        onOk={() => handleModalVisible(false)}
        closable={false}
        footer={[
          <span style={{ float: 'left' }}>{`事业合伙人${3}人，旗下财富团队${3}人，累计标保${3}元`}</span>,
          <Button type="primary" onClick={() => handleModalVisible(false)}>确定</Button>,
        ]}
      >
        <Table columns={columns} />
      </Modal>
    );
  }

}
