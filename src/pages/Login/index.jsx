import { Button, Checkbox, Form, Input } from "antd"
import { login } from "../../request/services"
import "./index.css"
import { message } from "antd"


const onFinish = async (values) => {
  const res = await login(values)
  if (res.message === 'success') {
    const { accessToken, refreshToken, userInfo } = res.data

    window.localStorage.setItem('access_token', accessToken)
    window.localStorage.setItem('refresh_token', refreshToken)
    window.localStorage.setItem('user_info', JSON.stringify(userInfo))
    message.success('登录成功')
  }
}

const layout1 = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
}

const layout2 = {
  labelCol: { span: 0 },
  wrapperCol: { span: 24 },
}

export default function Login() {
  return (
    <div id="login-container">
      <h1>会议室预订系统</h1>
      <Form {...layout1} onFinish={onFinish} colon={false} autoComplete="off">
        <Form.Item
          label="用户名"
          name="username"
          rules={[{ required: true, message: "请输入用户名!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="密码"
          name="password"
          rules={[{ required: true, message: "请输入密码!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item {...layout2}>
          <div className="links">
            <a href="">创建账号</a>
            <a href="">忘记密码</a>
          </div>
        </Form.Item>

        <Form.Item {...layout2}>
          <Button className="btn" type="primary" htmlType="submit">
            登录
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}
