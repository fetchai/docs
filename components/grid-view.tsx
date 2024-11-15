import React, { useState } from "react";
import styles from "./grid.module.css";
import { useRouter } from "next/router";

export const GridView = ({
  content,
}: {
  content: {
    title: string;
    description: string;
    path: string;
  };
}) => {
  const router = useRouter();
  const [hover, setHover] = useState<boolean>(false);

  return (
    <section
      className={hover ? styles.hoverGridBox : styles.gridBox}
      onClick={() => {
        router.push(content.path);
      }}
      onMouseOver={() => {
        setHover(true);
      }}
      onMouseLeave={() => {
        setHover(false);
      }}
      id={content.title.toLowerCase().split(" ").join("-")}
    >
      <h3 className="nx-font-medium nx-capitalize nx-mb-2 nx-text-base">
        {content.title}
      </h3>
      <p className="nx-text-[#0B1742] nx-opacity-60 nx-text-sm nx-font-normal dark:nx-text-white-60">
        {content.description}
      </p>
    </section>
  );
};
