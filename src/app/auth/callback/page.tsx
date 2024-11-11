import { onAuthUser } from "@/actions/auth";
import { redirect } from "next/navigation";

const AuthCallback = async () => {
  const authUser = await onAuthUser();

  if (authUser.status === 200 || authUser.status === 201) {
    return redirect(`/dashboard/${authUser.user?.workspace[0].id}`);
  }
  if (
    authUser.status === 403 ||
    authUser.status === 500 ||
    authUser.status === 400
  ) {
    return redirect("/auth/sign-in");
  }
};

export default AuthCallback;
