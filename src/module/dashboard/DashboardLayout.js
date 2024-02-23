import React from "react";
import styled from "styled-components";
import DashBoardHeader from "./DashBoardHeader";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

const DashboardStyles = styled.div`
    max-width: 1600px;
    margin: 0 auto;
    .dashboard {
        &-main {
            display: grid;
            grid-template-columns: 300px minmax(0, 1fr);
            padding: 40px 20px;
            gap: 0 40px;
        }
        &-heading {
            font-weight: bold;
            font-size: 36px;
            letter-spacing: 1px;
        }
        &-short-desc {
            font-weight: 400;
            font-size: 15px;
            color: #666;
            letter-spacing: 1px;
        }
    }
`;

const DashboardLayout = () => {
    return (
        <DashboardStyles>
            <DashBoardHeader></DashBoardHeader>
            <div className="dashboard-main">
                <Sidebar></Sidebar>
                <div className="dashboard-children">
                    <Outlet></Outlet>
                </div>
            </div>
        </DashboardStyles>
    );
};

export default DashboardLayout;
