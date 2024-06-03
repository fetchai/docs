/* eslint-disable react/react-in-jsx-scope */
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUserContext } from "./contexts/context-provider";

export default function isAuth(Component) {
  return function IsAuth(props) {
    const { isLoggedIn } = useUserContext();
    const router = useRouter();

    useEffect(() => {
      if (isLoggedIn === false) {
        router.push("/");
      }
    }, [isLoggedIn, router]);
    if (isLoggedIn) {
      return <Component {...props} />;
    }

    return null;
  };
}
