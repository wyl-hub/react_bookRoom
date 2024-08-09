import { Button, Form, Input, InputNumber, Modal } from "antd"
import { useForm } from "antd/es/form/Form"
import TextArea from "antd/es/input/TextArea"
import { useCallback } from "react"
import { createMeetRoom } from "../../../../request/services"

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
}

export default function CreateModal(props) {
  const [form] = useForm()

  const handleOk = useCallback(async function () {
    form.validateFields().then(async values => {
      console.log('values', values)
      const res = await createMeetRoom(values)
      if (res.message === 'success') {
        props.handleClose()
        props.getList()
        form.resetFields()
      }
    }).catch(e => {
      console.log('e', e)
    })
  }, [])

  return (
    <Modal
      title="创建会议室"
      open={props.isOpen}
      onOk={handleOk}
      onCancel={() => props.handleClose()}
      okText={"创建"}
    >
      <Form form={form} colon={false} {...layout}>
        <Form.Item
          label="会议室名称"
          name="name"
          rules={[{ required: true, message: "请输入会议室名称!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="位置"
          name="location"
          rules={[{ required: true, message: "请输入会议室位置!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="容纳人数"
          name="capacity"
          rules={[
            { type: "number", required: true, message: "请输入会议室容量!" },
          ]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item label="设备" name="equipment">
          <Input />
        </Form.Item>
        <Form.Item label="描述" name="description">
          <TextArea />
        </Form.Item>
      </Form>
    </Modal>
  )
}
