import { Button } from "components/button";
import { Radio } from "components/checkbox";
import { Field } from "components/field";
import FieldCheckBoxes from "components/field/FieldCheckBoxes";
import { Input } from "components/input";
import { Label } from "components/label";
import DashBoardHeading from "module/dashboard/DashBoardHeading";
import React from "react";
import { useForm } from "react-hook-form";

const APPROVE = 1;
const UNAPPROVE = 0;

const CategoryAddNew = () => {
    const {
        control,
        watch,
        formState: { isSubmitting },
    } = useForm({
        mode: "onChange",
        defaultValues: {
            name: "",
            slug: "",
            status: APPROVE,
            createdAt: new Date(),
        },
    });
    const watchStatus = watch("status");
    return (
        <div>
            <DashBoardHeading
                title="New category"
                desc="Add new category"></DashBoardHeading>
            <form autoComplete="off">
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
                                checked={Number(watchStatus) === APPROVE}
                                value={APPROVE}>
                                Approved
                            </Radio>
                            <Radio
                                name="status"
                                control={control}
                                checked={Number(watchStatus) === UNAPPROVE}
                                value={UNAPPROVE}>
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
