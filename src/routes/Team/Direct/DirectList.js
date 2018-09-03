import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import {
  Row,
  Col,
  Card,
  Form,
  Input,
  Select,
  Icon,
  Button,
  Dropdown,
  Menu,
  InputNumber,
  DatePicker,
  Modal,
  message,
  Badge,
  Divider,
} from 'antd';
import StandardTable from 'components/StandardTable';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import table2excel from '../../../utils/table2excel';
import CreateDirectForm from './CreateDirectForm';
import EditDirectForm from './EditDirectForm';
import OwnerChannelForm from './OwnerChannelForm';
import OwnerPartnerForm from './OwnerPartnerForm';

import styles from './DirectList.less';

const { RangePicker } = DatePicker;
const FormItem = Form.Item;

const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');

@connect(({ team, loading }) => ({
  team,
  loading: loading.models.team,
}))
@Form.create()
export default class DirectList extends PureComponent {
  state = {
    createModalVisible: false,
    editModalVisible: false,
    ownerChannelModalVisible: false,
    ownerPartnerModalVisible: false,
    currentRowData: {},
    expandForm: false,
    selectedRows: [],
    formValues: {},
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'team/fetch',
    });
  }

  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const { dispatch } = this.props;
    const { formValues } = this.state;

    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = { ...obj };
      newObj[key] = getValue(filtersArg[key]);
      return newObj;
    }, {});

    const params = {
      currentPage: pagination.current,
      pageSize: pagination.pageSize,
      ...formValues,
      ...filters,
    };
    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }

    dispatch({
      type: 'team/fetch',
      payload: params,
    });
  };

  handleFormReset = () => {
    const { form, dispatch } = this.props;
    table2excel('testExcel');
    form.resetFields();
    this.setState({
      formValues: {},
    });
    dispatch({
      type: 'team/fetch',
      payload: {},
    });
  };

  handleMenuClick = e => {
    const { dispatch } = this.props;
    const { selectedRows } = this.state;

    if (!selectedRows) return;

    switch (e.key) {
      case 'remove':
        dispatch({
          type: 'team/remove',
          payload: {
            no: selectedRows.map(row => row.no).join(','),
          },
          callback: () => {
            this.setState({
              selectedRows: [],
            });
          },
        });
        break;
      default:
        break;
    }
  };

  handleSelectRows = rows => {
    this.setState({
      selectedRows: rows,
    });
  };

  handleSearch = e => {
    e.preventDefault();

    const { dispatch, form } = this.props;

    form.validateFields((err, fieldsValue) => {
      if (err) return;

      const values = {
        ...fieldsValue,
        updatedAt: fieldsValue.updatedAt && fieldsValue.updatedAt.valueOf(),
      };

      this.setState({
        formValues: values,
      });

      dispatch({
        type: 'team/fetch',
        payload: values,
      });
    });
  };

  handleCreateModalVisible = flag => {
    this.setState({
      createModalVisible: !!flag,
    });
  };

  handleEditModalVisible = (flag, currentRowData = {}) => {
    this.setState({
      currentRowData,
      editModalVisible: !!flag,
    });
  };

  handleOwnerChannelModalVisible = (flag, currentRowData = {}) => {
    this.setState({
      currentRowData,
      ownerChannelModalVisible: !!flag,
    });
  };

  handleOwnerPartnerModalVisible = (flag, currentRowData = {}) => {
    this.setState({
      currentRowData,
      ownerPartnerModalVisible: !!flag,
    });
  };

  handleCreate = fields => {
    this.props.dispatch({
      type: 'team/create',
      payload: {
        description: fields.desc,
      },
    });

    message.success('添加成功');
    this.setState({
      createModalVisible: false,
    });
  };

  handleEdit = fields => {
    this.props.dispatch({
      type: 'team/edit',
      payload: {
        description: fields.desc,
      },
    });

    message.success('编辑成功');
    this.setState({
      editModalVisible: false,
    });
  };

  renderForm() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }} type="flex" justify="end">
          <Col md={9} sm={24}>
            <FormItem label="选择查询日期：">
              {getFieldDecorator('date')(<RangePicker />)}
            </FormItem>
          </Col>
          <Col md={5} sm={24}>
            <div style={{ overflow: 'hidden' }}>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                导出
              </Button>
            </div>
          </Col>
        </Row>
      </Form>
    );
  }

  render() {
    const {
      team: { data },
      loading,
    } = this.props;
    const {
      currentRowData,
      selectedRows,
      createModalVisible,
      editModalVisible,
      ownerChannelModalVisible,
      ownerPartnerModalVisible,
    } = this.state;

    const columns = [
      {
        title: '员工号',
        dataIndex: 'richeid',
      },
      {
        title: '姓名',
        dataIndex: 'realname',
      },
      {
        title: '岗位',
        dataIndex: 'jobs',
      },
      {
        title: '所在公司',
        dataIndex: 'company',
      },
      {
        title: '归口事业合伙人',
        // dataIndex: 'ownerpartner',
        render: val => (
          <div>
            <div>{`${val.ownerpartner || 0}人`}</div>
            <a onClick={() => this.handleOwnerPartnerModalVisible(true, val)}>点击查看</a>
          </div>
        ),
      },
      {
        title: '归口渠道',
        // dataIndex: 'ownerchannel',
        render: val => (
          <div>
            <div>{`${val.ownerchannel || 0}人`}</div>
            <a onClick={() => {
              this.handleOwnerChannelModalVisible(true, val);
            }}
            >点击查看
            </a>
          </div>
        ),
      },
      {
        title: '个人完成标保',
        dataIndex: 'grwcbb',
      },
      {
        title: '事业合伙人标保',
        dataIndex: 'syhhrbb',
      },
      {
        title: '渠道标保',
        dataIndex: 'qdbb',
      },
      {
        title: '考核标保业绩',
        dataIndex: 'khbbyj',
      },
      {
        title: '操作',
        render: val => {
          return (
            <Fragment>
              <a onClick={() => this.handleEditModalVisible(true, val)}>编辑</a>
              <Divider type="vertical" />
              <a>解约</a>
              <Divider type="vertical" />
            </Fragment>
          );
        },
      },
    ];

    const menu = (
      <Menu onClick={this.handleMenuClick} selectedKeys={[]}>
        <Menu.Item key="remove">删除</Menu.Item>
        <Menu.Item key="approval">批量审批</Menu.Item>
      </Menu>
    );

    const parentCreateMethods = {
      handleCreate: this.handleCreate,
      handleModalVisible: this.handleCreateModalVisible,
      modalVisible: createModalVisible,
    };

    const parentEditMethods = {
      handleEdit: this.handleEdit,
      handleModalVisible: this.handleEditModalVisible,
      modalVisible: editModalVisible,
      currentRowData,
    };

    const parentOwnerChannelMethods = {
      handleModalVisible: this.handleOwnerChannelModalVisible,
      modalVisible: ownerChannelModalVisible,
      currentRowData,
    };

    const parentOwnerPartnerMethods = {
      handleModalVisible: this.handleOwnerPartnerModalVisible,
      modalVisible: ownerPartnerModalVisible,
      currentRowData,
    };

    return (
      <PageHeaderLayout>
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderForm()}</div>
            <div className={styles.tableListOperator}>
              <Button
                icon="plus"
                type="primary"
                onClick={() => this.handleCreateModalVisible(true)}
              >
                新增
              </Button>
              {selectedRows.length > 0 && (
                <span>
                  <Button>批量操作</Button>
                  <Dropdown overlay={menu}>
                    <Button>
                      更多操作 <Icon type="down" />
                    </Button>
                  </Dropdown>
                </span>
              )}
            </div>
            <StandardTable
              selectedRows={selectedRows}
              loading={loading}
              data={data}
              columns={columns}
              onSelectRow={this.handleSelectRows}
              onChange={this.handleStandardTableChange}
            />
          </div>
        </Card>
        <CreateDirectForm {...parentCreateMethods} />
        <EditDirectForm {...parentEditMethods} />
        <OwnerChannelForm {...parentOwnerChannelMethods}  />
        <OwnerPartnerForm {...parentOwnerPartnerMethods} />
      </PageHeaderLayout>
    );
  }
}
