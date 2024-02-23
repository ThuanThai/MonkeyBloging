import { Button } from "components/button";
import { Radio } from "components/checkbox";
import { Field } from "components/field";
import FieldCheckBoxes from "components/field/FieldCheckBoxes";
import { Input } from "components/input";
import { Label } from "components/label";
import { db } from "../../firebase/firebase-config";
import { collection, doc, getDoc, updateDoc } from "firebase/firestore";
import DashBoardHeading from "module/dashboard/DashBoardHeading";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import slugify from "slugify";
import { categoryStatus } from "utils/constants";
import Swal from "sweetalert2";

const CategoryUpdate = () => {
    const [param] = useSearchParams();
    const id = param.get("id");
    const {
        control,
        formState: { isSubmitting },
        reset,
        handleSubmit,
        watch,
    } = useForm({
        mode: "onChange",
    });
    const watchStatus = watch("status");

    useEffect(() => {
        const fetchCategory = async () => {
            const docRef = doc(db, "categories", id);
            const res = await getDoc(docRef);
            reset(res.data());
        };

        return () => fetchCategory();
    }, [id, reset]);

    if (!id) return null;
    const handleUpdateCategory = async (values) => {
        const cloneVals = { ...values };
        const docRef = doc(db, "categories", id);
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, update it",
        }).then(async (result) => {
            await updateDoc(docRef, {
                name: cloneVals.name,
                slug: cloneVals.slug,
                status: cloneVals.status,
            });
            if (result.isConfirmed) {
                Swal.fire({
                    title: "Updated!",
                    text: "Your category has been updated",
                    icon: "success",
                });
            }
        });
    };
    return (
        <div>
            <DashBoardHeading
                title="Update Categorise"
                desc={`Update your category: ${id}`}></DashBoardHeading>
            <form
                onSubmit={handleSubmit(handleUpdateCategory)}
                autoComplete="off">
                <div className="form-layout">
                    <Field>
                        <Label>Name</Label>
                        <Input
                            control={control}
                            name="name"
                            placeholder="Enter your category name"
                            required></Input>
                    </Field>
                    <Field>
                        <Label>Slug</Label>
                        <Input
                            control={control}
                            name="slug"
                            placeholder="Enter your slug"></Input>
                    </Field>
                </div>
                <div className="form-layout">
                    <Field>
                        <Label>Status</Label>
                        <FieldCheckBoxes>
                            <Radio
                                name="status"
                                control={control}
                                checked={
                                    Number(watchStatus) ===
                                    categoryStatus.APPROVE
                                }
                                value={categoryStatus.APPROVE}>
                                Approved
                            </Radio>
                            <Radio
                                name="status"
                                control={control}
                                checked={
                                    Number(watchStatus) ===
                                    categoryStatus.UNAPPROVE
                                }
                                value={categoryStatus.UNAPPROVE}>
                                Unapproved
                            </Radio>
                        </FieldCheckBoxes>
                    </Field>
                </div>
                <Button
                    primary
                    className="w-[200px]"
                    center
                    type="submit"
                    disabled={isSubmitting}
                    isLoading={isSubmitting}>
                    Update
                </Button>
            </form>
        </div>
    );
};

export default CategoryUpdate;
