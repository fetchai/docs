import React, { useState, useEffect } from "react";

const PackageVersion = ({
  packageName,
  packageType,
}: {
  packageName: string;
  packageType: string;
}) => {
  const [version, setVersion] = useState("");

  useEffect(() => {
    const fetchVersion = async () => {
      try {
        const response = await fetch("/docs/api/package-version", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            packageName,
            packageType,
          }),
        });
        const responseJson = await response.json();
        setVersion(responseJson?.latestVersion);
      } catch (error) {
        console.error("Error fetching the package version:", error);
      }
    };

    fetchVersion();
  }, [packageName, packageType]);

  return <strong>{version}</strong>;
};

export default PackageVersion;
