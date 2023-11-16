import React from "react";
import styled from "styled-components";

const HomeBannerStyles = styled.div`
    min-height: 520px;
    background-image: linear-gradient(
        to right bottom,
        ${(props) => props.theme.primary},
        ${(props) => props.theme.secondary}
    );
    .banner {
        display: flex;
        align-items: center;
        &-content {
            max-width: 400px;
        }
        &-heading {
        }
        &-desc {
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
                        <div className="banner-heading"></div>
                        <div className="banner-desc"></div>
                    </div>
                    <div className="banner-image"></div>
                </div>
            </div>
        </HomeBannerStyles>
    );
};

export default HomeBanner;
