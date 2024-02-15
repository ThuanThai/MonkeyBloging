import { Button } from "components/button";
import { Radio } from "components/checkbox";
import { Dropdown } from "components/dropdown";
import { Field } from "components/field";
import { Input } from "components/input";
import { Label } from "components/label";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import slugify from "slugify";
import styled from "styled-components";
import { postStatus } from "utils/constants";
import ImageUpload from "components/imageupload/ImageUpload";
import { useFirebasImage } from "hooks/useFirebasImage";
import Toggle from "components/toggle/Toggle";
import {
    addDoc,
    collection,
    getDocs,
    query,
    serverTimestamp,
} from "firebase/firestore";
import { db } from "../../firebase/firebase-config";
import { toast } from "react-toastify";
import { useAuth } from "contexts/auth-context";
import { useNavigate } from "react-router-dom";
const PostAddNewStyles = styled.div``;

const PostAddNew = () => {
    const navigate = useNavigate();
    const { userInfo } = useAuth();
    const [userId, setUserId] = useState();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!userInfo) return;
        setUserId(userInfo.uid);
        setValue("author", userId);
    }, [userInfo]);

    const {
        control,
        watch,
        setValue,
        handleSubmit,
        getValues,
        reset,
        formState: { isValid },
    } = useForm({
        mode: "onChange",
        defaultValues: {
            author: "",
            title: "",
            slug: "",
            status: 2,
            category: "",
            hot: "true",
            image: "",
        },
    });
    const {
        progress,
        setProgress,
        imageTitle,
        setImageTitle,
        imageURL,
        setImageURL,
        handleUpLoadImage,
        handleDeleteImage,
    } = useFirebasImage(setValue, getValues);
    const watchStatus = watch("status");
    const watchHot = watch("hot");
    // const watchCategory = watch("category");
    const addPostHandler = async (values) => {
        if (!isValid) return;
        console.log(values);
        setLoading(true);
        const cloneVal = { ...values };
        cloneVal.slug = slugify(
            cloneVal.slug.toLowerCase() || cloneVal.title.toLowerCase()
        );
        const colRef = collection(db, "posts");
        try {
            await addDoc(colRef, {
                ...cloneVal,
                createdAt: serverTimestamp(),
            });
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
        setLoading(false);
        toast.success("Create new post successfully");
        reset({
            author: userId,
            title: "",
            slug: "",
            status: 2,
            category: "",
            hot: "true",
            image: "",
        });

        setSelectedCategory({});
        setImageTitle("");
        setImageURL("");
        setProgress(0);
    };

    const handleClickOption = (option) => {
        if (!option) return;
        setSelectedCategory(option);
        setValue("category", option.id);
    };

    const [selectedCategory, setSelectedCategory] = useState({});
    const [categories, setCatgories] = useState([]);
    useEffect(() => {
        const getData = async () => {
            const colRef = collection(db, "categories");
            const q = query(colRef);
            const querySnapshot = await getDocs(q);
            let result = [];
            querySnapshot.forEach((doc) => {
                result.push({ id: doc.id, ...doc.data() });
            });
            setCatgories(result);
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
                            <Dropdown.Select placeholder="Select the category"></Dropdown.Select>
                            <Dropdown.List>
                                {categories.length > 0 &&
                                    categories.map((item) => (
                                        <Dropdown.Option
                                            key={item.id}
                                            onClick={() =>
                                                handleClickOption(item)
                                            }>
                                            {item.name}
                                        </Dropdown.Option>
                                    ))}
                            </Dropdown.List>
                        </Dropdown>
                        <div>
                            {selectedCategory.name && (
                                <span className="inline-block p-3 text-sm font-medium text-green-700 bg-green-200 rounded-md">
                                    {selectedCategory.name}
                                </span>
                            )}
                        </div>
                    </Field>

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
                    <Field>
                        <Label>Feature Post</Label>
                        <Toggle
                            onClick={() => setValue("hot", !watchHot)}
                            on={watchHot}></Toggle>
                    </Field>
                </div>

                <Button
                    center
                    disable={loading}
                    isLoading={loading}
                    primary
                    type="submit"
                    className="w-[200px]">
                    Add new post
                </Button>
            </form>
        </PostAddNewStyles>
    );
};

export default PostAddNew;
