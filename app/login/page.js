import React from "react";
import LoginPage from "./LoginPage";
import LoginForm from "@/components/auth/register/Login";
import Login2 from "../alogin/Login2";
import Pylogin from "@/components/auth/pylogin/Pylogin";
import LoginPopup from "@/components/auth/pylogin/LoginPopup";
import GoogleLogin from "@/components/auth/GoogleLogin/page";

export default function Login() {
  return (
    <div>
      <LoginPopup />
      {/* <Pylogin /> */}
      {/* <GoogleLogin /> */}
    </div>
  );
}
