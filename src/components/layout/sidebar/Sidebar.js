"use client";

import Link from "next/link";
import classes from "./Sidebar.module.css";
import { useSidebar } from "@/context/SideBarContext";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import PeopleIcon from "@mui/icons-material/People";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import UserApiServices from "@/services/api/User.api.services";
import LogoutIcon from "@mui/icons-material/Logout";
import { toast } from "react-toastify";

const menu = [
  {
    title: "Bookings",
    href: "/bookings",
    icon: CalendarTodayIcon,
  },
  {
    title: "Invoices",
    href: "/invoices",
    icon: CalendarTodayIcon,
  },
  {
    title: "Aggregators",
    href: "/aggregators",
    icon: PeopleIcon,
  },
  {
    title: "Task",
    href: "/tasks",
    icon: TaskAltIcon,
  },
];

export default function Sidebar({
  user,
  role = "Accounts Executive",
  designation = "Employee",
}) {
  const { collapsed, setCollapsed } = useSidebar();
  const pathname = usePathname();
  const router = useRouter();

  const logoutHandler = async () => {
    const confirmed = window.confirm("Are you sure you want to logout?");

    if (!confirmed) return;

    try {
      await UserApiServices.logout();
      router.replace("/login");
      toast.success("Logged Out Successfully !");
    } catch (error) {
      toast.success("Technical Issues !");
    }
  };

  return (
    <div
      className={`${classes.sidebar}
      ${collapsed ? classes.collapsed : ""}`}
    >
      <div className={classes.marginContainer}>
        <button
          className={classes.toggle}
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? (
            <KeyboardDoubleArrowRightIcon />
          ) : (
            <KeyboardDoubleArrowLeftIcon />
          )}
        </button>
        <div className={classes.box1}>
          <div className={classes.profile}>
            <div className={classes.imageContainer}>
              <Image className={classes.image} fill={true} src={""} alt="img" />
            </div>

            {!collapsed && (
              <>
                <h4 className={classes.name}>{user?.name}</h4>
                <span className={classes.designation}>{designation}</span>
                <span className={classes.role}>({role})</span>
              </>
            )}
          </div>

          <nav className={classes.navList}>
            {menu.map((item) => {
              const Icon = item.icon;

              return (
                <Link
                  className={`${classes.listItem} ${
                    pathname === item.href ? classes.active : ""
                  }`}
                  key={item.title}
                  href={item.href}
                >
                  <Icon className={classes.icon} fontSize="small" />
                  {!collapsed && <span>{item.title}</span>}
                </Link>
              );
            })}
          </nav>
        </div>
        <div className={classes.box2}>
          <button onClick={logoutHandler} className={classes.logoutButton}>
            <LogoutIcon />
            <span className={classes.logoutButtonText}>Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
}
