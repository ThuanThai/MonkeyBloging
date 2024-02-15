import React, { useEffect, useState } from "react";
import styled from "styled-components";
import PostCategory from "./PostCategory";
import { db } from "../../firebase/firebase-config";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
const PostFeatureItemStyles = styled.div`
    width: 100%;
    border-radius: 16px;
    position: relative;
    height: 169px;
    cursor: pointer;
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
    const navigate = useNavigate();
    const [user, setUser] = useState();
    const [cate, setCate] = useState();
    const { author, category, image, title, slug, createdAt } = data;

    useEffect(() => {
        const fetch = async () => {
            const docRef = doc(db, "users", author);
            const docSnap = await getDoc(docRef);
            setUser(docSnap.data());
        };
        fetch();
    }, [author]);

    useEffect(() => {
        const fetch = async () => {
            const docRef = doc(db, "categories", category);
            const docSnap = await getDoc(docRef);
            setCate(docSnap.data());
        };
        fetch();
    }, [category]);

    const options = { month: "short", day: "numeric", year: "numeric" };
    const milliseconds =
        createdAt.seconds * 1000 + Math.floor(createdAt.nanoseconds / 1e6);
    const date = new Date(milliseconds).toLocaleDateString("en-US", options);

    if (!data) return;
    return (
        <PostFeatureItemStyles onClick={() => navigate(`/detail/${slug}`)}>
            <img src={image} alt="unsplash" className="post-image" />
            <div className="post-overlay"></div>
            <div className="post-content">
                <div className="post-top">
                    {cate && (
                        <PostCategory
                            to={`/detail/${cate.slug}`}
                            type="primary">
                            {cate?.name}
                        </PostCategory>
                    )}
                    <div className="post-info">
                        <span className="spot-time">{date}</span>
                        <span className="post-dot"></span>
                        <span className="post-author">{user?.fullname}</span>
                    </div>
                </div>
                <h3 className="post-title">{title}</h3>
            </div>
        </PostFeatureItemStyles>
    );
};

export default PostFeatureItem;
