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

  const columns = useMemo(() => [
    {
      title: "用户名",
      dataIndex: "username",
    },
    {
      title: "头像",
      dataIndex: "headPic",
      render: (value) => {
        return value ? <Image width={50} src={`${baseURL}/${value}`} /> : ""
      },
    },
    {
      title: "昵称",
      dataIndex: "nickName",
    },
    {
      title: "邮箱",
      dataIndex: "email",
    },
    {
      title: "状态",
      dataIndex: "isFrozen",
      render: (text) =>
        text ? <Badge status="success">已冻结</Badge> : "",
    },
    {
      title: "注册时间",
      dataIndex: "createTime",
    },
    {
      title: "操作",
      render: (_, record) => (
        <a
          href="#"
          onClick={() => {
            freezeUser(record)
          }}
        >
          冻结
        </a>
      ),
    },
  ])

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

  // 冻结用户
  const freezeUser = async (record) => {
    const { id, isFrozen } = record
    if (isFrozen) return
    await freeze({ id })
    getList()
  }
  return (
    <div id="userManage-container">
      <div className="userManage-form">
        <FilterForm getList={getList} />
      </div>
      <div className="userManage-table">
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
