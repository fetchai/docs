import React from "react";
import Image from "next/image";
import Link from "next/link";

function InfoImageCard({
  image,
  href,
  mainTitle,
  firstTitle,
}: {
  image: string;
  href: string;
  mainTitle: string;
  firstTitle: string;
}) {
  return (
    <Link
      href={href}
      id={mainTitle}
      target="_blank"
      className="boxColor nx-rounded-lg nx-pt-6 hover:nx-bg-[#E5E7EC] nx-flex nx-flex-col nx-justify-between nx-w-full h-full"
    >
      <div className="nx-flex nx-flex-col nx-gap-1 nx-px-6">
        <div className="nx-text-[#000] nx-text-[12px] nx-font-medium nx-uppercase geist-mono-font-family nx-opacity-60 nx-leading-[150%]">
          {firstTitle}
        </div>
        <div className="nx-text-[#000] nx-text-[20px] nx-font-medium">
          {mainTitle}
        </div>
      </div>
      <div className="nx-rounded-lg nx-w-full nx-h-full nx-pl-6 nx-pt-6">
        <Image width={494} height={266} src={`/docs/${image}`} alt={image} />
      </div>
    </Link>
  );
}

export default InfoImageCard;
