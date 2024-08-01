import { LoadingOutlined, PlusOutlined } from "@ant-design/icons"
import { message } from "antd"
import { Upload } from "antd"
import { useState } from "react"

// 上传图片限制大小 kb
const limtKB = 50

const beforeUpload = (file) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png"
  if (!isJpgOrPng) {
    message.error("文件格式不正确!")
  }
  const isLt2M = file.size / 1024 < limtKB
  if (!isLt2M) {
    message.error("文件不能超过50KB")
  }
  return isJpgOrPng && isLt2M
}

export default function UploadImage({ onUpload, imgUrl }) {
  const [loading, setLoading] = useState(false)
  const uploadButton = (
    <button
      style={{
        border: 0,
        background: "none",
      }}
      type="button"
    >
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </button>
  )
  const handleChange = (info) => {
    const file = info.file
    onUpload?.(file)
  }

  return (
    <div>
      <Upload
        name="avatar"
        listType="picture-circle"
        showUploadList={false}
        beforeUpload={beforeUpload}
        customRequest={handleChange}
      >
        {imgUrl ? (
          <img
            src={imgUrl}
            alt="avatar"
            style={{
              width: "100%",
              borderRadius: '50%'
            }}
          />
        ) : (
          uploadButton
        )}
      </Upload>
    </div>
  )
}
