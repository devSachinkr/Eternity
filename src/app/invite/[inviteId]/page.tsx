import { acceptInvite } from "@/actions/invite";
import { redirect } from "next/navigation";
import React from "react";

interface Props {
  params: Promise<{
    inviteId: string;
  }>;
}

const InvitePage = async ({ params }: Props) => {
  const { inviteId } = await params;
  const invite = await acceptInvite({ inviteId });
  if (invite.status === 401) {
    return redirect("/sign-in");
  }
  if (invite.status === 404) {
    return redirect("/dashboard");
  }
  if (invite.status === 200) {
    return redirect(`/auth/callback`);
  }
  console.log(invite);
  return <div>hlo</div>;
};

export default InvitePage;
