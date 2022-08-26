import "./style.css";
import { Table } from 'antd';
import React from "react";
import Button from '@mui/material/Button';
const columns = [
    {
        title: 'Domains',
        dataIndex: 'email',
        render: (text) => <a href="#javascript">{text}</a>,
    },
    {
        title: "User Name",
        dataIndex: 'name',
    }
];
const data = [
    {
        key: '1',
        email: 'sameer.com',
        name: "omnik Resic"
    },
    {
        key: '2',
        email: 'test.com',
        name: "omnik Resic"
    },
    {
        key: '3',
        email: 'beamleap.com',
        name: "omnik Resic"
    },
    {
        key: '4',
        email: 'space.com',
        name: "omnik Resic"
    },
    {
        key: '5',
        email: 'space.com',
        name: "omnik Resic"
    },
    {
        key: '6',
        email: 'space.com',
        name: "omnik Resic"
    },
    {
        key: '7',
        email: 'space.com',
        name: "omnik Resic"
    },
    {
        key: '8',
        email: 'space.com',
        name: "omnik Resic"
    },
    {
        key: '9',
        email: 'space.com',
        name: "omnik Resic"
    },
    {
        key: '10',
        email: 'space.com',
        name: "omnik Resic"
    },
    {
        key: '11',
        email: 'space.com',
        name: "omnik Resic"
    },
    {
        key: '12',
        email: 'space.com',
        name: "omnik Resic"
    },
    {
        key: '13',
        email: 'space.com',
        name: "omnik Resic"
    },
]; // rowSelection object indicates the need for row selection
const PortfolioApproval = () => {
    return (
        <>
            <div className="row">
                <div className="col-md-2" style={{background: "#212529"}}>
                    <div className="leftbar">
                        <div className="pa_list">Portfolio Approval 5</div>
                        <div className="pa_list">New Users 15</div>
                        <div className="pa_list">New Broker Leads 5</div>
                    </div>
                </div>
                <div className="col-md-10">
                    <h1 className="portfolio_style">Portfolio Approval</h1>
                    <Table
                        rowSelection={{
                            type: 'checkbox',
                        }}
                        columns={columns}
                        dataSource={data}
                    />
                    <div className="approve_deny">
                        <Button variant="contained" color="success">Approve</Button>&nbsp;&nbsp;
                        <Button variant="contained">Deny</Button>
                    </div>
                </div>
            </div>
        </>
    )
}
export default PortfolioApproval;