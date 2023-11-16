import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { Button } from "components/button";
import { useAuth } from "contexts/auth-context";
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

const menuItems = [
    { id: 0, title: "Home", src: "/" },
    { id: 1, title: "Blog", src: "/blog" },
    { id: 2, title: "Contact", src: "/contact" },
];

const Header = () => {
    const navigate = useNavigate();
    const { userInfo } = useAuth();
    const getLastName = (name) => {
        if (name !== "" && typeof name !== "string") return "user";
        else {
            const nameArr = name.split(" ");
            if (nameArr.length > 1) {
                return nameArr[nameArr.length - 1];
            } else {
                return name;
            }
        }
    };
    return (
        <div className="container">
            <div className="header">
                <a className="logo" href="/#">
                    <img srcSet="monkey.png 2x" alt="" />
                </a>
                <ul className="menu">
                    {menuItems.map((item) => (
                        <li key={item.id} className="menu-item">
                            <NavLink to={item.src}>{item.title}</NavLink>
                        </li>
                    ))}
                </ul>
                <div className="search">
                    <input
                        placeholder="Search post..."
                        type="text"
                        className="search-input"
                    />
                    <MagnifyingGlassIcon className="search-icon"></MagnifyingGlassIcon>
                </div>
                {userInfo ? (
                    <strong>
                        Welcome back!{" "}
                        <span className="text-primary">
                            {getLastName(userInfo.displayName)}
                        </span>
                    </strong>
                ) : (
                    <Button
                        onClick={() => navigate("/sign-in")}
                        style={{
                            "max-width": "200px",
                            margin: "0px",
                        }}
                        height="50px">
                        Sign In
                    </Button>
                )}
            </div>
        </div>
    );
};

export default Header;
