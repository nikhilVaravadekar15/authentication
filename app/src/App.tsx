import './App.css'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Signin from './pages/auth/Signin';
import Signup from './pages/auth/Signup';
import PasswordResetMail from './pages/auth/PasswordResetMail';
import ForgetPassword from './pages/auth/ForgetPassword';
import SignupVerified from './pages/auth/SignupVerified';
import EmailVerification from './pages/auth/EmailVerification';
import ResetPassword from './pages/auth/ResetPassword';
import PasswordResetDone from './pages/auth/PasswordResetDone';
import RootLayout from './components/layout/RootLayout'


function App() {

  return (
    <RootLayout>
      <div className="absolute">
        <ToastContainer
          limit={1}
          theme={"dark"}
        />
      </div>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index={true} element={<Home />} />
            <Route path="auth">
              <Route index={true} path="sign-in" element={<Signin />} />
              <Route path="sign-up" element={<Signup />} />
              <Route path="email-verification" element={<EmailVerification />} />
              <Route path="sign-up-verified" element={<SignupVerified />} />
              <Route path="forget-password" element={<ForgetPassword />} />
              <Route path="password-reset-mail" element={<PasswordResetMail />} />
              <Route path="reset-password/:token" element={<ResetPassword />} />
              <Route path="password-reset-done" element={<PasswordResetDone />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </RootLayout>
  )
}

export default App
