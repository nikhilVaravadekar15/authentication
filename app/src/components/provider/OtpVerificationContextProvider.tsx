import React from "react";

type Props = {
  children: React.ReactNode;
};

export type TOtpVerification = {
  hash: string;
  email: string;
  sethashDetails: (hash: string) => void;
  setEmailDetails: (email: string) => void;
};

export const OtpVerificationContext = React.createContext<TOtpVerification>({
  hash: "",
  email: "",
  sethashDetails: () => {},
  setEmailDetails: () => {},
});

export default function OtpVerificationContextProvider({ children }: Props) {
  const [hash, setHash] = React.useState<string>("");
  const [email, setEmail] = React.useState<string>("");

  function sethashDetails(hash: string) {
    setHash(hash);
  }

  function setEmailDetails(email: string) {
    setEmail(email);
  }

  return (
    <OtpVerificationContext.Provider
      value={{
        hash: hash,
        sethashDetails: sethashDetails,
        email: email,
        setEmailDetails: setEmailDetails,
      }}
    >
      {children}
    </OtpVerificationContext.Provider>
  );
}
