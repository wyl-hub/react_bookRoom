import { Form } from "antd"
import { Button, Input } from "antd"
import { useState } from "react"
import { useCallback } from "react"

export default function FilterForm({ getList }) {
  const onSearch = useCallback(async (values = {}) => {
    // 重置页码 查询列表
    getList({
      ...values,
      pageNo: 1
    })
  }, [])
  return (
    <Form
      onFinish={onSearch}
      name="search"
      layout="inline"
      colon={false}
    >
      <Form.Item label="用户名" name="username">
        <Input />
      </Form.Item>

      <Form.Item label="昵称" name="nickName">
        <Input />
      </Form.Item>

      <Form.Item
        label="邮箱"
        name="email"
        rules={[{ type: "email", message: "请输入合法邮箱地址!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item label=" ">
        <Button type="primary" htmlType="submit">
          搜索用户
        </Button>
      </Form.Item>
    </Form>
  )
}
