import React from "react";
import Image from "next/image";
import Link from "next/link";

function InfoCard({
  icon,
  href,
  mainTitle,
  firstTitle,
  mainTitleFont,
  displayFlex,
  displayTitleReverse,
}: {
  icon: string;
  href: string;
  mainTitle: string;
  firstTitle: string;
  mainTitleFont?: string;
  displayFlex?: boolean;
  displayTitleReverse?: boolean;
}) {
  return (
    <Link
      href={href}
      id={mainTitle}
      target="_blank"
      className={`boxColor nx-rounded-lg nx-p-6 hover:nx-bg-[#E5E7EC] nx-flex ${displayFlex ? "nx-flex-row" : "nx-flex-col"} nx-gap-6 ${displayFlex ? "nx-justify-start" : "nx-justify-between"} nx-w-full`}
    >
      <div className="nx-bg-white nx-rounded-lg nx-py-3 nx-w-[48px] nx-h-[48px]">
        <Image
          width={30}
          height={24}
          src={`/docs/${icon}`}
          alt={icon}
          className="nx-max-w-[36px] nx-mx-auto"
        />
      </div>
      <div
        className={`nx-flex nx-flex-col ${displayTitleReverse ? "nx-flex-col-reverse" : "nx-flex-col"} nx-gap-1`}
      >
        <div className="nx-text-[#000] nx-text-[12px] nx-font-medium nx-uppercase geist-mono-font-family nx-opacity-60 nx-leading-[150%]">
          {firstTitle}
        </div>
        <div
          className={`nx-text-[#000] nx-text-[${mainTitleFont || "20px"}] nx-font-medium`}
        >
          {mainTitle}
        </div>
      </div>
    </Link>
  );
}

export default InfoCard;
