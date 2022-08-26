import "./style.css";
import React from "react";
import { Table } from 'antd';
import { Link } from "react-router-dom";
import { HiUserGroup } from "react-icons/hi";
import { FaUserCog } from "react-icons/fa";
import { MdVideoCameraFront } from "react-icons/md";
import { useHistory } from "react-router-dom";
const columns = [
    { title: 'USERNAME', dataIndex: 'name', key: 'name' },
    { title: 'DISPLAY NAME', dataIndex: 'disname', key: 'disname' },
    { title: 'EMAIL ADDRESS', dataIndex: 'email', key: 'email' },
    { title: 'ROLE', dataIndex: 'role', key: 'role' },
    {
        title: "SUBSCRIPTION", dataIndex: 'scription', key: 'scription', render: scription => (
            <>
                {
                    scription === "Free" ? <div style={{ background: "rgb(251, 243, 221)" }}>{scription}</div> : null
                }
                {
                    scription === "Mustang" ? <div style={{ background: "rgb(216, 237, 246)" }}>{scription}</div> : null
                }
                {
                    scription === "Pony" ? <div style={{ background: "rgb(208, 209, 206)" }}>{scription}</div> : null
                }
                {
                    scription === "Stallion" ? <div style={{ background: "rgb(239, 190, 91)" }}>{scription}</div> : null
                }
            </>
        ),
    },
    { title: "VIDEO PITCH", dataIndex: 'videopitch', key: 'videopitch' },
    { title: "SPONSORED HEADLINES", dataIndex: 'sponsored', key: 'sponsored' },
    { title: "EXCLUSIVE STARTUP BREEDERS", dataIndex: "breeders", key: 'breeders' },
    { title: "THOROUGHBRED DOMAINS", dataIndex: "domains", key: 'domains' },
    { title: "SOLD DOMAINS", dataIndex: "sold", key: 'sold' },

];

const data = [
    {
        key: 1,
        name: 'John Brown',
        disname: 'John Brown',
        email: '75superb@gmail.com',
        role: 'FREELANCER',
        scription: 'Free',
        videopitch: 'New',
        sponsored: '5 ORDERS - $240',
        breeders: "1 PROJECTS - $65,000",
        domains: 'Homemade.com + 5',
        sold: '4 sold - $15,000',
        description: "My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park."
    },
    {
        key: 2,
        name: 'John Brown',
        disname: 'John Brown',
        email: 'atsuperb@gmail.com',
        role: 'DOMAINER',
        scription: 'Mustang',
        videopitch: 'APPROVE',
        sponsored: '2 ORDERS - $40',
        breeders: "1 PROJECTS - $65,000",
        domains: 'Homemade.com + 5',
        sold: '4 sold - $15,000',
        description: "My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park."
    },
    {
        key: 3,
        name: 'John Brown',
        disname: 'John Brown',
        email: 'atsuperb@gmail.com',
        role: 'DOMAINER',
        scription: 'Pony',
        videopitch: 'DENY',
        sponsored: '3 ORDERS - $120',
        breeders: "1 PROJECTS - $65,000",
        domains: 'Homemade.com + 5',
        sold: '4 sold - $15,000',
        description: "My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park."
    },
    {
        key: 4,
        name: 'John Brown',
        disname: 'John Brown',
        email: 'netigirl@gmail.com',
        role: 'DOMAINER',
        scription: 'Stallion',
        videopitch: 'APPROVE',
        sponsored: '6 ORDERS - $180',
        breeders: "1 PROJECTS - $65,000",
        domains: 'Homemade.com + 5',
        sold: '4 sold - $15,000',
        description: "My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park."
    },
    {
        key: 5,
        name: 'John Brown',
        disname: 'John Brown',
        email: 'netigirl@gmail.com',
        role: 'DOMAINER',
        scription: 'Stallion',
        videopitch: 'APPROVE',
        sponsored: '6 ORDERS - $180',
        breeders: "1 PROJECTS - $65,000",
        domains: 'Homemade.com + 5',
        sold: '4 sold - $15,000',
        description: "My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park."
    },
    {
        key: 6,
        name: 'John Brown',
        disname: 'John Brown',
        email: 'netigirl@gmail.com',
        role: 'DOMAINER',
        scription: 'Stallion',
        videopitch: 'APPROVE',
        sponsored: '6 ORDERS - $180',
        breeders: "1 PROJECTS - $65,000",
        domains: 'Homemade.com + 5',
        sold: '4 sold - $15,000',
        description: "My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park."
    },
    {
        key: 7,
        name: 'John Brown',
        disname: 'John Brown',
        email: 'netigirl@gmail.com',
        role: 'DOMAINER',
        scription: 'Stallion',
        videopitch: 'APPROVE',
        sponsored: '6 ORDERS - $180',
        breeders: "1 PROJECTS - $65,000",
        domains: 'Homemade.com + 5',
        sold: '4 sold - $15,000',
        description: "My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park."
    },
    {
        key: 8,
        name: 'John Brown',
        disname: 'John Brown',
        email: 'netigirl@gmail.com',
        role: 'DOMAINER',
        scription: 'Stallion',
        videopitch: 'APPROVE',
        sponsored: '6 ORDERS - $180',
        breeders: "1 PROJECTS - $65,000",
        domains: 'Homemade.com + 5',
        sold: '4 sold - $15,000',
        description: "My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park."
    },
    {
        key: 9,
        name: 'John Brown',
        disname: 'John Brown',
        email: 'netigirl@gmail.com',
        role: 'DOMAINER',
        scription: 'Stallion',
        videopitch: 'APPROVE',
        sponsored: '6 ORDERS - $180',
        breeders: "1 PROJECTS - $65,000",
        domains: 'Homemade.com + 5',
        sold: '4 sold - $15,000',
        description: "My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park."
    },
    {
        key: 10,
        name: 'John Brown',
        disname: 'John Brown',
        email: 'netigirl@gmail.com',
        role: 'DOMAINER',
        scription: 'Stallion',
        videopitch: 'APPROVE',
        sponsored: '6 ORDERS - $180',
        breeders: "1 PROJECTS - $65,000",
        domains: 'Homemade.com + 5',
        sold: '4 sold - $15,000',
        description: "My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park."
    },
    {
        key: 11,
        name: 'John Brown',
        disname: 'John Brown',
        email: 'netigirl@gmail.com',
        role: 'DOMAINER',
        scription: 'Stallion',
        videopitch: 'APPROVE',
        sponsored: '6 ORDERS - $180',
        breeders: "1 PROJECTS - $65,000",
        domains: 'Homemade.com + 5',
        sold: '4 sold - $15,000',
        description: "My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park."
    },
    {
        key: 12,
        name: 'John Brown',
        disname: 'John Brown',
        email: 'netigirl@gmail.com',
        role: 'DOMAINER',
        scription: 'Stallion',
        videopitch: 'APPROVE',
        sponsored: '6 ORDERS - $180',
        breeders: "1 PROJECTS - $65,000",
        domains: 'Homemade.com + 5',
        sold: '4 sold - $15,000',
        description: "My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park."
    },
];


const BrokerPage = () => {
    const history = useHistory()
    const openNewUser = (e) => {
        history.push("/UserList");
    }
    return (
        <>
            <div className="row">
                <div className="col-md-2" style={{background: "#212529"}}>
                    <div className="leftbar">
                        <div className="mebcolor">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<FaUserCog style={{ fontSize: "1.5vw", marginTop: "-13px" }} />&nbsp;<span className="mbsize">Members</span></div>
                        <div className="mb_list"><Link to="/PortfolioApproval" style={{ color: "white" }}>Portfolio Approval 5</Link></div>
                        <div className="mb_list" onClick={openNewUser}>New Users 15</div>
                        <div className="mb_list">New Broker Leads 5</div>
                        <div className="mebcolor"><MdVideoCameraFront style={{ fontSize: "1.5vw", marginTop: "-13px" }} />&nbsp;<span className="mbsize">Video Pitch Approval</span></div>
                        <div className="vd-list">Thoroughbred Domain 54</div>
                        <div className="vd-list">Exclusive Startup Breeders 5</div>
                    </div>
                </div>
                <div className="col-md-10" style={{ paddingRight: "15px" }}>
                    <div className="broker-pd-10">
                        <h2 className="dashboard">Dashboard</h2>
                        <div><HiUserGroup style={{ fontSize: "17px", marginTop: "-5px" }} />&nbsp;<span className="usercounter">71/126 users</span></div>
                    </div>
                    <Table
                        columns={columns}
                        expandable={{
                            expandedRowRender: record => <p style={{ margin: 0 }}>{record.description}</p>,
                            rowExpandable: record => record.name !== 'Not Expandable',
                        }}
                        dataSource={data}
                    />
                </div>
            </div>

        </>
    )
}
export default BrokerPage;