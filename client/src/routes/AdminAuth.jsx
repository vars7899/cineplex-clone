import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserState } from "../Context/Store";

const UserAuth = ({ children }) => {
  const { user } = UserState();
  const Navigate = useNavigate();
  useEffect(() => {
    if (!user && !user?.isAdmin) {
      Navigate("/");
    }
  }, [user]);
  return <>{children}</>;
};

export default UserAuth;
