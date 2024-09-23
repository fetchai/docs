import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface OsContextType {
  selectedOS: string;
  setSelectedOS: (os: string) => void;
}

const OsContext = createContext<OsContextType | undefined>(undefined);

export const OsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedOS, setSelectedOS] = useState<string>("Windows");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedOS = localStorage.getItem("selectedOS");
      if (savedOS) {
        setSelectedOS(savedOS);
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("selectedOS", selectedOS);
    }
  }, [selectedOS]);

  return (
    <OsContext.Provider value={{ selectedOS, setSelectedOS }}>
      {children}
    </OsContext.Provider>
  );
};

export const useOs = (): OsContextType => {
  const context = useContext(OsContext);
  if (!context) {
    throw new Error("useOs must be used within an OsProvider");
  }
  return context;
};
