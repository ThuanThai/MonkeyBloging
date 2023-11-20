import { Button } from "components/button";
import React from "react";
import styled from "styled-components";

const HomeBannerStyles = styled.div`
    padding: 40px 0px;
    min-height: 520px;
    background-image: linear-gradient(
        to right bottom,
        ${(props) => props.theme.primary},
        ${(props) => props.theme.secondary}
    );
    .banner {
        display: flex;
        align-items: center;
        justify-content: space-between;
        &-content {
            max-width: 600px;
            color: white;
        }
        &-heading {
            font-weight: 600;
            font-size: 30px;
            margin-bottom: 20px;
        }
        &-desc {
            line-height: 2;
            margin-bottom: 20px;
        }
        &-image {
        }
    }
`;

const HomeBanner = () => {
    return (
        <HomeBannerStyles>
            <div className="container">
                <div className="banner">
                    <div className="banner-content">
                        <h1 className="banner-heading">Monkey Bloging</h1>
                        <p className="banner-desc">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Vero accusantium iusto soluta! Recusandae nemo
                            odit aperiam dolor voluptatem molestiae, aliquid
                            tenetur amet neque numquam consectetur, nulla
                            eveniet dicta iusto. Esse.
                        </p>
                        <Button style={{ padding: "0 30px" }}>
                            Get Started
                        </Button>
                    </div>
                    <div className="banner-image">
                        <img src="/banner.png" alt="" />
                    </div>
                </div>
            </div>
        </HomeBannerStyles>
    );
};

export default HomeBanner;
