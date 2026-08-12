"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useState } from "react";
import UserApis from "../../services/api/User.api.services";
import styles from "./page.module.css";
import { toast } from "react-toastify";

export default function Page() {
  const router = useRouter();
  const { setUser } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");
      const body = {
        email,
        password,
      };
      const data = await UserApis.login(body);
      router.replace("/bookings");
      setUser(data.user);
    } catch (err) {
      setError(
        err?.response?.data?.message || "Unable to login. Please try again.",
      );
      toast.error("Unable to login. Please try again.", {
        position: "bottom-center",
      });
      setLoading(false);
    } finally {
      toast.success(`Welcome Back ${data.user.name}`, {
        position: "bottom-center",
      });
      setError("");
      setLoading(false);
    }
  };

  return (
    <main className={styles.container}>
      <div className={styles.bgCircleOne} />
      <div className={styles.bgCircleTwo} />

      <section className={styles.card}>
        <div className={styles.logoContainer}>
          <div className={styles.logo}>M</div>

          <div>
            <h3>Mytime Cowork</h3>
            <span>CRM</span>
          </div>
        </div>

        <h1 className={styles.title}>Welcome Back</h1>

        <p className={styles.subtitle}>Login to access your workspace</p>

        <form className={styles.form} onSubmit={submitHandler}>
          <div className={styles.field}>
            <label htmlFor="email">Email</label>

            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="password">Password</label>

            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <p className={styles.error}>{error}</p>}

          <button type="submit" disabled={loading} className={styles.loginBtn}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </section>
    </main>
  );
}
