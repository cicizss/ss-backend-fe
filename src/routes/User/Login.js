import React, { Component } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Checkbox, Alert, Icon, Input } from 'antd';
import Login from 'components/Login';
import styles from './Login.less';

const { Tab, UserName, Password, Mobile, Captcha, Submit, Yanzhengma } = Login;

@connect(({ login, loading }) => ({
  login,
  submitting: loading.effects['login/login'],
}))
export default class LoginPage extends Component {
  state = {
    type: 'account',
    autoLogin: true,
    ...this.initState(),
    refresh: false,
  };

  initState() {
    return {
      data: this.getRandom(109, 48, 4),
      rotate: this.getRandom(75, -75, 4),
      fz: this.getRandom(15, 30, 8),
      color: [this.getRandom(100, 255, 3), this.getRandom(100, 255, 4), this.getRandom(100, 255, 3), this.getRandom(100, 255, 3)],
    };
  }

  getRandom(max, min, num) {
    const asciiNum = ~~(Math.random() * (max - min + 1) + min);
    if (!Boolean(num)) {
      return asciiNum;
    }
    const arr = [];
    for (let i = 0; i < num; i++) {
      arr.push(this.getRandom(max, min));
    }
    return arr;
  }

  canvas() {
    const { getRandom } = this;
    const canvas = document.getElementById('bgi');
    let ctx = canvas.getContext('2d');
    canvas.height = canvas.height;
    // ctx.clearRect(0, 0, canvas.width(), canvas.height())
    ctx.strokeStyle = `rgb(${this.getRandom(100, 10, 3).toString()})`;
    for (let i = 0; i < 7; i++) {
      ctx.lineTo(getRandom(200, 0), getRandom(200, 10));
      ctx.moveTo(getRandom(200, 0), getRandom(200, 0));
      ctx.stroke();
    }
  }

  componentDidMount() {
    this.canvas();
  }

  onTabChange = type => {
    this.setState({ type });
  };

  handleSubmit = (err, values) => {
    const { type } = this.state;
    const { dispatch } = this.props;
    if (!err) {
      dispatch({
        type: 'login/login',
        payload: {
          ...values,
          type,
        },
      });
    }
  };

  changeAutoLogin = e => {
    this.setState({
      autoLogin: e.target.checked,
    });
  };

  renderMessage = content => {
    return <Alert style={{ marginBottom: 24 }} message={content} type="error" showIcon/>;
  };

  render() {
    const { login, submitting } = this.props;
    const { type, autoLogin, rotate, fz, color } = this.state;
    return (
      <div className={styles.main}>
        <Login defaultActiveKey={type} onTabChange={this.onTabChange} onSubmit={this.handleSubmit}>
          <UserName name="userName" placeholder="admin/user"/>
          <Password name="password" placeholder="888888/123456"/>

          {/*<Tab key="mobile" tab="手机号登录">*/}
          {/*{login.status === 'error' &&*/}
          {/*login.type === 'mobile' &&*/}
          {/*!submitting &&*/}
          {/*this.renderMessage('验证码错误')}*/}
          {/*<Mobile name="mobile" />*/}
          {/*<Captcha name="captcha" />*/}

          {/*</Tab>*/}
          <div>
            <Yanzhengma name="yanzhengma" style={{ width: 242 }}/>
          </div>
          <div className='vcodewrap' style={{
            height: 40,
            width: 100,
            marginLeft: 265,
            textAlign: 'center', marginTop: -65, backgroundColor: 'white', border: '1px solid #EBEBEB',
          }}>
            <canvas id="bgi" width="50" height="50" style={{ display: 'none' }}></canvas>
            {this.state.data.map((v, i) =>
              <div
                key={i}
                className='itemStr'
                style={{
                  transform: `rotate(${rotate[i]}deg)`,
                  fontSize: `${fz[i]}px`,
                  color: `rgb(${color[i].toString()})`,
                  display: 'inline-block',
                  textAlign: 'center',
                  letterSpacing: 7,
                }}
                onMouseEnter={() => this.setState({ refresh: true })}
              >
                {String.fromCharCode(v > 57 && v < 84 ? v + 7 : (v < 57 ? v : v + 13))}
              </div>,
            )}

          </div>
          <div>
            {
              this.state.refresh
                ? <div
                  className='mask'
                  style={{ float: 'right', marginTop: -21, marginRight: -127 }}
                  onClick={() => {
                    this.setState({ ...this.initState(), refresh: false });
                    this.canvas();
                  }}
                  onMouseLeave={() => {
                    this.setState({ refresh: false });
                  }}
                > 看不清？点击刷新
                </div>
                : null}
          </div>
          <div style={{ marginTop: 16 }}>
            <Checkbox checked={autoLogin} onChange={this.changeAutoLogin}>
              自动登录
            </Checkbox>
            <a style={{ float: 'right' }} href="">
              忘记密码
            </a>
          </div>
          <Submit loading={submitting}>登录</Submit>
          {/*<div className={styles.other}>*/}
          {/*其他登录方式*/}
          {/*<Icon className={styles.icon} type="alipay-circle" />*/}
          {/*<Icon className={styles.icon} type="taobao-circle" />*/}
          {/*<Icon className={styles.icon} type="weibo-circle" />*/}
          {/*<Link className={styles.register} to="/user/register">*/}
          {/*注册账户*/}
          {/*</Link>*/}
          {/*</div>*/}
        </Login>
      </div>
    );
  }
}
