import { Button, Form, Input, message } from "antd"
import { useForm } from "antd/es/form/Form"
import { useCallback } from "react"
import "./index.css"
import { useNavigate } from "react-router-dom"
import UploadImage from "../../components/UploadImage"
import { info, update, upload } from "../../request/services"
import { baseURL } from "../../request"
import { useState } from "react"
import { useEffect } from "react"
import { useContext } from "react"
import { ContextStore } from "../../context"

const layout1 = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
}

export default function UpdateInfo() {
  const { contextState, dispatch } = useContext(ContextStore)
  const [form] = useForm()
  const navigate = useNavigate()
  // 数据回显
  useEffect(() => {
    info().then((res) => {
      if (res.message === "success") {
        const userInfo = res.data
        form.setFieldValue("nickName", userInfo.nickName)
        if (userInfo.headPic) {
          form.setFieldValue("headPic", userInfo.headPic)
          setImgUrl(`${baseURL}/${userInfo.headPic}`)
        }
      }
    })
  }, [])

  const [imgUrl, setImgUrl] = useState("")
  
  const onFinish = useCallback(async (values) => {
    const res = await update(values)
    if (res.message === "success") {
      const userInfo = JSON.parse(window.localStorage.getItem("user_info"))
      userInfo.headPic = values.headPic
      userInfo.nickName = values.nickName
      window.localStorage.setItem("user_info", JSON.stringify(userInfo))
      dispatch({
        type: 'update',
        payload: {
          userInfo,
          menuType: 2
        }
      })
      setTimeout(() => {
        navigate("/userManager")
      }, 1500)
    }
  }, [])

  // 上传头像
  const uploadAvatar = async (file) => {
    const res = await upload(file)
    if (res.message === "success") {
      setImgUrl(`${baseURL}/${res.data.imgUrl}`)
      form.setFieldValue("headPic", res.data.imgUrl)
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
