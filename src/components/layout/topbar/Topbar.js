"use client";

import Image from "next/image";
import classes from "./Topbar.module.css";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Logo from "../../../../public/images/Logo.png";

export default function Topbar() {
  return (
    <header className={classes.topbar}>
      <div className={classes.logo}>
        <div className={classes.imageContainer}>
          <Image className={classes.image} fill={true} src={Logo} alt="img" />
        </div>
        <span className={classes.companyName}>Mytime Cowork CRM</span>
      </div>

      <div className={classes.right}>
        <NotificationsIcon />
        <span className={classes.dateCard}>
          {new Date().toLocaleDateString("en-GB", {
            weekday: "long",
            day: "2-digit",
            month: "long",
            year: "numeric",
          })}
        </span>
      </div>
    </header>
  );
}
