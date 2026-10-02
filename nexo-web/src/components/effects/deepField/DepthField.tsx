import React from "react";
import styles from "./DepthField.module.css";

interface DepthFieldProps {
  children: React.ReactNode;
  className?: string;
}

export default function DepthField({
  children,
  className = "",
}: DepthFieldProps) {
  const handleMouseMove = (
    e: React.MouseEvent<HTMLDivElement>
  ) => {
    const rect = e.currentTarget.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const xPercent = (x / rect.width) * 100;
    const yPercent = (y / rect.height) * 100;

    const moveX = (x / rect.width - 0.5) * 18;
    const moveY = (y / rect.height - 0.5) * 18;

    const rotateX = (y / rect.height - 0.5) * -1.2;
    const rotateY = (x / rect.width - 0.5) * 1.2;

    const element = e.currentTarget;

    element.style.setProperty("--mouse-x", `${xPercent}%`);
    element.style.setProperty("--mouse-y", `${yPercent}%`);

    element.style.setProperty("--move-x", `${moveX}px`);
    element.style.setProperty("--move-y", `${moveY}px`);

    element.style.setProperty("--rotate-x", `${rotateX}deg`);
    element.style.setProperty("--rotate-y", `${rotateY}deg`);
  };

  const handleMouseLeave = (
    e: React.MouseEvent<HTMLDivElement>
  ) => {
    const element = e.currentTarget;

    element.style.setProperty("--mouse-x", "50%");
    element.style.setProperty("--mouse-y", "50%");

    element.style.setProperty("--move-x", "0px");
    element.style.setProperty("--move-y", "0px");

    element.style.setProperty("--rotate-x", "0deg");
    element.style.setProperty("--rotate-y", "0deg");
  };

  return (
    <div
      className={`${styles.container} ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className={styles.points} />
      <div className={styles.pointsDepth} />

      <div className={styles.content}>
        {children}
      </div>
    </div>
  );
}