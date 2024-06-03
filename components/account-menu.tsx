import React, { useState, FC } from "react";
import ProfileIcon from "../src/svgs/profile.svg";
import Image from "next/image";
import { useRouter } from "next/router";

interface AccountMenuProps {
  email: string;
  logo: string;
  signOut: () => void;
}

const AccountMenu: FC<AccountMenuProps> = ({ email, logo, signOut }) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <div>
      <button
        className="nx-flex nx-rounded-full nx-bg-white text-sm"
        type="button"
        onClick={handleClick}
      >
        <img className="nx-h-8 nx-w-8 nx-rounded-full" src={logo} alt="" />
      </button>
      {open && (
        <div className="nx-absolute nx-right-[40px] nx-z-10 nx-mt-4 nx-origin-top-right nx-divide-y nx-divide-gray-100 nx-rounded-md nx-bg-white nx-ring-1 nx-ring-black nx-ring-opacity-5 nx-focus:outline-none nx-w-[240px] nx-shadow-[0px_6px_12px_0px_rgba(0,13,61,0.16),0px_1px_0px_0px_rgba(0,13,61,0.32)] nx-transform nx-opacity-100 nx-scale-100">
          <div className="nx-pt-6 nx-pb-4 nx-px-4 nx-flex nx-flex-col nx-text-center">
            <Image
              alt=""
              loading="lazy"
              width={34}
              height={36}
              className="nx-self-center nx-mb-[14px]"
              src={ProfileIcon}
            />
            <p className="nx-text-sm nx-text-gray-700" role="none">
              You are signed in as
            </p>
            <p
              className="nx-truncate nx-text-sm nx-font-medium nx-text-purple"
              role="none"
            >
              {email}
            </p>
          </div>
          <div>
            <div
              onClick={() => router.push("/profile")}
              className="nx-px-4 nx-pt-3 nx-text-sm  nx-cursor-pointer nx-justify-center nx-rounded-b-lg nx-flex"
            >
              <Image
                alt=""
                loading="lazy"
                width={15}
                height={15}
                className="nx-self-center nx-svg-inline--fa nx-fa-power-off nx-text-gray-300 nx-me-3 nx-mb-[14px]"
                src={ProfileIcon}
              />
              Profile
            </div>
            <div
              className="nx-px-4 nx-pt-3 nx-text-sm nx-justify-center nx-cursor-pointer nx-pb-4 nx-rounded-b-lg nx-flex"
              id="sign_out"
              role="menuitem"
              data-headlessui-state=""
              onClick={signOut}
            >
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="far"
                data-icon="power-off"
                className="nx-svg-inline--fa nx-fa-power-off nx-text-gray-300 nx-me-3"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                height="18"
              >
                <path
                  fill="currentColor"
                  d="M280 24c0-13.3-10.7-24-24-24s-24 10.7-24 24V264c0 13.3 10.7 24 24 24s24-10.7 24-24V24zM134.2 107.3c10.7-7.9 12.9-22.9 5.1-33.6s-22.9-12.9-33.6-5.1C46.5 112.3 8 182.7 8 262C8 394.6 115.5 502 248 502s240-107.5 240-240c0-79.3-38.5-149.7-97.8-193.3c-10.7-7.9-25.7-5.6-33.6 5.1s-5.6 25.7 5.1 33.6c47.5 35 78.2 91.2 78.2 154.7c0 106-86 192-192 192S56 368 56 262c0-63.4 30.7-119.7 78.2-154.7z"
                ></path>
              </svg>
              <span>Sign Out</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountMenu;
