"use client";
import { useState, useCallback } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import styles from "./navbar.module.css";
import { useFreeTextNewsSearch } from "../../../hooks/useNews";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import {
  MdNotifications,
  MdOutlineChat,
  MdPublic,
  MdSearch,
} from "react-icons/md";
import { debounce } from "@/app/lib/utils";

const DEBOUNCE_DELAY = 500;

const Navbar = () => {
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState("");
  const searchNews = useFreeTextNewsSearch(searchQuery);
  const queryClient = useQueryClient();

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
  
  const handleSearch = async (query) => {
    if (query) {
      await searchNews.mutateAsync(query);
    } else {
      queryClient.invalidateQueries({ queryKey: ['news'] });
    }
  };

  const debouncedHandleSearch = useCallback(debounce(handleSearch, DEBOUNCE_DELAY), []);


  const handleInputChange = async (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    debouncedHandleSearch(query);
  };

  return (
    <div className={styles.container}>
      <div className={styles.menu}>
        <div className={styles.title}>{pathname.split("/").pop()}</div>
        <div className={styles.search}>
          <MdSearch />
          <input
            type="text"
            placeholder="Search..."
            className={styles.input}
            value={searchQuery}
            onChange={handleInputChange}
          />
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
