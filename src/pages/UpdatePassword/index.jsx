import { Button, Form, Input, message } from "antd"
import { useForm } from "antd/es/form/Form"
import "./index.css"
import { useCallback } from "react"
import { Link, useNavigate } from "react-router-dom"
import SecondDown from "../../components/SecondDown"
import { getPrivateCaptcha, updatePassword } from "../../request/services"

const layout1 = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
}

export default function UpdatePassword() {
  const [form] = useForm()
  const navigate = useNavigate()

  const onFinish = useCallback(async (values) => {
    const res = await updatePassword(values)
    if (res.message === 'success') {
      setTimeout(() => {
        navigate('/login')
      }, 1000);
    }
  }, [])

  const getCaptcha = useCallback(async function () {
    const res = await getPrivateCaptcha()
    if (res.message === "success") {
      return true
    }
    return false
  }, [])

  return (
    <div id="updatePassword-container">
      <h1>会议室预订系统</h1>
      <Form
        form={form}
        {...layout1}
        onFinish={onFinish}
        colon={false}
        autoComplete="off"
      >
        <Form.Item
          label="密码"
          name="password"
          rules={[{ required: true, message: "请输入密码!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="确认密码"
          name="confirmPassword"
          dependencies={["password"]}
          rules={[
            { required: true, message: "请输入确认密码!" },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve()
                }
                return Promise.reject("两次密码不相同")
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <div className="captcha-wrapper">
          <Form.Item
            label="验证码"
            name="captcha"
            rules={[{ required: true, message: "请输入验证码!" }]}
          >
            <Input />
          </Form.Item>
          <SecondDown onComplete={getCaptcha} />
        </div>

        <Form.Item {...layout1} label=" ">
          <Button className="btn" type="primary" htmlType="submit">
            修改
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}
