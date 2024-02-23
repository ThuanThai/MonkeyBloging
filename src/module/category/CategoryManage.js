import { Button } from "components/button";
import { Table } from "components/table";
import { db } from "../../firebase/firebase-config";
import {
    collection,
    deleteDoc,
    doc,
    onSnapshot,
    orderBy,
    query,
} from "firebase/firestore";
import DashBoardHeading from "module/dashboard/DashBoardHeading";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ActionDelete, ActionEdit, ActionView } from "components/action";
import { LabelStatus } from "components/label";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const CategoryManage = () => {
    const navigate = useNavigate();
    const [categories, setCatgories] = useState();
    useEffect(() => {
        const q = query(collection(db, "categories"), orderBy("createdAt"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const res = [];
            querySnapshot.forEach((doc) => {
                res.push({
                    id: doc.id,
                    ...doc.data(),
                });
            });
            setCatgories(res);
            console.log("🚀 ~ useEffect ~ res:", res);
        });
        return () => unsubscribe();
    }, []);

    const handleDeleteCategory = async (categoryID) => {
        // try {
        //     await deleteDoc(doc(db, "categories", categoryID));
        //     toast.success("Delete successfully");
        // } catch (error) {
        //     toast.error("Error: Can not be deleted");
        // }
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await deleteDoc(doc(db, "categories", categoryID));
                } catch (error) {
                    toast.error("Error: Can not be deleted");
                }
                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success",
                });
            }
        });
    };

    return (
        <div>
            <div className="flex items-center justify-between">
                <DashBoardHeading
                    title="Categorise"
                    desc="Manage your Category"></DashBoardHeading>
                <button
                    onClick={() => {
                        navigate("/manage/add-category");
                    }}
                    className="p-4 font-semibold text-green-500 bg-green-200 rounded-lg bg-opacity-60">
                    Add new Catgory
                </button>
            </div>
            {categories && categories.length > 0 && (
                <Table>
                    <thead>
                        <th>No</th>
                        <th>Name</th>
                        <th>Slug</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </thead>
                    <tbody>
                        {categories.map((category, index) => (
                            <tr key={category.id}>
                                <td>
                                    {index < 10
                                        ? "0" + (index + 1)
                                        : index + 1 + ""}
                                </td>
                                <td>{category.name}</td>
                                <td className="italic text-gray-300">
                                    {category?.slug}
                                </td>
                                <td>
                                    <LabelStatus>
                                        {Number(category?.status) === 1
                                            ? "Approved"
                                            : "Unapproved"}
                                    </LabelStatus>
                                </td>
                                <td className="flex items-center ">
                                    <ActionView></ActionView>
                                    <ActionEdit
                                        onClick={() =>
                                            navigate(
                                                `/manage/update-category?id=${category.id}`
                                            )
                                        }></ActionEdit>
                                    <ActionDelete
                                        onClick={() =>
                                            handleDeleteCategory(category.id)
                                        }></ActionDelete>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </div>
    );
};

export default CategoryManage;
