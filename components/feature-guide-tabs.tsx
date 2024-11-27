import React, { useState } from "react";
import styles from "./tab.module.css";
import { useRouter } from "next/router";
import Link from "next/link";

export const GuideBox = ({
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
      className={hover ? styles.hoverGuideBox : styles.guideBox}
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
      <h3
        className={`nx-text-black nx-font-medium nx-mb-2 nx-text-lg ${
          hover ? "title-hover-dark" : " dark:nx-text-white-90"
        }`}
      >
        {content.title}
      </h3>
      <p className="nx-text-gray-500 dark:nx-text-white-60 nx-font-normal">
        {content.description}
      </p>
    </section>
  );
};

const FeaturedGuidesTab = ({
  item,
}: {
  item: { type: string; title: string; path: string; label: string };
}) => {
  return (
    <div className={styles.featuredGuidesTab}>
      <div className=" nx-flex nx-flex-col">
        <span className={styles.tabHeading}>{item.type}</span>
        <span>{item.title}</span>
      </div>
      <div className={styles.featuredGuidesTablabel}>{item.label}</div>
    </div>
  );
};

export const FeaturedGuides = ({
  featuredGuidesData,
}: {
  featuredGuidesData: {
    type: string;
    title: string;
    path: string;
    label: string;
  }[];
}) => {
  return (
    <div className={styles.featureBox}>
      <div className={styles.featureGuideHeading}>Featured guides</div>
      <div className="nx-grid nx-w-full nx-grid-cols-2 nx-gap-y-3 nx-gap-x-6">
        {featuredGuidesData?.map((item, index) => (
          <Link
            key={index}
            className="nx-text-blue-500 nx-w-full"
            href={item.path}
          >
            <FeaturedGuidesTab item={item} />
          </Link>
        ))}
      </div>
    </div>
  );
};
