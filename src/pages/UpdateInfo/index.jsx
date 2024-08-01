import { Button, Form, Input, message } from "antd"
import { useForm } from "antd/es/form/Form"
import { useCallback } from "react"
import "./index.css"
import { useNavigate } from "react-router-dom"
import UploadImage from "../../components/UploadImage"
import { upload } from "../../request/services"
import { baseURL } from "../../request"
import { useState } from "react"

const layout1 = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
}

export default function UpdateInfo() {
  const [form] = useForm()
  const navigate = useNavigate()

  const [imgUrl, setImgUrl] = useState('')
  const onFinish = useCallback(async (values) => {}, [])
  
  // 上传头像
  const uploadAvatar = async (file) => {
    const res = await upload(file)
    if (res.message === 'success') {
      console.log(`${baseURL}/${res.data.imgUrl}`)
      setImgUrl(`${baseURL}/${res.data.imgUrl}`)
    }
  }
  return (
    <div id="updateInfo-container">
      <Form
        form={form}
        {...layout1}
        onFinish={onFinish}
        colon={false}
        autoComplete="off"
      >
        <Form.Item
          label="头像"
          name="headPic"
          rules={[{ required: true, message: "请输入头像!" }]}
        >
          <UploadImage onUpload={uploadAvatar} imgUrl={imgUrl} />
        </Form.Item>

        <Form.Item
          label="昵称"
          name="nickName"
          rules={[{ required: true, message: "请输入昵称!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item {...layout1} label=" ">
          <Button className="btn" type="primary" htmlType="submit">
            修改
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}
