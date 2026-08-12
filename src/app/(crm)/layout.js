"use client";

import CustomLayout from "@/components/layout/CustomLayout";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import classes from "./layout.module.css";

export default function CRMLayout({ children }) {
  const { loading, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [loading, user]);

  if (loading) {
    return (
      <div className={classes.loaderScreen}>
        <div className={classes.loaderContainer}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
            <circle
              fill="#4D32B3"
              stroke="#4D32B3"
              strokeWidth="15"
              r="15"
              cx="40"
              cy="65"
            >
              <animate
                attributeName="cy"
                calcMode="spline"
                dur="2"
                values="65;135;65;"
                keySplines=".5 0 .5 1;.5 0 .5 1"
                repeatCount="indefinite"
                begin="-.4"
              ></animate>
            </circle>
            <circle
              fill="#4D32B3"
              stroke="#4D32B3"
              strokeWidth="15"
              r="15"
              cx="100"
              cy="65"
            >
              <animate
                attributeName="cy"
                calcMode="spline"
                dur="2"
                values="65;135;65;"
                keySplines=".5 0 .5 1;.5 0 .5 1"
                repeatCount="indefinite"
                begin="-.2"
              ></animate>
            </circle>
            <circle
              fill="#4D32B3"
              stroke="#4D32B3"
              strokeWidth="15"
              r="15"
              cx="160"
              cy="65"
            >
              <animate
                attributeName="cy"
                calcMode="spline"
                dur="2"
                values="65;135;65;"
                keySplines=".5 0 .5 1;.5 0 .5 1"
                repeatCount="indefinite"
                begin="0"
              ></animate>
            </circle>
          </svg>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return <CustomLayout>{children}</CustomLayout>;
}
