import React from "react";
import { TEmail } from "../../types";

type Props = {
  children: React.ReactNode;
};

export type TForgotPasswordContext = {
  email: TEmail;
  setEmailDetails: (email: TEmail) => void;
};

export const ForgotPasswordContext =
  React.createContext<TForgotPasswordContext>({
    email: {
      email: "",
    },
    setEmailDetails: () => {},
  });

export default function ForgotPasswordContextProvider({ children }: Props) {
  const [email, setEmail] = React.useState<TEmail>({
    email: "",
  });

  function setEmailDetails(data: TEmail) {
    setEmail(data);
  }

  return (
    <ForgotPasswordContext.Provider
      value={{
        email: email,
        setEmailDetails: setEmailDetails,
      }}
    >
      {children}
    </ForgotPasswordContext.Provider>
  );
}
