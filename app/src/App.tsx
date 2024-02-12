import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Signin from "./pages/auth/Signin";
import Signup from "./pages/auth/Signup";
import Index from "./pages/app/Index";
import PasswordResetMail from "./pages/auth/PasswordResetMail";
import ForgetPassword from "./pages/auth/ForgetPassword";
import SignupVerified from "./pages/auth/SignupVerified";
import OtpVerification from "./pages/auth/OtpVerification";
import ResetPassword from "./pages/auth/ResetPassword";
import PasswordResetDone from "./pages/auth/PasswordResetDone";
import RootLayout from "./components/layout/RootLayout";

function App() {
  return (
    <RootLayout>
      <BrowserRouter>
        <Routes>
          <Route path="/">
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
            <Route path="app">
              <Route index={true} element={<Index />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </RootLayout>
  );
}

export default App;
