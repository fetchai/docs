import React, { createContext, useContext, useEffect, useState } from "react";

const OSContext = createContext<{
  selectedOS: string;
  setSelectedOS: (os: string) => void;
}>({
  selectedOS: "windows",
  setSelectedOS: () => {},
});

export const OSProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [selectedOS, setSelectedOS] = useState<string>("windows");

  useEffect(() => {
    const osString = localStorage.getItem("storedOsOption") || "windows";
    setSelectedOS(osString);
  }, []);

  return (
    <OSContext.Provider value={{ selectedOS, setSelectedOS }}>
      {children}
    </OSContext.Provider>
  );
};

export const useOSContext = () => useContext(OSContext);
