import { UserOutlined } from "@ant-design/icons"
import { Outlet } from "react-router-dom"
import "./index.css"
import { useEffect } from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { info } from "../../request/services"
import { baseURL } from "../../request"
import { useRef } from "react"

export default function Home() {
  const navigate = useNavigate()
  const userInfo = JSON.parse(window.localStorage.getItem('user_info') || {})
  console.log('userInfo', userInfo)
  const toUpdateInfo = () => navigate("/updateInfo")

  return (
    <div id="index-container">
      <div className="header">
        <h1>会议室预定系统</h1>
        <div onClick={toUpdateInfo}>
          {userInfo.headPic ? (
            <img className="userAvar" src={`${baseURL}/${userInfo.headPic}`} />
          ) : (
            <UserOutlined className="icon" />
          )}
        </div>
      </div>
      <div className="body">
        <Outlet></Outlet>
      </div>
    </div>
  )
}
