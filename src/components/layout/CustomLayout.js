"use client";

import classes from "./CustomLayout.module.css";
import { useSidebar } from "@/context/SideBarContext";
import Topbar from "./topbar/Topbar";
import Sidebar from "./sidebar/Sidebar";
import { useAuth } from "@/context/AuthContext";

export default function CustomLayout({ children }) {
  const { user } = useAuth();
  const { collapsed } = useSidebar();

  return (
    <div className={classes.layout}>
      <Sidebar user={user} />

      <div
        className={`${classes.main}
        ${collapsed ? classes.collapsed : ""}`}
      >
        <Topbar />

        <main className={classes.content}>{children}</main>
      </div>
    </div>
  );
}
