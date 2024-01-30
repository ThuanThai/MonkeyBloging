import React from "react";
import styled from "styled-components";
import PostCategory from "./PostCategory";
const PostFeatureItemStyles = styled.div`
    width: 100%;
    border-radius: 16px;
    position: relative;
    height: 169px;
    .post {
        &-image {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 16px;
        }
        &-overlay {
            position: absolute;
            inset: 0;
            border-radius: 16px;
            background: linear-gradient(
                179.77deg,
                #6b6b6b 36.45%,
                rgba(163, 163, 163, 0.622265) 63.98%,
                rgba(255, 255, 255, 0) 99.8%
            );
            mix-blend-mode: multiply;
            opacity: 0.6;
        }
        &-content {
            position: absolute;
            inset: 0;
            z-index: 10;
            padding: 20px;
            color: white;
        }
        &-top {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 16px;
        }
        &-info {
            display: flex;
            align-items: center;
            gap: 12px;
            font-size: 14px;
            font-weight: 600;
            color: white;
            margin-left: auto;
        }
        &-dot {
            display: inline-block;
            width: 4px;
            height: 4px;
            background-color: currentColor;
            border-radius: 100rem;
        }
        &-title {
            font-weight: bold;
            line-height: 1.5;
            display: block;
            font-size: 22px;
            color: white;
        }
    }

    @media screen and (min-width: 1024px) {
        height: 272px;
    }
`;
const PostFeatureItem = ({ data, ...props }) => {
    const { author, category, hot, image, slug, status, title, createdAt } =
        data;
    return (
        <PostFeatureItemStyles>
            <img src={image} alt="unsplash" className="post-image" />
            <div className="post-overlay"></div>
            <div className="post-content">
                <div className="post-top">
                    <PostCategory type="primary">{category}</PostCategory>
                    <div className="post-info">
                        <span className="post-time">{createdAt}</span>
                        <span className="post-dot"></span>
                        <span className="post-author">{author}</span>
                    </div>
                </div>
                <h3 className="post-title">
                    Hướng dẫn setup phòng cực chill dành cho người mới toàn tập
                </h3>
            </div>
        </PostFeatureItemStyles>
    );
};

export default PostFeatureItem;
