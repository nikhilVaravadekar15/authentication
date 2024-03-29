import React from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import OtpVerificationContextProvider from "../provider/OtpVerificationContextProvider";
import ForgotPasswordContextProvider from "../provider/ForgotPasswordContextProvider";

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <main
      id="app"
      className="h-screen w-screen bg-black text-white antialiased overflow-hidden relative z-0"
    >
      <OtpVerificationContextProvider>
        <ForgotPasswordContextProvider>
          <>
            {children}
            <ToastContainer
              limit={1}
              theme="dark"
              autoClose={5000}
              position="top-center"
              rtl={false}
              draggable={true}
              newestOnTop={false}
              closeOnClick={true}
              pauseOnHover={false}
              hideProgressBar={false}
              pauseOnFocusLoss={false}
            />
          </>
        </ForgotPasswordContextProvider>
      </OtpVerificationContextProvider>
    </main>
  );
}

export default RootLayout;
