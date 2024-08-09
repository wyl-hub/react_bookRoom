import { Form } from "antd"
import { Button, Input } from "antd"
import { useState } from "react"
import { useCallback } from "react"

export default function FilterForm({ getList }) {
  const onSearch = useCallback(async (values = {}) => {
    // 重置页码 查询列表
    getList({
      ...values,
      pageNo: 1,
    })
  }, [])
  return (
    <Form onFinish={onSearch} name="search" layout="inline" colon={false}>
      <Form.Item label="会议室名称" name="name">
        <Input />
      </Form.Item>

      <Form.Item label="容量" name="capacity">
        <Input />
      </Form.Item>

      <Form.Item label="设备" name="equipment">
        <Input />
      </Form.Item>

      <Form.Item label=" ">
        <Button type="primary" htmlType="submit">
          搜索
        </Button>
      </Form.Item>
    </Form>
  )
}
