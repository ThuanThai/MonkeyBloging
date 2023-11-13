import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase-config";
import React from "react";

const HompPage = () => {
    const handleSignOut = () => {
        signOut(auth);
    };
    return (
        <div>
            <button onClick={handleSignOut}>SignOut</button>
        </div>
    );
};

export default HompPage;
