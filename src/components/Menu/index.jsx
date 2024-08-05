import { Outlet } from "react-router-dom"
import { Menu as AntdMenu } from "antd"
import "./index.css"
import { router } from "../../main"
import { useEffect } from "react"
import { useState } from "react"

const menu1 = [
  {
    key: "/updateInfo",
    label: "信息修改",
  },
  {
    key: "/updatePassword",
    label: "密码修改",
  },
]

const menu2 = [
  {
    key: "/meetManager",
    label: "会议室管理",
  },
  {
    key: "4",
    label: "预定管理",
  },
  {
    key: "/userManager",
    label: "用户管理",
  },
  {
    key: "6",
    label: "统计",
  },
]



export default function Menu({ menuType }) {
  const [menuList, setMenuList] = useState(menu2)
  const [activeKey, setActiveKey] = useState('/updatePassword')
  useEffect(() => {
    if (menuType === 1) {
      setMenuList(menu1)
      handleMenuItemClick({ key: menu1[0].key })
    }
    if (menuType === 2) {
      setMenuList(menu2)
      handleMenuItemClick({ key: menu2[0].key })
    }
  }, [menuType])


  const handleMenuItemClick = (info) => {
    router.navigate(info.key)
    setActiveKey(info.key)
  }
  return (
    <div id="menu-container">
      <div className="menu-area">
        <AntdMenu
          onClick={handleMenuItemClick}
          selectedKeys={[activeKey]}
          items={menuList}
        />
      </div>
      <div className="content-area">
        <Outlet></Outlet>
      </div>
    </div>
  )
}
