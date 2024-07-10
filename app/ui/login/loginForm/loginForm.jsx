"use client";

import styles from "./loginForm.module.css";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useState } from "react";
import { useAuth } from "@/app/auth/authProvider";

const LoginForm = () => {
    const [user, setUser] = useState("");
    const [pw, setPw] = useState("");

    const auth = useAuth();

    const [isError, setIsError] = useState(false);

    const handleClickLogin = async (e) => {
        e.preventDefault();
        const success = await auth.handleLogin(user, pw);
        console.log(success);
        if (!success) {
            setIsError(true);
        }
    };

    const handleClickWindowLogin = async (e) => {
        e.preventDefault();

        const success = await auth.handleWindowLogin();
        if (!success) {
            setIsError(true);
        }
    };

    return (
        <form className={styles.form}>
            <Image src={"/logo.png"} alt="logo" width="150" height="30" />
            <div className={styles.header}>
                <div className={styles.title}>Welcome back!</div>
                <div className={styles.subtitle}>Login to your account</div>
                <div
                    className={styles.errorMsg}
                    style={{ display: isError ? "inherit" : "none" }}
                >
                    Wrong username or password!
                </div>
            </div>

            <div className={styles.inputGroup}>
                <div className={styles.inputLabelIcon}>
                    <span className="text-gray-500 sm:text-sm">$</span>
                </div>
                <input
                    type="text"
                    placeholder="Username"
                    name="username"
                    onChange={(e) => {
                        setUser(e.target.value);
                    }}
                    value={user}
                />
            </div>
            <div className={styles.inputGroup}>
                <div className={styles.inputLabelIcon}>
                    <span className="text-gray-500 sm:text-sm">$</span>
                </div>
                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    onChange={(e) => setPw(e.target.value)}
                    value={pw}
                />
            </div>
            <button onClick={handleClickLogin}>Login</button>
            <button onClick={handleClickWindowLogin}>Window Login</button>
        </form>
    );
};

export default LoginForm;
