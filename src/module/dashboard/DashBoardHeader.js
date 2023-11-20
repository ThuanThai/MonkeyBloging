import { Button } from "components/button";
import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const DashboardHeaderStyles = styled.div`
    background-color: white;
    padding: 20px;
    border-bottom: 1px solid #eee;
    display: flex;
    justify-content: end;
    gap: 20px;
    .header-avatar {
        width: 52px;
        height: 52px;
    }
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 100rem;
    }
`;

const DashBoardHeader = () => {
    const navigate = useNavigate();
    return (
        <DashboardHeaderStyles>
            <Button
                onClick={() => {
                    navigate("/dashboard");
                }}
                primary
                className="header-button"
                to="/dashboard">
                Write new post
            </Button>
            <div className="header-avatar">
                <img
                    src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3270&q=80"
                    alt=""
                />
            </div>
        </DashboardHeaderStyles>
    );
};

export default DashBoardHeader;
