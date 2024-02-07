"use client";
import { usePathname } from "next/navigation";
import Image from "next/image";
import styles from "./navbar.module.css";
import {
  MdNotifications,
  MdOutlineChat,
  MdPublic,
  MdSearch,
} from "react-icons/md";

const Navbar = () => {
  const pathname = usePathname();
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

  return (
    <div className={styles.container}>
      <div className={styles.menu}>
        <div className={styles.title}>{pathname.split("/").pop()}</div>
        <div className={styles.search}>
          <MdSearch />
          <input type="text" placeholder="Search..." className={styles.input} />
        </div>
      </div>
      <div className={styles.user}>
        <Image
          className={styles.userImage}
          src={user.img || "/noavatar.png"}
          alt=""
          width="30"
          height="30"
        />
        <div className={styles.userDetail}>
          <span className={styles.username}>{user.username}</span>
          <span className={styles.userTitle}>Administrator</span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
