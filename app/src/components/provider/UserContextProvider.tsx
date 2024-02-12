import React from "react";
import { TUser } from "../../types";

type Props = {
  children: React.ReactNode;
};

export type TUserContext = {
  user: TUser;
  setUserDetails: (user: TUser) => void;
};

export const UserContext = React.createContext<TUserContext>({
  user: {
    email: "",
    username: "",
    is_verified: false,
  },
  setUserDetails: () => {},
});

export default function UserContextProvider({ children }: Props) {
  const [user, setUser] = React.useState<TUser>({
    email: "",
    username: "",
    is_verified: false,
  });

  function setUserDetails(user: TUser) {
    setUser(user);
  }

  return (
    <UserContext.Provider
      value={{
        user: user,
        setUserDetails: setUserDetails,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
