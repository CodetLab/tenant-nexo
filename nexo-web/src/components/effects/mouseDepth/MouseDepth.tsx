import React from "react";
import styles from "./MouseDepth.module.css";

interface MouseDepthProps {
  children: React.ReactNode;
  className?: string;
}

export const MouseDepth: React.FC<MouseDepthProps> = ({
  children,
  className = "",
}) => {
  const handleMouseMove = (
    e: React.MouseEvent<HTMLDivElement>
  ) => {
    const rect = e.currentTarget.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const xPercent = (x / rect.width) * 100;
    const yPercent = (y / rect.height) * 100;

    // Parallax sutil
    const offsetX = (x / rect.width - 0.5) * 14;
    const offsetY = (y / rect.height - 0.5) * 14;

    // Tilt muy pequeño
    const tiltY = (x / rect.width - 0.5) * 1.5;
    const tiltX = (y / rect.height - 0.5) * -1.5;

    e.currentTarget.style.setProperty(
      "--mouse-x",
      `${xPercent}%`
    );

    e.currentTarget.style.setProperty(
      "--mouse-y",
      `${yPercent}%`
    );

    e.currentTarget.style.setProperty(
      "--grid-x",
      `${offsetX}px`
    );

    e.currentTarget.style.setProperty(
      "--grid-y",
      `${offsetY}px`
    );

    e.currentTarget.style.setProperty(
      "--tilt-x",
      `${tiltX}deg`
    );

    e.currentTarget.style.setProperty(
      "--tilt-y",
      `${tiltY}deg`
    );
  };

  const handleMouseLeave = (
    e: React.MouseEvent<HTMLDivElement>
  ) => {
    e.currentTarget.style.setProperty("--mouse-x", "50%");
    e.currentTarget.style.setProperty("--mouse-y", "50%");
    e.currentTarget.style.setProperty("--grid-x", "0px");
    e.currentTarget.style.setProperty("--grid-y", "0px");
    e.currentTarget.style.setProperty("--tilt-x", "0deg");
    e.currentTarget.style.setProperty("--tilt-y", "0deg");
  };

  return (
    <div
      className={`${styles.container} ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
};