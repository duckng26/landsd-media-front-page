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
import { auth, signOut } from "@/app/auth";

const menuItems = [
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
  const user =  {
    username: 'duke',
    email:'',
    password: '',
    img: '',
    isAdmin: true,
    isActive: true,
    phone: '',
    address: ''
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
            {cat.list.map((item) => (
              <MenuLink item={item} key={item.title} />
            ))}
          </li>
        ))}
      </ul>
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <button className={styles.logout}>
          <MdLogout />
          Logout
        </button>
      </form>
    </div>
  );
};

export default Sidebar;
