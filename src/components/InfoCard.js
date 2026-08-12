// components/InfoCard.jsx

import styles from "./InfoCard.module.css";

export default function InfoCard({
  title,
  children,
  onClick,
  icon,
  buttonIcon,
  buttonText = "Edit",
}) {
  return (
    <section className={styles.card}>
      <div className={styles.header}>
        <div className={styles.headingContainer}>
          {icon}
          <h2 className={styles.heading}>{title}</h2>
        </div>

        {onClick && (
          <button className={styles.editBtn} onClick={onClick}>
            {buttonIcon}
            {buttonText}
          </button>
        )}
      </div>

      {children}
    </section>
  );
}
