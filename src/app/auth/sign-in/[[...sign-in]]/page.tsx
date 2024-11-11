import { SignIn } from "@clerk/nextjs";
import React from "react";

const SignInPage = () => {
  return <SignIn afterSignOutUrl={'/'}/>;
};

export default SignInPage;
