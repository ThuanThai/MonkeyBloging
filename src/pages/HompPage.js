import React from "react";
import styled from "styled-components";
import Layout from "components/layout/Layout";
import HomeBanner from "module/Home/HomeBanner";

const HomePageStyles = styled.div`
    .header {
        padding: 40px 0px;
        display: flex;
        align-items: center;
    }
    .menu {
        display: flex;
        align-items: center;
        gap: 20px;
        margin-left: 30px;
        font-weight: 600;
        a {
            color: ${(props) => props.theme.greydark};
        }
    }
    .logo {
        display: inline-block;
        width: 50px;
    }
    .search-icon {
        width: 24px;
        height: 24px;
        color: ${(props) => props.theme.greylight};
    }
    .search {
        height: 50px;
        max-width: 320px;
        width: 100%;
        margin-left: auto;
        padding: 0 10px;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border: #ccc solid 1px;
        margin-right: 20px;
    }
    .search-input {
        flex: 1;
    }
    .text-primary {
        color: ${(props) => props.theme.primary};
    }
`;

const HompPage = () => {
    // const handleSignOut = () => {
    //     signOut(auth);
    // };

    return (
        <HomePageStyles>
            <Layout>
                <HomeBanner></HomeBanner>
            </Layout>
        </HomePageStyles>
    );
};

export default HompPage;
