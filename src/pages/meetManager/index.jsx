import { Table, Badge, Image } from "antd"
import "./index.css"
import { useEffect } from "react"
import { freeze, getUserList } from "../../request/services"
import { useState } from "react"
import FilterForm from "./components/FilterForm"
import { removeEmptStr } from "../../util"
import { baseURL } from "../../request"
import { useMemo } from "react"

export default function UserManage() {
  const [filterData, setFilterData] = useState({
    pageNo: 1,
    pageSize: 2,
  })
  const [tableList, setList] = useState([])
  const [total, setTotal] = useState(0)

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
          <a href="#" onClick={() => {}}>
            删除
          </a>
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
    const res = await getUserList({
      pageSize: filterData.pageSize,
      ...params,
    })
    if (res.message === "success") {
      const { list, totalCount } = res.data
      list.forEach((item) => (item.key = item.username))
      setList(list)
      setTotal(totalCount)
    }
  }

  return (
    <div id="meetManage-container">
      <div className="userManage-form">
        <FilterForm getList={getList} />
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
    </div>
  )
}
