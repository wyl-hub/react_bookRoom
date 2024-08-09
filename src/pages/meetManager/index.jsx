import { Table, Badge, Button } from "antd"
import "./index.css"
import { useEffect } from "react"
import { deleteMeet, getMeetList } from "../../request/services"
import { useState } from "react"
import FilterForm from "./components/FilterForm"
import { removeEmptStr } from "../../util"
import { useMemo } from "react"
import { Popconfirm } from "antd"
import CreateModal from "./components/CreateModal"
import UpdateModal from "./components/UpdateModal"

export default function UserManage() {
  const [filterData, setFilterData] = useState({
    pageNo: 1,
    pageSize: 2,
  })
  const [tableList, setList] = useState([])
  const [total, setTotal] = useState(0)
  // 创建会议室
  const [isOpen, setOpen] = useState(false)
  // 更新会议室 当前更新会议室id
  const [isUpdate, setUpdate] = useState(false)
  const [currentId, setCurrentId] = useState(null)
  useEffect(() => {
    getList()
  }, [])

  const columns = useMemo(
    () => [
      {
        title: "名称",
        dataIndex: "name",
      },
      {
        title: "容纳人数",
        dataIndex: "capacity",
      },
      {
        title: "位置",
        dataIndex: "location",
      },
      {
        title: "设备",
        dataIndex: "equipment",
      },
      {
        title: "描述",
        dataIndex: "description",
      },
      {
        title: "添加时间",
        dataIndex: "createTime",
      },
      {
        title: "上次更新时间",
        dataIndex: "updateTime",
      },
      {
        title: "预定状态",
        dataIndex: "isBooked",
        render: (_, record) =>
          record.isBooked ? (
            <Badge status="error">已被预订</Badge>
          ) : (
            <Badge status="success">可预定</Badge>
          ),
      },
      {
        title: "操作",
        render: (_, record) => (
          <>
            <Popconfirm
              title="会议室删除"
              description="确认删除吗？"
              onConfirm={() => handleDelete(record.id)}
              okText="Yes"
              cancelText="No"
            >
              <a href="#">删除</a>
            </Popconfirm>
            <br />
            <a
              href="#"
              onClick={() => {
                setUpdate(true)
                setCurrentId(record.id)
              }}
            >
              更新
            </a>
          </>
        ),
      },
    ],
    []
  )

  const changePage = (pageNo) => {
    getList({
      ...filterData,
      pageNo,
    })
  }

  // 点击搜索 修改筛选表单
  const changFilterForm = (payload) => {
    setFilterData({
      ...filterData,
      ...payload,
    })
  }
  // 查询列表
  const getList = async (obj = filterData) => {
    const params = removeEmptStr(obj)
    // 保存筛选条件
    changFilterForm(params)
    const res = await getMeetList({
      pageSize: filterData.pageSize,
      ...params,
    })
    if (res.message === "success") {
      const { list, totalCount } = res.data
      list.forEach((item) => (item.key = item.id))
      setList(list)
      setTotal(totalCount)
    }
  }
  // 删除会议室
  const handleDelete = async (id) => {
    const res = await deleteMeet(id)
    if (res.message === 'success') {
      getList()
    }
  }
  return (
    <div id="meetManage-container">
      <div className="userManage-form">
        <FilterForm getList={getList} />
        <Button onClick={() => setOpen(true)}>添加会议室</Button>
      </div>
      <div className="meetManage-table">
        <Table
          columns={columns}
          dataSource={tableList}
          pagination={{
            pageSize: filterData.pageSize,
            current: filterData.pageNo,
            total: total,
            onChange: changePage,
          }}
        />
      </div>
      {/* 创建会议室 */}
      <CreateModal
        isOpen={isOpen}
        handleClose={() => setOpen(false)}
        getList={getList}
      />
      {/* 更新会议室 */}
      <UpdateModal
        isOpen={isUpdate}
        handleClose={() => setUpdate(false)}
        currentId={currentId}
        getList={getList}
      />
    </div>
  )
}
