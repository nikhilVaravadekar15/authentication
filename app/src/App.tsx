/* eslint-disable react-hooks/exhaustive-deps */
import "./App.css";
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import React from "react";
import { refresh } from "./http";
import { TUser } from "./types";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Signin from "./pages/auth/Signin";
import Signup from "./pages/auth/Signup";
import Index from "./pages/app/Index";
import ForgetPassword from "./pages/auth/ForgetPassword";
import SignupVerified from "./pages/auth/SignupVerified";
import ResetPassword from "./pages/auth/ResetPassword";
import RootLayout from "./components/layout/RootLayout";
import OtpVerification from "./pages/auth/OtpVerification";
import PasswordResetDone from "./pages/auth/PasswordResetDone";
import PasswordResetMail from "./pages/auth/PasswordResetMail";
import { UserContext } from "./components/provider/UserContextProvider";

function App() {
  const { setUserDetails } = React.useContext(UserContext);

  React.useEffect(() => {
    refresh()
      .then((data) => {
        const user: TUser = data.data?.user;
        setUserDetails(user);
      })
      .catch(() => {});
  }, []);

  return (
    <RootLayout>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route element={<UnProtectedRoutes />}>
              <Route index={true} element={<Home />} />
              <Route path="auth">
                <Route index={true} element={<Signin />} />
                <Route path="sign-in" element={<Signin />} />
                <Route path="sign-up" element={<Signup />} />
                <Route path="otp-verification" element={<OtpVerification />} />
                <Route path="sign-up-verified" element={<SignupVerified />} />
                <Route path="forget-password" element={<ForgetPassword />} />
                <Route
                  path="password-reset-mail"
                  element={<PasswordResetMail />}
                />
                <Route path="reset-password" element={<ResetPassword />} />
                <Route
                  path="password-reset-done"
                  element={<PasswordResetDone />}
                />
              </Route>
            </Route>
            <Route element={<PrivateRoutes />}>
              <Route path="app">
                <Route index={true} element={<Index />} />
              </Route>
            </Route>
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </RootLayout>
  );
}

function UnProtectedRoutes() {
  const { user } = React.useContext(UserContext);
  return (user.email === "" ||
    user.email === undefined ||
    user.email === null) &&
    (user.username === "" ||
      user.username === undefined ||
      user.username === null) &&
    user.is_verified === false ? (
    <Outlet />
  ) : (
    <Navigate to="/app" />
  );
}

function PrivateRoutes() {
  const { user } = React.useContext(UserContext);
  return user.email && user.username && user.is_verified === true ? (
    <Outlet />
  ) : (
    <Navigate to="/auth" />
  );
}

export default App;
