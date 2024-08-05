import { UserOutlined } from "@ant-design/icons"
import "./index.css"
import { useState } from "react"
import { baseURL, loginout } from "../../request"
import { Button } from "antd"
import Menu from "../../components/Menu"
import { useContext } from "react"
import { ContextStore } from "../../context"

export default function Home() {
  const { contextState, dispatch } = useContext(ContextStore)
  const { userInfo, menuType } = contextState
  const changeMenuType = (type) => {
    dispatch({
      type: 'update',
      payload: {
        menuType: type
      }
    })
  }
  return (
    <div id="index-container">
      <div className="header">
        <h1 style={{ cursor: "pointer" }} onClick={() => changeMenuType(2)}>
          会议室预定系统
        </h1>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div className="avatarBox" onClick={() => changeMenuType(1)}>
            {userInfo.headPic ? (
              <img
                className="userAvar"
                src={`${baseURL}/${userInfo.headPic}`}
              />
            ) : (
              <UserOutlined className="icon" />
            )}
          </div>
          <Button onClick={loginout} type="primary" danger>
            退出登录
          </Button>
        </div>
      </div>
      <div className="body">
        <Menu menuType={menuType} />
      </div>
    </div>
  )
}
