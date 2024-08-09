import { Form, Input, InputNumber, Modal, message } from "antd"
import { useForm } from "antd/es/form/Form"
import TextArea from "antd/es/input/TextArea"
import { useEffect } from "react"
import { useCallback } from "react"
import { getInfoById, updateMeet } from "../../../../request/services"

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
}

export default function UpdateModal(props) {
  const [form] = useForm()

  useEffect(() => {
    if (props.currentId === null) return
    // 根据id搜索信息 回显
    getInfoById(props.currentId).then((res) => {
      const info = res.data
      form.setFieldsValue({
        name: info.name,
        location: info.location,
        capacity: info.capacity,
        equipment: info.equipment,
        description: info.description,
      })
    })
  }, [props.currentId])

  const handleOk = useCallback(async function () {
    form
      .validateFields()
      .then(async (values) => {
        const res = await updateMeet({
          id: props.currentId,
          ...values,
        })
        if (res.message === "success") {
          props.getList()
          props.handleClose()
        }
      })
      .catch((e) => {
        console.log("e", e)
      })
  }, [])

  return (
    <Modal
      title="创建会议室"
      open={props.isOpen}
      onOk={handleOk}
      onCancel={() => props.handleClose()}
      okText={"确定"}
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
