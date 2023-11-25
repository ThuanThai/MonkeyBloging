import { Button } from "components/button";
import { Radio } from "components/checkbox";
import { Dropdown } from "components/dropdown";
import { Field } from "components/field";
import { Input } from "components/input";
import { Label } from "components/label";
import React from "react";
import { useForm } from "react-hook-form";
import slugify from "slugify";
import styled from "styled-components";
import { postStatus } from "utils/constants";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase/firebase-config";
import ImageUpload from "components/imageupload/ImageUpload";
import { useState } from "react";
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
        },
    });
    const watchStatus = watch("status");
    const watchCategory = watch("category");
    const addPostHandler = async (values) => {
        const cloneVal = { ...values };
        cloneVal.slug = slugify(cloneVal.slug || cloneVal.title);
        console.log(cloneVal);
        handleUpLoadImage(cloneVal.image);
    };
    const handleUpLoadImage = (file) => {
        if (!file) return;
        const storageRef = ref(storage, "images/" + file.name);
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const precent =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log("Upload is " + precent + "% done");
                setProgress(precent);
                switch (snapshot.state) {
                    case "paused":
                        console.log("Upload is paused");
                        break;
                    case "running":
                        console.log("Upload is running");
                        break;
                    default:
                        console.log("Nothing!!");
                }
            },
            (error) => {
                console.log(error.code);
            },
            () => {
                // Upload completed successfully, now we can get the download URL
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setImageURL(downloadURL);
                });
            }
        );
    };
    const handleSelectImage = (e) => {
        const file = e.target.files[0];
        setValue("image", file);
        setImageTitle(file.name);
    };
    const [progress, setProgress] = useState(0);
    const [imageURL, setImageURL] = useState("");
    const [imageTitle, setImageTitle] = useState("");
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
                        <Label>Author</Label>
                        <Input
                            control={control}
                            placeholder="Find the author"></Input>
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
                        <Label>Image</Label>
                        <ImageUpload
                            imageTitle={imageTitle}
                            imageURL={imageURL}
                            onChange={handleSelectImage}
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
