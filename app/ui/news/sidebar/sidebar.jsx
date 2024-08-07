"use client";

import Image from "next/image";
import MenuLink from "./menuLink/menuLink";
import styles from "./sidebar.module.css";
import {
    MdDashboard,
    MdSupervisedUserCircle,
    MdShoppingBag,
    MdAttachMoney,
    MdWork,
    MdAnalytics,
    MdPeople,
    MdOutlineSettings,
    MdHelpCenter,
    MdLogout,
} from "react-icons/md";
import { useRouter } from "next/navigation";
import { deleteCookie } from "cookies-next";
import { useAuth } from "@/app/auth/authProvider";
let menuItems = [
    {
        title: "Pages",
        list: [
            {
                title: "News",
                path: "/news",
                icon: <MdDashboard />,
            },
            {
                title: "Keyword",
                path: "/keyword",
                icon: <MdDashboard />,
            },
            {
                title: "User Management",
                path: "/userManagement",
                icon: <MdDashboard />,
            },
            {
                title: "Audit Logs",
                path: "/auditLogs",
                icon: <MdDashboard />,
            },
            {
                title: "Statistics",
                path: "/statistics",
                icon: <MdDashboard />,
            },
            {
                title: "Profile",
                path: "/profile",
                icon: <MdDashboard />,
            },
        ],
    },
    {
        title: "User",
        list: [
            {
                title: "Settings",
                path: "/news/settings",
                icon: <MdOutlineSettings />,
            },
            {
                title: "Help",
                path: "/news/help",
                icon: <MdHelpCenter />,
            },
        ],
    },
];
const Sidebar = async () => {
    const auth = useAuth();

    const router = useRouter();
    const user = {
        username: "duke",
        email: "",
        password: "",
        img: "",
        isAdmin: true,
        isActive: true,
        phone: "",
        address: "",
    };

    const handleLogout = () => {
        deleteCookie("token");
        router.push("/");
    };

    return (
        <div className={styles.container}>
            <div className={styles.user}>
                <Image
                    className={styles.userImage}
                    src={user.img || "/logo.png"}
                    alt=""
                    width="250"
                    height="50"
                />
            </div>
            <ul className={styles.list}>
                {menuItems.map((cat) => (
                    <li key={cat.title}>
                        <span className={styles.cat}>{cat.title}</span>
                        {cat.list.map((item) =>
                            auth.user ? (
                                !(
                                    auth.user.id_role == 3 &&
                                    item.path.includes("userManagement")
                                ) && <MenuLink item={item} key={item.title} />
                            ) : (
                                <MenuLink item={item} key={item.title} />
                            )
                        )}
                    </li>
                ))}
            </ul>
            <button className={styles.logout} onClick={handleLogout}>
                <MdLogout />
                Logout
            </button>
        </div>
    );
};

export default Sidebar;
