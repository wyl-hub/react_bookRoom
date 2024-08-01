import { UserOutlined } from "@ant-design/icons";
import { Outlet } from "react-router-dom";
import './index.css';

export default function Home() {
    return <div id="index-container">
        <div className="header">
            <h1>会议室预定系统</h1>
            <UserOutlined className="icon"/>
        </div>
        <div className="body">
            <Outlet></Outlet>
        </div>
    </div>
}