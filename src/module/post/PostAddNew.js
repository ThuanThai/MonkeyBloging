import { Button } from "components/button";
import { Radio } from "components/checkbox";
import { Dropdown } from "components/dropdown";
import { Field } from "components/field";
import { Input } from "components/input";
import { Label } from "components/label";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import slugify from "slugify";
import styled from "styled-components";
import { postStatus } from "utils/constants";
import ImageUpload from "components/imageupload/ImageUpload";
import { useFirebasImage } from "hooks/useFirebasImage";
import Toggle from "components/toggle/Toggle";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../../firebase/firebase-config";
const PostAddNewStyles = styled.div``;

const PostAddNew = () => {
    const { control, watch, setValue, handleSubmit, getValues } = useForm({
        mode: "onChange",
        defaultValues: {
            title: "",
            slug: "",
            status: 2,
            category: "",
            image: "",
            hot: "false",
        },
    });
    const {
        progress,
        imageTitle,
        imageURL,
        handleUpLoadImage,
        handleDeleteImage,
    } = useFirebasImage(setValue, getValues);
    const watchStatus = watch("status");
    const watchHot = watch("hot");
    // const watchCategory = watch("category");
    const addPostHandler = async (values) => {
        const cloneVal = { ...values };
        cloneVal.slug = slugify(cloneVal.slug || cloneVal.title);
        // handleUpLoadImage(cloneVal.image);
    };

    useEffect(() => {
        const getData = async () => {
            const colRef = collection(db, "categories");
            const q = query(colRef);
            const querySnapshot = await getDocs(q);
            let result = [];
            querySnapshot.forEach((doc) => {
                result.push({ id: doc.id, ...doc.data() });
            });
            console.log(
                "🚀 ~ file: PostAddNew.js:55 ~ querySnapshot.forEach ~ result:",
                result
            );
        };
        getData();
    }, []);

    return (
        <PostAddNewStyles>
            <h1 className="dashboard-heading">Add new post</h1>
            <form onSubmit={handleSubmit(addPostHandler)}>
                <div className="grid grid-cols-2 mb-10 gap-x-10">
                    <Field>
                        <Label>Title</Label>
                        <Input
                            control={control}
                            placeholder="Enter your title"
                            name="title"></Input>
                    </Field>
                    <Field>
                        <Label>Slug</Label>
                        <Input
                            control={control}
                            placeholder="Enter your slug"
                            name="slug"></Input>
                    </Field>
                </div>
                <div className="grid grid-cols-2 mb-10 gap-x-10">
                    <Field>
                        <Label>Category</Label>
                        <Dropdown>
                            <Dropdown.Option>Knowledge</Dropdown.Option>
                            <Dropdown.Option>Blockchain</Dropdown.Option>
                            <Dropdown.Option>Setup</Dropdown.Option>
                            <Dropdown.Option>Nature</Dropdown.Option>
                            <Dropdown.Option>Developer</Dropdown.Option>
                        </Dropdown>
                    </Field>

                    <Field>
                        <Label>Author</Label>
                        <Input
                            control={control}
                            placeholder="Find the author"></Input>
                    </Field>
                </div>
                <div className="grid grid-cols-2 mb-10 gap-x-10">
                    <Field>
                        <Label>Status</Label>
                        <div className="flex items-center gap-x-5">
                            <Radio
                                name="status"
                                control={control}
                                checked={
                                    Number(watchStatus) === postStatus.APPROVE
                                }
                                onClick={() =>
                                    setValue("status", postStatus.APPROVE)
                                }
                                value={postStatus.APPROVE}>
                                Approved
                            </Radio>
                            <Radio
                                name="status"
                                control={control}
                                checked={
                                    Number(watchStatus) === postStatus.PENDING
                                }
                                onClick={() =>
                                    setValue("status", postStatus.PENDING)
                                }
                                value={postStatus.PENDING}>
                                Pending
                            </Radio>
                            <Radio
                                name="status"
                                control={control}
                                checked={
                                    Number(watchStatus) === postStatus.REJECT
                                }
                                onClick={() =>
                                    setValue("status", postStatus.REJECT)
                                }
                                value={postStatus.REJECT}>
                                Reject
                            </Radio>
                        </div>
                    </Field>
                    <Field>
                        <Label>Feature Post</Label>
                        <Toggle
                            onClick={() => setValue("hot", !watchHot)}
                            on={watchHot}></Toggle>
                    </Field>
                </div>
                <div className="grid grid-cols-2 mb-10 gap-x-10">
                    <Field>
                        <Label>Image</Label>
                        <ImageUpload
                            handleDeleteImage={handleDeleteImage}
                            imageTitle={imageTitle}
                            imageURL={imageURL}
                            onChange={handleUpLoadImage}
                            progress={progress}></ImageUpload>
                    </Field>
                </div>
                <Button primary type="submit" className="mx-auto">
                    Add new post
                </Button>
            </form>
        </PostAddNewStyles>
    );
};

export default PostAddNew;
