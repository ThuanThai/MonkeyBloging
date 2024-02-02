import Heading from "components/layout/Heading";
import { db } from "../../firebase/firebase-config";
import {
    collection,
    limit,
    onSnapshot,
    orderBy,
    query,
    where,
} from "firebase/firestore";
import PostFeatureItem from "module/post/PostFeatureItem";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

const HomeFeatureStyles = styled.div`
    padding: 40px;
`;

const HomeFeature = () => {
    const [postsFeature, setPostsFeature] = useState();
    useEffect(() => {
        const colRef = collection(db, "posts");
        const q = query(
            colRef,
            where("status", "==", "1"),
            where("hot", "==", "true"),
            orderBy("createdAt", "desc"),
            limit(3)
        );

        onSnapshot(q, (snapshot) => {
            const result = [];
            snapshot.forEach((doc) => {
                result.push({
                    id: doc.id,
                    ...doc.data(),
                });
            });
            setPostsFeature(result);
        });
    }, []);
    if (postsFeature && postsFeature.length <= 0) return null;
    return (
        <HomeFeatureStyles className="home-block">
            <div className="container">
                <Heading>Bài viết nổi bật</Heading>
                <div className="grid-layout">
                    {postsFeature &&
                        postsFeature.length > 0 &&
                        postsFeature.map((item) => (
                            <PostFeatureItem
                                data={item}
                                key={item.id}></PostFeatureItem>
                        ))}
                </div>
            </div>
        </HomeFeatureStyles>
    );
};

export default HomeFeature;
