import React from "react";

import { Mac, Ubuntu, Windows } from "src/icons/os-icons";
import { useOs } from "../contexts/os-context";

const osmenu = [
  {
    name: "Windows",
    icon: Windows,
  },
  {
    name: "Mac",
    icon: Mac,
  },
  {
    name: "Ubuntu",
    icon: Ubuntu,
  },
];

const NavDropdown = () => {
  const { selectedOS, setSelectedOS } = useOs();
  return (
    <div className="nav-dropdown-container nx-w-full nx-right-0 nx-absolute">
      <div className="nav-tab nx-w-full nx-justify-between">
        <span className="nav-icon-txt">Operating system</span>
        <div className="osmenu-container-nav">
          {osmenu.map((item, index) => (
            <div
              key={index}
              className={`osmenu-tab-container nx-justify-center nx-cursor-pointer nx-items-center ${
                selectedOS === item.name ? "blue-background" : ""
              }`}
              onClick={() => setSelectedOS(item.name)}
            >
              <item.icon selectedOS={selectedOS} name={item.name} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NavDropdown;
