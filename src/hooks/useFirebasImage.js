import { useState } from "react";
import { storage } from "../firebase/firebase-config";
import {
    deleteObject,
    getDownloadURL,
    ref,
    uploadBytesResumable,
} from "firebase/storage";

export function useFirebasImage(setValue, getValues) {
    const [progress, setProgress] = useState(0);
    const [imageURL, setImageURL] = useState("");
    const [imageTitle, setImageTitle] = useState("");
    if (!setValue || !getValues) return;

    const handleUpLoadImage = (e) => {
        const file = e.target.files[0];
        setImageTitle(file.name);
        if (!file) return;
        const storageRef = ref(storage, `images/${file.name}`);
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
                    console.log(downloadURL);
                    setImageURL(downloadURL);
                    setValue("image", downloadURL);
                });
            }
        );
    };
    const handleDeleteImage = () => {
        const deleteRef = ref(storage, `images/${getValues("image").name}`);
        // Delete the file
        deleteObject(deleteRef)
            .then(() => {
                console.log("Successfully delete");
                setValue("image", "");
                setProgress(0);
                setImageTitle("");
                setImageURL("");
            })
            .catch((error) => {
                console.log("Uh-oh, an error occurred");
            });
    };

    return {
        progress,
        setProgress,
        imageTitle,
        setImageTitle,
        imageURL,
        setImageURL,
        handleUpLoadImage,
        handleDeleteImage,
    };
}
