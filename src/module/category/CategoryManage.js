import { Button } from "components/button";
import { Table } from "components/table";
import { db } from "../../firebase/firebase-config";
import {
    collection,
    deleteDoc,
    doc,
    getDocs,
    limit,
    onSnapshot,
    orderBy,
    query,
    startAfter,
    where,
} from "firebase/firestore";
import DashBoardHeading from "module/dashboard/DashBoardHeading";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ActionDelete, ActionEdit, ActionView } from "components/action";
import { LabelStatus } from "components/label";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { debounce } from "lodash";

const CategoryManage = () => {
    const navigate = useNavigate();
    const [categories, setCatgories] = useState();
    const [filter, setFilter] = useState("");
    const [firstRef, setFirstRef] = useState(
        query(collection(db, "categories"), orderBy("createdAt"), limit(1))
    );

    const handleChangeSearch = debounce((e) => {
        setFilter(e.target.value);
    }, 500);

    const handleLoadMore = async () => {
        // Query the first page of docs
        try {
            const documentSnapshots = await getDocs(firstRef);
            const lastVisible =
                documentSnapshots.docs[documentSnapshots.docs.length - 1];

            const next = query(
                collection(db, "categories"),
                startAfter(lastVisible),
                limit(1)
            );
            onSnapshot(next, (querySnapshot) => {
                let res = [];
                querySnapshot.forEach((doc) => {
                    res.push({
                        id: doc.id,
                        ...doc.data(),
                    });
                });
                setCatgories([...res]);
            });
            setFirstRef(next);
        } catch (err) {}
    };

    useEffect(() => {
        const colRef = collection(db, "categories");
        const q = filter
            ? query(
                  colRef,
                  where("name", ">=", filter.charAt(0).toUpperCase()),
                  where("name", "<=", filter.charAt(0).toUpperCase() + "utf8"),
                  limit(1)
              )
            : query(colRef, orderBy("createdAt"), limit(1));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const res = [];
            querySnapshot.forEach((doc) => {
                res.push({
                    id: doc.id,
                    ...doc.data(),
                });
            });
            setCatgories([...res]);
        });
        return () => unsubscribe();
    }, [filter]);

    const handleDeleteCategory = async (categoryID) => {
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
            <div className="flex mb-10">
                <input
                    onChange={handleChangeSearch}
                    type="text"
                    placeholder="Search category..."
                    className="px-4 py-3 ml-auto border-2 rounded-lg focus:outline-none"
                />
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
            <button onClick={handleLoadMore} className="cursor-pointer">
                Load more
            </button>
        </div>
    );
};

export default CategoryManage;
