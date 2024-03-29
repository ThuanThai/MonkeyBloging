import { Button } from "components/button";
import { Radio } from "components/checkbox";
import { Field } from "components/field";
import FieldCheckBoxes from "components/field/FieldCheckBoxes";
import { Input } from "components/input";
import { Label } from "components/label";
import { db } from "../../firebase/firebase-config";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import DashBoardHeading from "module/dashboard/DashBoardHeading";
import React from "react";
import { useForm } from "react-hook-form";
import slugify from "slugify";
import { categoryStatus } from "utils/constants";
import { toast } from "react-toastify";

const CategoryAddNew = () => {
    const {
        control,
        watch,
        formState: { isSubmitting },
        reset,
        handleSubmit,
    } = useForm({
        mode: "onChange",
        defaultValues: {
            name: "",
            slug: "",
            status: categoryStatus.APPROVE,
            createdAt: new Date(),
        },
    });
    const watchStatus = watch("status");

    const handleAddNewCategory = async (values) => {
        const cloneVals = { ...values };
        cloneVals.slug = slugify(cloneVals.name || cloneVals.slug, {
            lower: true,
        });
        cloneVals.status = Number(cloneVals.status);
        const colref = collection(db, "categories");

        try {
            await addDoc(colref, {
                ...cloneVals,
                createdAt: serverTimestamp(),
            });
            toast.success("Create new category sucessfully");
        } catch (error) {
            toast.error(error);
        }
        reset({
            name: "",
            slug: "",
            status: categoryStatus.APPROVE,
            createdAt: new Date(),
        });
    };

    return (
        <div>
            <DashBoardHeading
                title="New category"
                desc="Add new category"></DashBoardHeading>
            <form
                onSubmit={handleSubmit(handleAddNewCategory)}
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
                    Add new category
                </Button>
            </form>
        </div>
    );
};

export default CategoryAddNew;
