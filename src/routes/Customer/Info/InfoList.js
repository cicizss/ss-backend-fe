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
import CreateInfoForm from './CreateInfoForm';
import DetailInfoForm from './DetailInfoForm';
// import EditPartnerForm from './EditPartnerForm';
// import UnderMemberForm from './UnderMemberForm';
// import RelationTreeForm from './RelationTreeForm';

import styles from './InfoList.less';


const FormItem = Form.Item;
const { Option } = Select;
const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');
const statusMap = ['default', 'processing', 'success', 'error'];
const status = ['正常', '正在审核', '已解约'];
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;


@connect(({ team, loading }) => ({
  team,
  loading: loading.models.team,
}))
@Form.create()
export default class InfoList extends PureComponent {
  state = {
    createModalVisible: false,
    editModalVisible: false,
    underModalVisible: false,
    relationModalVisible: false,
    expandForm: false,
    selectedRows: [],
    formValues: {},
    currentRowData:{}
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'team/fetch',
    });
  }

  onChange=(date, dateString)=> {
    console.log(date, dateString);
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

  toggleForm = () => {
    this.setState({
      expandForm: !this.state.expandForm,
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
  handleDetailModalVisible = (flag , currentRowData = {})=> {

    this.setState({
      detailModalVisible: !!flag,
      currentRowData,
    });
  };
  handleEditModalVisible = flag => {
    this.setState({
      editModalVisible: !!flag,
    });
  };

  handleUnderModalVisible = flag => {
    this.setState({
      underModalVisible: !!flag,
    });
  };

  handleRelationModalVisible = flag => {
    this.setState({
      relationModalVisible: !!flag,
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
          <Col md={5} sm={24}>
            <div style={{marginLeft:10}}>
              <div>按客户信息查找</div>
              <FormItem label="客户ID：">
                {getFieldDecorator('no')(<Input placeholder="请输入客户ID" />)}
              </FormItem>
              <FormItem label="手机号：">
                {getFieldDecorator('name')(<Input placeholder="请输入手机号" />)}
              </FormItem>
            </div>
          </Col>



          <Col md={5} sm={24}>
            <div>
              <div>按理财顾问信息查找</div>
              <FormItem label="理财顾问：">
                {getFieldDecorator('code')(<Input placeholder="请输入姓名" />)}
              </FormItem>
              <FormItem label="客户来源：">
                {getFieldDecorator('phone')(<Input placeholder="请输入姓名" />)}
              </FormItem>
            </div>
          </Col>
          <Col md={5} sm={24}>
            <div>
              <div>按服务信息查找</div>
              <FormItem label="服务人：">
                {getFieldDecorator('code')(<Input placeholder="请输入姓名" />)}
              </FormItem>
              <FormItem label="管理人：">
                {getFieldDecorator('phone')(<Input placeholder="请输入姓名" />)}
              </FormItem>
            </div>
          </Col>
          <Col md={5} sm={24}>
            <div>
              <div>按时间搜索查找</div>
              <FormItem label="服务人：">
                {getFieldDecorator('code')(  <DatePicker onChange={this.onChange} />
                )}
              </FormItem>

            </div>
          </Col>

          <Col md={4} sm={24}>
            <div style={{ marginTop:83,marginLeft:-207}}>
            <span>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              </span>
              <span>
              <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                导出
              </Button>
              </span>
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
      selectedRows,
      createModalVisible,
      editModalVisible,
      underModalVisible,
      relationModalVisible,
    } = this.state;

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
        title: '证件号',
        dataIndex: 'code',
      },
      {
        title: '手机号',
        dataIndex: 'phone',
      },
      {
        title: '性别',
        dataIndex: 'sex',
      },
      {
        title: '是否达到展业条件',
        dataIndex: 'condition',
      },
      {
        title: '级别',
        dataIndex: 'level',
      },
      {
        title: '签约时间',
        dataIndex: 'signTime',
      },
      {
        title: '操作',
        render: val => {
          // if (val.status === 0) {
          //   return (
          //     <Fragment>
          //       <a onClick={() => this.handleEditModalVisible(true)}>编辑</a>
          //       <Divider type="vertical" />
          //       <a>解约</a>
          //       <Divider type="vertical" />
          //       <a onClick={() => this.handleUnderModalVisible(true)}>直属成员</a>
          //       <Divider type="vertical" />
          //       <a onClick={() => this.handleRelationModalVisible(true)}>关系图</a>
          //     </Fragment>
          //   );
          // } else if (val.status === 1) {
          return (
            <Fragment>
              <a onClick={() => this.handleDetailModalVisible(true)}>详情</a>
              <Divider type="vertical" />

            </Fragment>
          );
          // } else return null;
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
    };

    const parentDetailMethods = {
      handleDetail: this.handleCreate,
      handleModalVisible: this.handleDetailModalVisible,
    };
    const parentEditMethods = {
      handleEdit: this.handleEdit,
      handleModalVisible: this.handleEditModalVisible,
    };

    const parentUnderMethods = {
      handleModalVisible: this.handleUnderModalVisible,
    };

    const parentRelationMethods = {
      handleModalVisible: this.handleRelationModalVisible,
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
        <CreateInfoForm {...parentCreateMethods}  />
        <DetailInfoForm {...parentDetailMethods}  />
        {/* <EditPartnerForm {...parentEditMethods} modalVisible={editModalVisible} /> */}*/*/*/
        {/* <UnderMemberForm {...parentUnderMethods} modalVisible={underModalVisible} /> */}
        {/* <RelationTreeForm {...parentRelationMethods} modalVisible={relationModalVisible} /> */}
      </PageHeaderLayout>
    );
  }
}
